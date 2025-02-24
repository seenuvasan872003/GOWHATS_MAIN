// services/whatsappService.js
const axios = require('axios');

class WhatsAppService {
  constructor(tenant) {
    this.tenant = tenant;
    this.baseUrl = 'https://graph.facebook.com/v22.0';
  }

  async sendMessage(to, text) {
    try {
      const url = `${this.baseUrl}/${this.tenant.whatsappConfig.phoneNumberId}/messages`;
      
      const response = await axios.post(url, {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        text: { body: text }
      }, {
        headers: {
          Authorization: `Bearer ${this.tenant.whatsappConfig.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('WhatsApp API Error:', error.response?.data || error);
      throw error;
    }
  }

  async createMessageTemplate(template) {
    try {
      const url = `${this.baseUrl}/${this.tenant.whatsappConfig.businessAccountId}/message_templates`;
      
      const response = await axios.post(url, template, {
        headers: {
          Authorization: `Bearer ${this.tenant.whatsappConfig.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Template creation error:', error.response?.data || error);
      throw error;
    }
  }
}

module.exports = WhatsAppService;