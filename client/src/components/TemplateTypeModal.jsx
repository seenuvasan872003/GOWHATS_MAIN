import React from 'react';
import { IoClose } from 'react-icons/io5';

const TemplateTypeModal = ({ isOpen, onClose, onSelectType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[500px] mx-auto">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Template Type *</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <IoClose className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Choose what type of message template you want to create.
          </p>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Standard Template */}
            <button
              onClick={() => onSelectType('Standard')}
              className="relative p-4 sm:p-6 border rounded-lg hover:border-teal-600 focus:border-teal-600 
                         transition-all group"
            >
              <div className="text-center">
                {/* <div className="text-2xl mb-2">📝</div> */}
                <span className="text-gray-800 group-hover:text-teal-600 font-medium">
                  Standard
                </span>
              </div>
            </button>

            {/* Carousel Template */}
            <button
              onClick={() => onSelectType('Carousel')}
              className="relative p-4 sm:p-6 border rounded-lg hover:border-teal-600 focus:border-teal-600 
                         transition-all group"
            >
           
              <div className="text-center">
                {/* <div className="text-2xl mb-2">🎠</div> */}
                <span className="text-gray-800 group-hover:text-teal-600 font-medium">
                  Carousel
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Footer
        <div className="p-4 sm:p-6 border-t bg-gray-50 rounded-b-lg">
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg 
                         order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              onClick={() => onSelectType('Standard')}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 
                         order-1 sm:order-2"
            >
              Create
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TemplateTypeModal;