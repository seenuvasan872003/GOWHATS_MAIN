const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },
  phone_number: String,
  name: String,
  lastMessage: String,
  timestamp: Date,
  unreadCount: Number
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);