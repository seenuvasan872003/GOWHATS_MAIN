import React from 'react'

// Two-step Verification Content Component using to setting page
const TwoStepVerificationContent = () => (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
        <h3 className="font-semibold mb-4">Two-step Verification</h3>
        <p className="text-sm text-gray-600 mb-6">
          Add an extra layer of security to your account by requiring a PIN when registering your phone number with WhatsApp Business.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Enter PIN</label>
            <input type="password" className="w-full border rounded px-3 py-2" maxLength={6} />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Confirm PIN</label>
            <input type="password" className="w-full border rounded px-3 py-2" maxLength={6} />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Recovery Email (Optional)</label>
            <input type="email" className="w-full border rounded px-3 py-2" placeholder="Enter recovery email" />
          </div>
          
          <button className="w-full bg-whatsapp-green text-black px-4 py-2 rounded font-semibold">
            Enable Two-step Verification
          </button>
        </div>
      </div>
    </div>
  );

export default TwoStepVerificationContent