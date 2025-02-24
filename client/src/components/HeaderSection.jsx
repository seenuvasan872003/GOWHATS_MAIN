import React from 'react';

const HeaderSection = ({ header, onChange }) => {
  const headerTypes = [
    { value: 'none', label: 'None' },
    { value: 'text', label: 'Text' },
    { value: 'image', label: 'Image' },
    { value: 'video', label: 'Video' },
    { value: 'document', label: 'Document' }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Header <span className="text-gray-400">(optional)</span>
        </label>
        <span className="text-xs text-gray-500">
          ({header.content?.length || 0} / 60)
        </span>
      </div>
      <p className="text-sm text-gray-500">
        Add a title or choose which type of media you'll use for this header.
      </p>
      <select
        value={header.type}
        onChange={(e) => onChange({ ...header, type: e.target.value })}
        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-teal-600"
      >
        {headerTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      {header.type === 'text' && (
        <input
          type="text"
          value={header.content || ''}
          onChange={(e) => onChange({ ...header, content: e.target.value })}
          placeholder="Add your header text"
          maxLength={60}
          className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-teal-600"
        />
      )}
    </div>
  );
};

export default HeaderSection;