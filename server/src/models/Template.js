const mongoose = require('mongoose');

// server/src/models/Template.js
const templateSchema = new mongoose.Schema({
  tenantId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  language: { type: String, required: true },
  components: [{
    type: { type: String, required: true },
    format: String,
    text: String,
    example: mongoose.Schema.Types.Mixed,
    sub_type: String,
    index: String,
    parameters: [{
      type: { type: String },
      text: String,
      url: String
    }]
  }],
  whatsappTemplateId: String,
  status: {
    type: String,
    enum: ['DRAFT', 'PENDING', 'APPROVED', 'REJECTED'],
    default: 'DRAFT'
  }
}, { timestamps: true });

module.exports = mongoose.model('Template', templateSchema);