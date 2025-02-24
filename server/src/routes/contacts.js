const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// Get contacts
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ 
      tenantId: req.user.tenant_id 
    })
    .sort({ timestamp: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Update unread count
router.put('/:id/read', auth, async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      {
        _id: req.params.id,
        tenantId: req.user.tenant_id
      },
      { $set: { unreadCount: 0 } },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Add contact
router.post('/', auth, async (req, res) => {
  try {
    // Validate phone number format
    if (!req.body.phone_number?.match(/^\d{10,15}$/)) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Check if contact already exists
    const existingContact = await Contact.findOne({
      tenantId: req.user.tenant_id,
      phone_number: req.body.phone_number
    });

    if (existingContact) {
      return res.status(400).json({ error: 'Contact already exists' });
    }

    const contact = new Contact({
      tenantId: req.user.tenant_id,
      phone_number: req.body.phone_number,
      name: req.body.name,
      lastMessage: '',
      timestamp: new Date(),
      unreadCount: 0
    });

    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

module.exports = router;