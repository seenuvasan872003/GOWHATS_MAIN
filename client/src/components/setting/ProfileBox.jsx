import React from 'react'
// Profile Box Component using to seting page
// This component is used to display the profile information
const ProfileBox = () => (
    <div className="bg-gray-50 rounded-lg shadow p-4 w-full md:max-w-xs">
      <img
        src="https://via.placeholder.com/100"
        alt="Profile"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <h3 className="text-center font-bold">Vaseegrah Shop</h3>
      <p className="text-center text-gray-600">+91 82488 60985</p>
      <div className="mt-2 text-center">
        <button className="text-blue-500 underline text-sm">Share</button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-gray-500 text-sm">Shopping and retail</p>
        <p className="text-gray-400 text-xs">
          This experience may look different across devices.
        </p>
      </div>
    </div>
  );

export default ProfileBox