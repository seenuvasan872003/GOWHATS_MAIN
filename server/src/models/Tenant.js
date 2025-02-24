// models/Tenant.js
const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  _id: { 
    type: String,
    required: true
  },
  name: String,
  whatsappConfig: {
    businessAccountId: String,
    phoneNumberId: String, 
    accessToken: String
  }
});

module.exports = mongoose.model('Tenant', tenantSchema);