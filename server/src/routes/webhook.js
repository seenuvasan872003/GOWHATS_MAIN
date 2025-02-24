// routes/webhook.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Contact = require('../models/Contact');
const Tenant = require('../models/Tenant');
const crypto = require('crypto');

// Webhook verification endpoint
router.get('/', async (req, res) => {
  try {
    console.log('GET Webhook request:', req.query);
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verified successfully');
      res.status(200).send(challenge);
    } else {
      console.error('Webhook verification failed');
      res.sendStatus(403);
    }
  } catch (error) {
    console.error('Webhook verification error:', error);
    res.sendStatus(500);
  }
});

// Middleware to attach tenant
const attachTenant = async (req, res, next) => {
  try {
    const businessAccountId = req.body?.entry?.[0]?.id;
    if (businessAccountId) {
      const tenant = await Tenant.findOne({
        'whatsappConfig.businessAccountId': businessAccountId
      });
      if (tenant) {
        req.tenant = tenant;
        next();
      } else {
        console.error('No tenant found for business account:', businessAccountId);
        res.sendStatus(404);
      }
    }
  } catch (error) {
    console.error('Tenant middleware error:', error);
    next(error);
  }
};

// Webhook message handling endpoint
router.post('/', attachTenant, async (req, res) => {
  try {
    const { body } = req;
    console.log('POST Webhook payload:', JSON.stringify(body, null, 2));

    if (!body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
      console.log('Invalid webhook payload structure');
      return res.sendStatus(400);
    }

    const messageData = body.entry[0].changes[0].value.messages[0];
    const metadata = body.entry[0].changes[0].value.metadata;

    // Process contact
    let contact = await Contact.findOne({
      tenantId: req.tenant._id,
      phone_number: messageData.from
    });

    if (!contact) {
      contact = new Contact({
        tenantId: req.tenant._id,
        phone_number: messageData.from,
        lastMessage: messageData.text?.body,
        timestamp: new Date(parseInt(messageData.timestamp) * 1000),
        unreadCount: 1
      });
    } else {
      contact.lastMessage = messageData.text?.body;
      contact.timestamp = new Date(parseInt(messageData.timestamp) * 1000);
      contact.unreadCount = (contact.unreadCount || 0) + 1;
    }

    await contact.save();
    console.log('Contact updated:', contact._id);

    // Save message
    const newMessage = new Message({
      tenantId: req.tenant._id,
      from: messageData.from,
      to: metadata.phone_number_id,
      text: messageData.text?.body,
      timestamp: new Date(parseInt(messageData.timestamp) * 1000),
      sent: false,
      messageId: messageData.id,
      type: messageData.type
    });

    await newMessage.save();
    console.log('Message saved:', newMessage._id);

    if (global.io) {
      global.io.to(req.tenant._id.toString()).emit('receive_message', {
        ...newMessage.toObject(),
        contact: contact.toObject()
      });
      console.log('Message emitted to socket room:', req.tenant._id.toString());
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.sendStatus(500);
  }
});

module.exports = router;