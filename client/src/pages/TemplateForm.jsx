import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';
import PhonePreview from '../components/PhonePreview';
import { toast } from 'react-hot-toast';
import { createWhatsAppTemplate } from '../services/templateService';


const TemplateForm = ({ templateName, category, onCancel }) => {
  // Template State
  const [template, setTemplate] = useState({
    language: 'English(en_US)',
    header: {
      type: 'text',
      content: '',
      charCount: 0
    },
    body: {
      text: '',
      variables: [],
      charCount: 0
    },
    footer: {
      text: '',
      charCount: 0
    },
    buttons: []
  });

  const handleSubmit = async () => {
    try {
      await createWhatsAppTemplate({
        name: templateName,
        language: 'en_US',
        category: category,
        header: template.header,
        body: template.body.text,
        footer: template.footer.text,
        buttons: template.buttons
      });
      
      toast.success('Template created successfully');
      onCancel();
    } catch (error) {
      toast.error('Failed to create template');
      console.error(error);
    }
  };

  // Modal States
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [buttonType, setButtonType] = useState('');
  const [actionType, setActionType] = useState('');
  const [urlType, setUrlType] = useState('dynamic');


  // ... continuing from Part 1

  // Sample Modal Component
  const SampleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Add Sample Content</h2>
            <button 
              onClick={() => setShowSampleModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-6">
            To help us understand what kind of message you want to send, you have the option to provide specific content examples for your template. You can add a sample template for one or all languages you are submitting.
          </p>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Body</label>
            {template.body.variables.map((variable, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm text-gray-600">
                  Example for {`${index + 1}`}
                </label>
                <input
                  type="text"
                  autoFocus={index === 0}
                  value={variable.example || ''}
                  onChange={(e) => {
                    const newVariables = [...template.body.variables];
                    newVariables[index] = { ...variable, example: e.target.value };
                    setTemplate(prev => ({
                      ...prev,
                      body: { ...prev.body, variables: newVariables }
                    }));
                  }}
                  className="w-full p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                  placeholder="Enter example text"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-6">
          <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
      >
        Submit Template
      </button>
            <button
              onClick={() => setShowSampleModal(false)}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Handler Functions
  const handleAddVariable = () => {
    const newVariable = {
      id: (template.body.variables.length + 1),
      example: ''
    };
    
    setTemplate(prev => ({
      ...prev,
      body: {
        ...prev.body,
        text: prev.body.text + ` {{${newVariable.id}}}`,
        variables: [...prev.body.variables, newVariable],
        charCount: (prev.body.text + ` {{${newVariable.id}}}`).length
      }
    }));
  };

  const handleHeaderChange = (e) => {
    const content = e.target.value;
    setTemplate(prev => ({
      ...prev,
      header: {
        ...prev.header,
        content,
        charCount: content.length
      }
    }));
  };

  const handleBodyChange = (e) => {
    const text = e.target.value;
    setTemplate(prev => ({
      ...prev,
      body: {
        ...prev.body,
        text,
        charCount: text.length
      }
    }));
  };

  const handleFooterChange = (e) => {
    const text = e.target.value;
    setTemplate(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        text,
        charCount: text.length
      }
    }));
  };

  const handleButtonTypeChange = (type) => {
    setButtonType(type);
    setActionType('');
    setTemplate(prev => ({
      ...prev,
      buttons: []
    }));
  };

  const handleQuickReplyAdd = () => {
    if (template.buttons.length < 3) {
      setTemplate(prev => ({
        ...prev,
        buttons: [...prev.buttons, { type: 'quick_reply', text: '' }]
      }));
    }
  };

  const handleQuickReplyChange = (index, text) => {
    setTemplate(prev => {
      const newButtons = [...prev.buttons];
      newButtons[index] = { type: 'quick_reply', text };
      return { ...prev, buttons: newButtons };
    });
  };

  const handleQuickReplyRemove = (index) => {
    setTemplate(prev => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== index)
    }));
  };

  const handleCallToActionChange = (data) => {
    setTemplate(prev => ({
      ...prev,
      buttons: [{
        type: 'call_to_action',
        ...data
      }]
    }));
  };


  // Side Effects
  useEffect(() => {
    if (buttonType === 'call_to_action' && actionType) {
      handleCallToActionChange({
        actionType,
        text: '',
        ...(actionType === 'call_phone_number' ? { phoneNumber: '' } : {}),
        ...(actionType === 'visit_website' ? { urlType, url: '' } : {})
      });
    }
  }, [buttonType, actionType, urlType]);


  // ... continuing from Part 2

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={onCancel}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <BiArrowBack className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-medium">{templateName}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Category:</span>
                <select 
                  value={category}
                  className="px-3 py-1.5 border rounded-md bg-white"
                  disabled
                >
                  <option>{category}</option>
                </select>
              </div>
              <button
                onClick={onCancel}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => console.log('Submit template:', template)}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Form Section */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Language and Sample Section */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700">{template.language}</span>
              <button
                onClick={() => setShowSampleModal(true)}
                className="px-3 py-1.5 text-sm text-teal-600 border border-teal-600 rounded-md hover:bg-teal-50"
              >
                Add Sample
              </button>
            </div>

            {/* Header Section */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Header <span className="text-gray-400">(optional)</span>
                </label>
                <span className="text-xs text-gray-500">
                  ({template.header.charCount} / 60)
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Add a title or choose which type of media you'll use for this header.
              </p>
              <select
                value={template.header.type}
                onChange={(e) => setTemplate(prev => ({
                  ...prev,
                  header: { ...prev.header, type: e.target.value, content: '' }
                }))}
                className="w-full p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              >
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="document">Document</option>
                <option value="none">None</option>
              </select>
              {template.header.type === 'text' && (
                <input
                  type="text"
                  value={template.header.content}
                  onChange={handleHeaderChange}
                  placeholder="Add your header text"
                  maxLength={60}
                  className="w-full p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
              )}
            </div>

            {/* Body Section */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Body <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-gray-500">
                  ({template.body.charCount} / 1024)
                </span>
              </div>
              <textarea
                value={template.body.text}
                onChange={handleBodyChange}
                placeholder="Enter your message text"
                rows={4}
                maxLength={1024}
                className="w-full p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              />
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded">⊙</button>
                <button className="p-2 hover:bg-gray-100 rounded">B</button>
                <button className="p-2 hover:bg-gray-100 rounded">I</button>
                <button className="p-2 hover:bg-gray-100 rounded">S</button>
                <button className="p-2 hover:bg-gray-100 rounded">{`</>`}</button>
                <button
                  onClick={handleAddVariable}
                  className="ml-auto text-teal-600 text-sm hover:underline"
                >
                  + Add Variable
                </button>
              </div>
            </div>

            {/* Footer Section */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Footer <span className="text-gray-400">(optional)</span>
                </label>
                <span className="text-xs text-gray-500">
                  ({template.footer.charCount} / 60)
                </span>
              </div>
              <input
                type="text"
                value={template.footer.text}
                onChange={handleFooterChange}
                placeholder="Add a short footer text"
                maxLength={60}
                className="w-full p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              />
            </div>

            {/* Button Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Buttons <span className="text-gray-400">(optional)</span>
                </label>
                <p className="text-sm text-gray-500">
                  Create buttons that let customers respond to your message or take action.
                </p>
              </div>

              <select
                value={buttonType}
                onChange={(e) => handleButtonTypeChange(e.target.value)}
                className="w-full p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              >
                <option value="">None</option>
                <option value="quick_reply">Quick reply</option>
                <option value="call_to_action">Call to action</option>
              </select>

              {/* Quick Reply Section */}
              {buttonType === 'quick_reply' && (
                <div className="space-y-3">
                  {template.buttons.map((button, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={button.text}
                        onChange={(e) => handleQuickReplyChange(index, e.target.value)}
                        placeholder="Enter reply text"
                        maxLength={20}
                        className="flex-1 p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                      />
                      <button
                        onClick={() => handleQuickReplyRemove(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                      >
                        <IoClose className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  {template.buttons.length < 3 && (
                    <button
                      onClick={handleQuickReplyAdd}
                      className="flex items-center gap-2 text-teal-600 hover:underline"
                    >
                      <FiPlus className="w-4 h-4" /> Add Quick Reply
                    </button>
                  )}
                </div>
              )}

              {/* Call to Action Section */}
              {buttonType === 'call_to_action' && (
                <div className="space-y-4">
                  <select
                    value={actionType}
                    onChange={(e) => setActionType(e.target.value)}
                    className="w-full p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                  >
                    <option value="">Select action type</option>
                    <option value="call_phone_number">Call phone number</option>
                    <option value="visit_website">Visit website</option>
                  </select>

                  {actionType === 'call_phone_number' && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={template.buttons[0]?.text || ''}
                        onChange={(e) => handleCallToActionChange({
                          ...template.buttons[0],
                          text: e.target.value
                        })}
                        placeholder="Button text (e.g., Call now)"
                        maxLength={20}
                        className="w-full p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                      />
                      <input
                        type="tel"
                        value={template.buttons[0]?.phoneNumber || ''}
                        onChange={(e) => handleCallToActionChange({
                          ...template.buttons[0],
                          phoneNumber: e.target.value
                        })}
                        placeholder="+91 1234567890"
                        className="w-full p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                      />
                    </div>
                  )}

                  {actionType === 'visit_website' && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={template.buttons[0]?.text || ''}
                          onChange={(e) => handleCallToActionChange({
                            ...template.buttons[0],
                            text: e.target.value
                          })}
                          placeholder="Button text"
                          maxLength={20}
                          className="flex-1 p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                        />
                        <select
                          value={urlType}
                          onChange={(e) => setUrlType(e.target.value)}
                          className="w-48 p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                        >
                          <option value="dynamic">Dynamic</option>
                          <option value="static">Static</option>
                        </select>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setUrlType('custom')}
                          className={`flex-1 px-4 py-2 border rounded-md ${
                            urlType === 'custom' ? 'border-teal-600 bg-teal-50' : ''
                          }`}
                        >
                          Custom URL
                        </button>
                        <button
                          onClick={() => setUrlType('bob')}
                          className={`flex-1 px-4 py-2 border rounded-md ${
                            urlType === 'bob' ? 'border-teal-600 bg-teal-50' : ''
                          }`}
                        >
                          BOB URL
                        </button>
                      </div>

                      <input
                        type="url"
                        value={template.buttons[0]?.url || ''}
                        onChange={(e) => handleCallToActionChange({
                          ...template.buttons[0],
                          url: e.target.value
                        })}
                        placeholder="https://example.com"
                        className="w-full p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                      />

                      {urlType === 'dynamic' && (
                        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
                          <p className="text-sm text-yellow-800">
                            Template with custom URL cannot be used anywhere on the dashboard
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-[400px] bg-gray-50 border-l p-6">
          <PhonePreview template={template} />
        </div>
      </div>

      {/* Sample Modal */}
      {showSampleModal && <SampleModal />}
    </div>
  );
};

export default TemplateForm;