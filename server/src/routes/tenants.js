const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');
const { body, validationResult } = require('express-validator'); // For input validation

// Update WhatsApp configuration for a tenant
router.put(
  '/:id/whatsapp-config',
  auth, // Ensure the request is authenticated
  [
    // Validate request body
    body('accessToken').notEmpty().withMessage('Access token is required'),
    body('businessAccountId').notEmpty().withMessage('Business account ID is required'),
    body('phoneNumberId').notEmpty().withMessage('Phone number ID is required'),
    body('webhookSecret').notEmpty().withMessage('Webhook secret is required'),
    body('verifyToken').notEmpty().withMessage('Verify token is required')
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const tenant = await Tenant.findById(req.params.id);
      if (!tenant) {
        return res.status(404).json({ message: 'Tenant not found' });
      }

      // Update WhatsApp configuration
      tenant.whatsappConfig = {
        accessToken: req.body.accessToken,
        businessAccountId: req.body.businessAccountId,
        phoneNumberId: req.body.phoneNumberId,
        webhookSecret: req.body.webhookSecret,
        verifyToken: req.body.verifyToken // Add verifyToken
      };

      await tenant.save();
      res.json({ message: 'WhatsApp configuration updated', tenant });
    } catch (error) {
      console.error('Error updating WhatsApp config:', error);
      res.status(500).json({ message: 'Failed to update WhatsApp config' });
    }
  }
);

module.exports = router;