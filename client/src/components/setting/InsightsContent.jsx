import React from 'react'
// Insights Content Component using to seting page
const InsightsContent = () => (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Message Statistics</h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
          <p className="text-sm text-gray-600">Messages sent this month</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Response Rate</h3>
          <p className="text-3xl font-bold text-green-600">92%</p>
          <p className="text-sm text-gray-600">Average response rate</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="font-semibold mb-4">Popular Message Times</h3>
        <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
          [Chart Placeholder]
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-4">Customer Engagement</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Active Conversations</span>
            <span className="font-semibold">45</span>
          </div>
          <div className="flex justify-between items-center">
            <span>New Contacts</span>
            <span className="font-semibold">128</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Blocked Contacts</span>
            <span className="font-semibold">3</span>
          </div>
        </div>
      </div>
    </div>
  );

export default InsightsContent