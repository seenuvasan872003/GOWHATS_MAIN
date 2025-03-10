import React from 'react'

// Message History Content Component using to seting page
const MessageHistoryContent = () => (
    <div className="p-4">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Message History</h3>
          <p className="text-sm text-gray-600">Last 30 days of activity</p>
        </div>
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded">
          Export
        </button>
      </div>
      
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">Customer {i + 1}</h4>
                <p className="text-sm text-gray-600">+1 234 567 890{i}</p>
              </div>
              <span className="text-sm text-gray-500">2h ago</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Last message: Thank you for your quick response!
            </p>
            <div className="flex gap-2">
              <button className="text-blue-600 text-sm">View Chat</button>
              <button className="text-gray-600 text-sm">Archive</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

export default MessageHistoryContent