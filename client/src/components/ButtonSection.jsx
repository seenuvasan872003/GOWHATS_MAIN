import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';

const ButtonSection = ({ buttons, onChange }) => {
  const [buttonType, setButtonType] = useState('');
  const [actionType, setActionType] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [urlType, setUrlType] = useState('dynamic');
  const [websiteUrl, setWebsiteUrl] = useState('');

  // Reset states when button type changes
  useEffect(() => {
    setActionType('');
    setButtonText('');
    setPhoneNumber('');
    setUrlType('dynamic');
    setWebsiteUrl('');
  }, [buttonType]);

  // Update buttons when action type or button text changes
  useEffect(() => {
    if (buttonType === 'call_to_action' && actionType && buttonText) {
      const newButton = {
        type: 'call_to_action',
        actionType,
        text: buttonText,
        ...(actionType === 'call_phone_number' ? { phoneNumber } : {}),
        ...(actionType === 'visit_website' ? { urlType, url: websiteUrl } : {})
      };
      onChange([newButton]);
    }
  }, [actionType, buttonText, phoneNumber, urlType, websiteUrl]);

  const handleQuickReplyAdd = () => {
    if (buttons.length < 3) {
      onChange([...buttons, { type: 'quick_reply', text: '' }]);
    }
  };

  const handleQuickReplyChange = (index, text) => {
    const newButtons = [...buttons];
    newButtons[index] = { type: 'quick_reply', text };
    onChange(newButtons);
  };

  const handleQuickReplyRemove = (index) => {
    const newButtons = buttons.filter((_, i) => i !== index);
    onChange(newButtons);
  };

  const renderQuickReplySection = () => (
    <div className="space-y-3">
      {buttons.map((button, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            value={button.text || ''}
            onChange={(e) => handleQuickReplyChange(index, e.target.value)}
            placeholder="Quick reply text"
            className="flex-1 p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            maxLength={20}
          />
          <button
            onClick={() => handleQuickReplyRemove(index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-md"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>
      ))}
      {buttons.length < 3 && (
        <button
          onClick={handleQuickReplyAdd}
          className="flex items-center gap-2 text-teal-600 hover:underline"
        >
          <FiPlus className="w-4 h-4" /> Add
        </button>
      )}
    </div>
  );

  const renderCallToActionSection = () => (
    <div className="space-y-4">
      {/* Action Type Selection */}
      <div>
        <label className="block text-sm mb-1">Type of Action</label>
        <select
          value={actionType}
          onChange={(e) => setActionType(e.target.value)}
          className="w-full p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        >
          <option value="">Select action type</option>
          <option value="call_phone_number">Call phone number</option>
          <option value="visit_website">Visit website</option>
        </select>
      </div>

      {/* Phone Number Section */}
      {actionType === 'call_phone_number' && (
        <>
          <div>
            <label className="block text-sm mb-1">Button Text *</label>
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              placeholder="call now"
              className="w-full p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              maxLength={20}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone Number *</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+91 1234567890"
              className="w-full p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            />
          </div>
        </>
      )}

      {/* Website Section */}
      {actionType === 'visit_website' && (
        <>
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm">Button Text *</label>
              <label className="text-sm">URL Type *</label>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="visit the site"
                className="flex-1 p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                maxLength={20}
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
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setUrlType('custom')}
              className={`flex-1 px-4 py-2 border rounded-md transition-colors ${
                urlType === 'custom' ? 'border-teal-600 bg-teal-50' : ''
              }`}
            >
              Custom URL
            </button>
            <button
              onClick={() => setUrlType('bob')}
              className={`flex-1 px-4 py-2 border rounded-md transition-colors ${
                urlType === 'bob' ? 'border-teal-600 bg-teal-50' : ''
              }`}
            >
              BOB URL
            </button>
          </div>

          <div>
            <label className="block text-sm mb-1">Website URL *</label>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            />
            {urlType === 'custom' && (
              <p className="text-xs text-red-500 mt-1">
                Custom URL should contain variable
              </p>
            )}
          </div>

          {urlType === 'dynamic' && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
              <p className="text-sm text-yellow-800">
                Template with custom URL cannot be used anywhere on the dashboard
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Buttons <span className="text-gray-400">(optional)</span>
        </label>
        <p className="text-sm text-gray-500 mb-4">
          Create buttons that let customers respond to your message or take action.
        </p>

        <select
          value={buttonType}
          onChange={(e) => {
            setButtonType(e.target.value);
            onChange([]); // Reset buttons when type changes
          }}
          className="w-full p-2 border rounded-md focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
        >
          <option value="">None</option>
          <option value="quick_reply">Quick reply</option>
          <option value="call_to_action">Call to action</option>
        </select>
      </div>

      {buttonType === 'quick_reply' && renderQuickReplySection()}
      {buttonType === 'call_to_action' && renderCallToActionSection()}
    </div>
  );
};

export default ButtonSection;