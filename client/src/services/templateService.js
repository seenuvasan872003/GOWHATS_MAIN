// client/src/services/templateService.js
import api from '../utils/axios';

export const createWhatsAppTemplate = async (templateData) => {
  try {
    // First, create template in your database
    const localTemplate = await api.post('/api/templates', {
      ...templateData,
      status: 'PENDING'
    });

    // Then submit to WhatsApp Business API
    const whatsappResponse = await api.post(`/api/whatsapp/templates`, {
      name: templateData.name,
      language: templateData.language,
      category: templateData.category,
      components: [
        // Header if exists
        templateData.header && {
          type: "HEADER",
          format: templateData.header.type.toUpperCase(),
          text: templateData.header.text
        },
        // Body (required)
        {
          type: "BODY",
          text: templateData.body,
          example: {
            body_text: [templateData.body]
          }
        },
        // Footer if exists
        templateData.footer && {
          type: "FOOTER",
          text: templateData.footer
        },
        // Buttons if exist
        ...(templateData.buttons || []).map(button => ({
          type: "BUTTON",
          subType: button.type.toUpperCase(),
          text: button.text,
          ...(button.url && { url: button.url }),
          ...(button.phoneNumber && { phoneNumber: button.phoneNumber })
        }))
      ].filter(Boolean)
    });

    // Update local template with WhatsApp template ID
    await api.put(`/api/templates/${localTemplate.data._id}`, {
      whatsappTemplateId: whatsappResponse.data.id,
      status: 'SUBMITTED'
    });

    return whatsappResponse.data;
  } catch (error) {
    console.error('Template creation error:', error);
    throw error;
  }
};