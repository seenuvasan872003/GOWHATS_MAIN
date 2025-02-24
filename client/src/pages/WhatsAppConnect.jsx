import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { toast } from 'react-hot-toast';

const WhatsAppConnect = () => {
  const [formData, setFormData] = useState({
    businessAccountId: '',
    phoneNumberId: '',
    accessToken: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/whatsapp/connect', formData);
      toast.success('WhatsApp connected successfully');
      navigate('/admin/chats');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Connection failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Connect WhatsApp Business API</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Business Account ID"
            value={formData.businessAccountId}
            onChange={(e) => setFormData({...formData, businessAccountId: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text" 
            placeholder="Phone Number ID"
            value={formData.phoneNumberId}
            onChange={(e) => setFormData({...formData, phoneNumberId: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Access Token"
            value={formData.accessToken}
            onChange={(e) => setFormData({...formData, accessToken: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <button 
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Connect WhatsApp
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default WhatsAppConnect;