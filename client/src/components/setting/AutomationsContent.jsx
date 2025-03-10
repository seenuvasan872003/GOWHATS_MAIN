import React from 'react'
// Automations Content Component using to seting page
const AutomationsContent = () => (
    <div className="p-4">
      <div className="mb-6">
        <button className="bg-whatsapp-green text-black px-4 py-2 rounded font-semibold">
          Create New Automation
        </button>
      </div>
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold">Welcome Message</h3>
              <p className="text-sm text-gray-600">Sends a greeting to new contacts</p>
            </div>
            <div className="flex items-center">
              <span className="text-green-600 text-sm mr-2">Active</span>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="text-sm text-gray-700">
            Triggers: New contact added
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold">Away Message</h3>
              <p className="text-sm text-gray-600">Automatic response during off-hours</p>
            </div>
            <div className="flex items-center">
              <span className="text-green-600 text-sm mr-2">Active</span>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="text-sm text-gray-700">
            Triggers: Outside business hours
          </div>
        </div>
      </div>
    </div>
  );

export default AutomationsContent