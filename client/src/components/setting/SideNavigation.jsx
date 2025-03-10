import React from 'react'
import {  BarChart3, Zap, Link, Shield, History, User } from 'lucide-react';

// Side Navigation Component using to setting page
const SideNavigation = ({ onSelect, activeSection, onBack }) => {
    const handleSelect = (section) => {
      onSelect(section);
    };
  
    return (
      <div className="w-full h-full bg-gray-200 p-4 overflow-auto">
        {/* Only show menu title and back button on mobile */}
        <div className="items-center gap-2 mb-6">
          <h2 className="text-xl font-bold">Menu</h2>
        </div>
        <ul className="space-y-4 md:space-y-2">
          <li
            className={`p-3 md:p-2 rounded-lg cursor-pointer flex items-center gap-3 transition-all ${
              activeSection === "profile" 
                ? "bg-green-100 text-green-500 font-medium" 
                : "hover:bg-gray-300 text-gray-700"
            }`}
            onClick={() => handleSelect("profile")}
          > 
            <User size={20} /> Profile
          </li>
          <li
            className={`p-3 md:p-2 rounded-lg cursor-pointer flex items-center gap-3 transition-all ${
              activeSection === "insights" 
                ? "bg-green-100 text-green-500 font-medium" 
                : "hover:bg-gray-300 text-gray-700"
            }`}
            onClick={() => handleSelect("insights")}
          >
            <BarChart3 size={20} /> Insights
          </li>
          <li
            className={`p-3 md:p-2 rounded-lg cursor-pointer flex items-center gap-3 transition-all ${
              activeSection === "automations" 
                ? "bg-green-100 text-green-500 font-medium" 
                : "hover:bg-gray-300 text-gray-700"
            }`}
            onClick={() => handleSelect("automations")}
          >
            <Zap size={20} /> Automations
          </li>
          <li
            className={`p-3 md:p-2 rounded-lg cursor-pointer flex items-center gap-3 transition-all ${
              activeSection === "messageLinks" 
                ? "bg-green-100 text-green-500 font-medium" 
                : "hover:bg-gray-300 text-gray-700"
            }`}
            onClick={() => handleSelect("messageLinks")}
          >
            <Link size={20} /> Message Links
          </li>
          <li
            className={`p-3 md:p-2 rounded-lg cursor-pointer flex items-center gap-3 transition-all ${
              activeSection === "twoStepVerification" 
                ? "bg-green-100 text-green-500 font-medium" 
                : "hover:bg-gray-300 text-gray-700"
            }`}
            onClick={() => handleSelect("twoStepVerification")}
          >
            <Shield size={20} /> Two-step Verification
          </li>
          <li
            className={`p-3 md:p-2 rounded-lg cursor-pointer flex items-center gap-3 transition-all ${
              activeSection === "messageHistory" 
                ? "bg-green-100 text-green-500 font-medium" 
                : "hover:bg-gray-300 text-gray-700"
            }`}
            onClick={() => handleSelect("messageHistory")}
          >
            <History size={20} /> Message History
          </li>
        </ul>
      </div>
    );
  };

export default SideNavigation