import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { BiChevronLeft } from 'react-icons/bi';
import TemplateForm from '../pages/TemplateForm'; // Import TemplateForm component

const CreateTemplate = ({ onCancel, templateType }) => {
  const [category, setCategory] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const categories = [
    { id: 'marketing', name: 'Marketing', icon: '📢', color: 'text-teal-600' },
    { id: 'authentication', name: 'Authentication', icon: '🔒', color: 'text-gray-700' },
    { id: 'utility', name: 'Utility', icon: '🛠️', color: 'text-gray-700' }
  ];

  // Handle template name change with underscore instead of space
  const handleNameChange = (e) => {
    const value = e.target.value.replace(/\s/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    setTemplateName(value);
  };

  // Handle continue button click
  const handleContinue = () => {
    if (category && templateName.length >= 3) {
      setShowTemplateForm(true);
    }
  };

  // If showing template form, render it
  if (showTemplateForm) {
    return (
      <TemplateForm
        templateName={templateName}
        category={category}
        onCancel={() => setShowTemplateForm(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Fixed on Mobile, Static on Desktop */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button 
                onClick={onCancel}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
              >
                <BiChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                New Message Template
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onCancel}
                className="hidden lg:block px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                disabled={!category || templateName.length < 3}
                className={`px-4 py-2 rounded-lg ${
                  category && templateName.length >= 3
                    ? 'bg-teal-600 text-white hover:bg-teal-700'
                    : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        {/* Alert Banner */}
       

        {/* Category Selection */}
        <div className="mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Category *
            </label>
            <p className="text-sm text-gray-500">
              Choose what type of message template you want to create.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`
                  p-6 border rounded-lg transition-all
                  flex flex-col items-center justify-center gap-3
                  ${category === cat.id ? 'border-teal-600 bg-teal-50' : 'hover:border-teal-600'}
                `}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className={cat.color}>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Template Name */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
            <label className="text-gray-700 font-medium">
              Name *
            </label>
            <span className="text-sm text-gray-500">
              ({templateName.length} / 250)
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            Template Name should only contain, (a-z, A-Z, 0-9,_), min. 3 chars, max. 250 chars.
          </p>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              📝
            </span>
            <input
              type="text"
              value={templateName}
              onChange={handleNameChange}
              placeholder="Message Template Name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                         focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              maxLength={250}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplate;