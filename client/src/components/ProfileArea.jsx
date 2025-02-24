import React from "react";

const ProfileArea = ({ selectedContact }) => {
    return (
      <div className="w-1/3 bg-gray-100 p-6 flex flex-col items-center min-h-screen">
        {/* Profile Header */}
        <div className="w-full bg-green-500 text-white text-center py-2 rounded-t-md">
          <h1 className="text-lg font-semibold">Profile</h1>
        </div>
  
        {/* Avatar and Name Section */}
        <div className="bg-white w-full flex flex-col items-center py-6 shadow-md rounded-md">
          <div className="w-20 h-20 rounded-full bg-green-500 text-white flex justify-center items-center text-2xl font-bold">
            {selectedContact.name.charAt(0)}
          </div>
          <h2 className="mt-4 text-xl font-semibold">{selectedContact.name}</h2>
          <p className="text-gray-500 text-sm">{selectedContact.phone || "N/A"}</p>
        </div>
  
        {/* Assisted Sales Section */}
        <div className="w-full mt-4 text-center bg-gray-200 py-1 text-sm font-medium text-gray-600">
          Assisted Sales
        </div>
  
        {/* Orders and Wallet Information */}
        <div className="grid grid-cols-3 gap-3 w-full mt-4">
          <div className="bg-white text-center py-4 shadow-md rounded-md">
            <h3 className="text-sm font-semibold">Orders Count</h3>
            <p className="text-gray-700 text-lg">1</p>
          </div>
          <div className="bg-white text-center py-4 shadow-md rounded-md">
            <h3 className="text-sm font-semibold">Total Order Value</h3>
            <p className="text-gray-700 text-lg">₹230</p>
          </div>
          <div className="bg-white text-center py-4 shadow-md rounded-md">
            <h3 className="text-sm font-semibold">Wallet</h3>
            <p className="text-gray-700 text-lg">0</p>
          </div>
        </div>
  
        {/* Order Details */}
        <div className="bg-white w-full mt-4 p-4 shadow-md rounded-md space-y-3">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="bg-green-200 text-green-800 text-xs py-1 px-2 rounded-md">
                FULFILLED
              </span>
            </div>
            <div className="text-purple-700 text-xs">Details ▼</div>
          </div>
          <p className="text-gray-700 text-sm">
            <strong>Order ID:</strong> 1108
          </p>
          <p className="text-gray-700 text-sm">
            <strong>Ordered at:</strong> Jul 30, 2024, 11:16:59 PM
          </p>
          <p className="text-gray-700 text-sm">
            <strong>Amount:</strong> ₹230
          </p>
        </div>
  
        {/* Address and Note Section */}
        <div className="bg-white w-full mt-4 p-4 shadow-md rounded-md space-y-3">
          <div className="border-b pb-2">
            <h3 className="text-gray-800 text-sm font-medium">Address</h3>
          </div>
          <p className="text-gray-700 text-sm mt-2">
            <strong>Email Address:</strong> sampleemail@gmail.com{" "}
            <span className="text-blue-500 cursor-pointer">Edit</span>
          </p>
          <p className="text-gray-700 text-sm mt-2">
            <strong>Address:</strong> Not available
          </p>
        </div>
      </div>
    );
  };
  
  

export default ProfileArea;
