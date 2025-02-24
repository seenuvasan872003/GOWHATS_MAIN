const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },
  from: String,
  to: String,
  text: String,
  messageId: String,
  type: String,
  templateId: String,
  timestamp: Date,
  sent: Boolean
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
