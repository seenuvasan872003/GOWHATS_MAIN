import React from 'react';

const BodySection = ({ body, onChange }) => {
  const formatButtons = [
    { icon: '𝐁', tooltip: 'Bold' },
    { icon: 'I', tooltip: 'Italic' },
    { icon: 'S̲', tooltip: 'Strikethrough' },
    { icon: '<>', tooltip: 'Code' }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Body <span className="text-red-500">*</span>
        </label>
        <span className="text-xs text-gray-500">
          ({body.text?.length || 0} / 1024)
        </span>
      </div>
      <p className="text-sm text-gray-500">
        Enter the text for your message in the language you've selected.
      </p>
      <textarea
        value={body.text || ''}
        onChange={(e) => onChange({ ...body, text: e.target.value })}
        placeholder="Type your message"
        rows={4}
        maxLength={1024}
        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-teal-600"
      />
      <div className="flex items-center gap-2">
        {formatButtons.map((btn) => (
          <button
            key={btn.tooltip}
            title={btn.tooltip}
            className="p-2 hover:bg-gray-100 rounded"
          >
            {btn.icon}
          </button>
        ))}
        <button className="ml-auto text-teal-600 text-sm hover:underline">
          + Add Variable
        </button>
      </div>
    </div>
  );
};

export default BodySection;