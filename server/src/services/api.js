import api from '../utils/axios';

// Templates
export const createTemplate = async (templateData) => {
  return await api.post('/api/templates', templateData);
};

export const getTemplates = async () => {
  return await api.get('/api/templates');
};

// Add other API calls here
export const getContacts = async () => {
  return await api.get('/api/contacts');
};

export const updateContactRead = async (contactId) => {
  return await api.put(`/api/contacts/${contactId}/read`);
};

export const createContact = async (contactData) => {
  return await api.post('/api/contacts', contactData);
};