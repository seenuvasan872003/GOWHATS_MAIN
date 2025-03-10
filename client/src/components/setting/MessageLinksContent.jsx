import React from 'react'

// Message Links Content Component using to seting page
const MessageLinksContent = () => (
    <div className="p-4">
      <div className="mb-6">
        <button className="bg-whatsapp-green text-black px-4 py-2 rounded font-semibold">
          Create New Link
        </button>
      </div>
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Product Catalog</h3>
          <p className="text-sm text-gray-600 mb-3">wa.me/product-catalog</p>
          <div className="flex gap-2">
            <button className="text-blue-600 text-sm">Copy</button>
            <button className="text-blue-600 text-sm">Share</button>
            <button className="text-red-600 text-sm">Delete</button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Support Chat</h3>
          <p className="text-sm text-gray-600 mb-3">wa.me/support</p>
          <div className="flex gap-2">
            <button className="text-blue-600 text-sm">Copy</button>
            <button className="text-blue-600 text-sm">Share</button>
            <button className="text-red-600 text-sm">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );

export default MessageLinksContent