import React from 'react'
import {  ArrowLeft } from 'lucide-react';

// Header Section (Dynamic) using to setting page
const Headerseting = ({ title, subtitle, onBack, showBackButton }) => (
    <div className="w-full bg-white shadow-md px-4 md:px-6 py-4 md:py-2">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <button 
            onClick={onBack} 
            className="md:hidden flex items-center gap-2 text-green-600"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <div>
          <h1 className="text-lg font-bold">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>
    </div>
  );

export default Headerseting