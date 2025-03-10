import React, { useState } from "react";

// Profile Content Component using to setting page
const ProfileContent = () => {
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [website1, setWebsite1] = useState("");
  const [website2, setWebsite2] = useState("");

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-xl font-bold mb-4">Profile</h2>

      {/* Profile Photo Section */}
      <div className="mb-4">
        <h3 className="font-semibold">Profile Photo</h3>
        <p className="text-sm">This will be visible on your business profile</p>
        <button className="mt-2 px-4 py-2 bg-whatsapp-green text-black rounded text-sm">Choose File</button>
      </div>

      {/* Display Name Section */}
      <div className="mb-4">
        <h3 className="font-semibold">Display Name</h3>
        <p>Vaseegrah Shop</p>
        <button className="mt-2 px-4 py-2 bg-gray-300 rounded text-sm">Edit</button>
      </div>

      {/* Official Business Account Section */}
      <div className="mb-4">
        <h3 className="font-semibold">Official Business Account</h3>
        <p className="text-sm">
          An official business account has a blue tick next to its name. This shows
          WhatsApp has confirmed the account.
        </p>
        <button className="mt-2 px-4 py-2 bg-gray-300 rounded text-sm">Submit Request</button>
      </div>

      {/* Business Information Section */}
      <div>
        <h3 className="font-semibold mb-2">Business Information</h3>
        <p className="mb-4 text-sm">Add some details about your business</p>

        {/* Input Fields */}
        <div className="space-y-4">
          {/* Category */}
          <div>
            <label className="block font-semibold mb-1 text-sm">Category</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="Shopping and Retail">Shopping and Retail</option>
              <option value="Services">Services</option>
              <option value="Food and Beverages">Food and Beverages</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1 text-sm">Description (Optional)</label>
            <div className="relative">
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 pr-12 text-sm"
                placeholder="Enter a brief description of your business"
                rows="4"
                maxLength="512"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <span className="absolute right-3 bottom-3 text-xs text-gray-500">
                {description.length}/512
              </span>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block font-semibold mb-1 text-sm">Address (Optional)</label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 pr-12 text-sm"
                placeholder="Enter business address"
                maxLength="256"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <span className="absolute right-3 top-3 text-xs text-gray-500">
                {address.length}/256
              </span>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1 text-sm">Email (Optional)</label>
            <div className="relative">
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 pr-12 text-sm"
                placeholder="Enter business email address"
                maxLength="128"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute right-3 top-3 text-xs text-gray-500">
                {email.length}/128
              </span>
            </div>
          </div>

          {/* Website - Two Input Fields */}
          <div>
            <label className="block font-semibold mb-1 text-sm">Website (Optional)</label>
            <div className="relative mb-2">
              <input
                type="url"
                className="w-full border border-gray-300 rounded px-3 py-2 pr-12 text-sm"
                placeholder="https://www.example.com"
                maxLength="256"
                value={website1}
                onChange={(e) => setWebsite1(e.target.value)}
              />
              <span className="absolute right-3 top-3 text-xs text-gray-500">
                {website1.length}/256
              </span>
            </div>
            <div className="relative">
              <input
                type="url"
                className="w-full border border-gray-300 rounded px-3 py-2 pr-12 text-sm"
                placeholder="https://www.another-example.com"
                maxLength="256"
                value={website2}
                onChange={(e) => setWebsite2(e.target.value)}
              />
              <span className="absolute right-3 top-3 text-xs text-gray-500">
                {website2.length}/256
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 text-left">
          <button className="w-full md:w-32 px-4 py-2 bg-whatsapp-green text-black font-semibold rounded text-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent