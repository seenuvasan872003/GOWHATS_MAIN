import api from '../utils/axios';

export const sendTemplateMessage = async (templateName, recipient, params = {}) => {
  try {
    const response = await api.post('/api/messages/send-template', {
      template: {
        name: templateName,
        language: {
          code: 'en_US'
        },
        components: [
          {
            type: "body",
            parameters: Object.entries(params).map(([key, value]) => ({
              type: "text",
              text: value
            }))
          }
        ]
      },
      to: recipient
    });
    return response.data;
  } catch (error) {
    console.error('Failed to send template message:', error);
    throw error;
  }
};