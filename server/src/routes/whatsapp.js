// routes/whatsapp.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Tenant = require('../models/Tenant');

router.post('/connect', auth, async (req, res) => {
  try {
    const { businessAccountId, phoneNumberId, accessToken } = req.body;
    
    const updatedTenant = await Tenant.findOneAndUpdate(
      { _id: req.user.tenant_id }, 
      {
        $set: {
          whatsappConfig: {
            businessAccountId,
            phoneNumberId,
            accessToken
          }
        }
      },
      { new: true, upsert: true }
    );

    res.json({ success: true, tenant: updatedTenant });
  } catch (error) {
    console.error('WhatsApp connection error:', error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;