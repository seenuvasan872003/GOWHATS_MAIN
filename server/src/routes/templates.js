const express = require('express');
const router = express.Router();
const Template = require('../models/Template');
const WhatsAppService = require('../services/whatsappServices');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.user.tenant_id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    // Create WhatsApp template
    const whatsapp = new WhatsAppService(tenant);
    const whatsappResponse = await whatsapp.createMessageTemplate({
      name: req.body.name,
      category: req.body.category.toUpperCase(),
      language: req.body.language,
      components: req.body.components
    });

    // Save template in local database
    const template = new Template({
      tenantId: req.user.tenant_id,
      name: req.body.name,
      category: req.body.category,
      language: req.body.language,
      components: req.body.components,
      whatsappTemplateId: whatsappResponse.id,
      status: 'PENDING'
    });

    await template.save();
    res.status(201).json(template);

  } catch (error) {
    console.error('Template creation error:', error);
    res.status(500).json({
      message: 'Failed to create template',
      error: error.response?.data || error.message
    });
  }
});

module.exports = router;