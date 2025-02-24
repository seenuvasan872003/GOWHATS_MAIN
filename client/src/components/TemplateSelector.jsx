// client/src/components/TemplateSelector.jsx
import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import { toast } from 'react-hot-toast';

const TemplateSelector = ({ onSelect, onClose }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const response = await api.get('/api/templates');
        setTemplates(response.data.filter(t => t.status === 'APPROVED'));
      } catch (error) {
        toast.error('Failed to load templates');
      } finally {
        setLoading(false);
      }
    };
    loadTemplates();
  }, []);

  return (
    <div className="absolute bottom-16 left-0 w-full bg-white shadow-lg rounded-t-lg p-4 z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Message Templates</h3>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          ✕
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
        </div>
      ) : templates.length > 0 ? (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {templates.map(template => (
            <div 
              key={template._id}
              onClick={() => onSelect(template)}
              className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
            >
              <div className="font-medium mb-1">{template.name}</div>
              <div className="text-sm text-gray-500">
                {template.body?.text}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Category: {template.category}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">
          No templates available
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;