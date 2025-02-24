// routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Contact = require('../models/Contact');
const Tenant = require('../models/Tenant');
const WhatsAppService = require('../services/whatsappServices');
const auth = require('../middleware/auth');

// Get messages for tenant
router.get('/', auth, async (req, res) => {
  try {
    const { phone_number } = req.query;
    const messages = await Message.find({
      tenantId: req.user.tenant_id,
      $or: [
        { from: phone_number },
        { to: phone_number }
      ]
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Send message
router.post('/send', auth, async (req, res) => {
  try {
    const { to, text } = req.body;

    // Get tenant info
    const tenant = await Tenant.findById(req.user.tenant_id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    console.log('Sending message for tenant:', tenant._id);

    // Initialize WhatsApp service with tenant config
    const whatsappService = new WhatsAppService(tenant);
    
    // Send via WhatsApp API
    const response = await whatsappService.sendMessage(to, text);
    console.log('WhatsApp API response:', response);

    // Create message
    const newMessage = new Message({
      tenantId: tenant._id,
      from: tenant.whatsappConfig.phoneNumberId,
      to,
      text,
      timestamp: new Date(),
      sent: true,
      messageId: response.messages?.[0]?.id
    });

    await newMessage.save();
    console.log('Message saved:', newMessage._id);

    // Update or create contact
    await Contact.findOneAndUpdate(
      { 
        tenantId: tenant._id,
        phone_number: to
      },
      {
        $set: {
          lastMessage: text,
          timestamp: new Date()
        }
      },
      { upsert: true }
    );

    // Emit to socket if available
    if (global.io) {
      global.io.to(tenant._id.toString()).emit('message_sent', {
        ...newMessage.toObject()
      });
      console.log('Message sent event emitted to socket');
    }

    res.json({
      success: true,
      message: newMessage,
      whatsappResponse: response
    });
  } catch (error) {
    console.error('Message send error:', error);
    res.status(500).json({ 
      error: 'Failed to send message',
      details: error.response?.data || error.message 
    });
  }
});

// Send template message
router.post('/send-template', auth, async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.user.tenant_id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    const whatsapp = new WhatsAppService(tenant);
    const response = await whatsapp.sendTemplate(req.body.to, req.body.template);

    // Save message
    const message = new Message({
      tenantId: tenant._id,
      from: tenant.whatsappConfig.phoneNumberId,
      to: req.body.to,
      text: `Template: ${req.body.template.name}`,
      timestamp: new Date(),
      sent: true,
      templateId: req.body.template.name,
      messageId: response.messages?.[0]?.id
    });

    await message.save();

    // Update contact
    await Contact.findOneAndUpdate(
      { 
        tenantId: tenant._id,
        phone_number: req.body.to
      },
      {
        $set: {
          lastMessage: `Template: ${req.body.template.name}`,
          timestamp: new Date()
        }
      },
      { upsert: true }
    );

    if (global.io) {
      global.io.to(tenant._id.toString()).emit('template_sent', {
        ...message.toObject()
      });
    }

    res.json({
      success: true,
      message,
      whatsappResponse: response
    });
  } catch (error) {
    console.error('Template message error:', error);
    res.status(500).json({ 
      error: 'Failed to send template message',
      details: error.response?.data || error.message
    });
  }
});

module.exports = router;