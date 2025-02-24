import React, { useState } from "react";

// Side Navigation Component
const SideNavigation = ({ onSelect }) => (
  <div className="w-1/4 p-4 bg-gray-200 h-full overflow-auto">
    <h2 className="mb-4 text-lg font-semibold">Navigation</h2>
    <ul>
      <li
        className="p-2 mb-2 font-medium text-blue-700 hover:bg-gray-300 rounded cursor-pointer"
        onClick={() => onSelect("profile")}
      > 
        Profile
      </li>
      <li
        className="p-2 mb-2 hover:bg-gray-300 rounded cursor-pointer"
        onClick={() => onSelect("insights")}
      >
        Insights
      </li>
      <li
        className="p-2 mb-2 hover:bg-gray-300 rounded cursor-pointer"
        onClick={() => onSelect("automations")}
      >
        Automations
      </li>
      <li
        className="p-2 mb-2 hover:bg-gray-300 rounded cursor-pointer"
        onClick={() => onSelect("messageLinks")}
      >
        Message Links
      </li>
      <li
        className="p-2 mb-2 hover:bg-gray-300 rounded cursor-pointer"
        onClick={() => onSelect("twoStepVerification")}
      >
        Two-step Verification
      </li>
      <li
        className="p-2 mb-2 hover:bg-gray-300 rounded cursor-pointer"
        onClick={() => onSelect("messageHistory")}
      >
        Message History
      </li>
    </ul>
  </div>
);

// Header Section (Dynamic)
const Header = ({ title, subtitle }) => (
  <div className="w-full bg-white shadow-md px-6 py-2">
    <h1 className="text-lg font-bold">{title}</h1>
    <p className="text-gray-600">{subtitle}</p>
  </div>
);


const ProfileContent = () => {
  // State for character limits
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [website1, setWebsite1] = useState("");
  const [website2, setWebsite2] = useState("");

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Profile</h2>

      {/* Profile Photo Section */}
      <div className="mb-4">
        <h3 className="font-semibold">Profile Photo</h3>
        <p>This will be visible on your business profile</p>
        <button className="mt-2 px-4 py-2 bg-whatsapp-green text-black rounded">Choose File</button>
      </div>

      {/* Display Name Section */}
      <div className="mb-4">
        <h3 className="font-semibold">Display Name</h3>
        <p>Vaseegrah Shop</p>
        <button className="mt-2 px-4 py-2 bg-gray-300 rounded">Edit</button>
      </div>

      {/* Official Business Account Section */}
      <div className="mb-4">
        <h3 className="font-semibold">Official Business Account</h3>
        <p>
          An official business account has a blue tick next to its name. This shows
          WhatsApp has confirmed the account.
        </p>
        <button className="mt-2 px-4 py-2 bg-gray-300 rounded">Submit Request</button>
      </div>

      {/* Business Information Section */}
      <div>
        <h3 className="font-semibold mb-2">Business Information</h3>
        <p className="mb-4">Add some details about your business</p>

        {/* Input Fields */}
        <div className="space-y-4">
          {/* Category */}
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option value="Shopping and Retail">Shopping and Retail</option>
              <option value="Services">Services</option>
              <option value="Food and Beverages">Food and Beverages</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Description (Optional)</label>
            <div className="relative">
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 pr-12"
                placeholder="Enter a brief description of your business"
                rows="4"
                maxLength="512"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <span className="absolute right-3 bottom-3 text-sm text-gray-500">
                {description.length}/512
              </span>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block font-semibold mb-1">Address (Optional)</label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 pr-12"
                placeholder="Enter business address"
                maxLength="256"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <span className="absolute right-3 top-3 text-sm text-gray-500">
                {address.length}/256
              </span>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">Email (Optional)</label>
            <div className="relative">
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 pr-12"
                placeholder="Enter business email address"
                maxLength="128"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute right-3 top-3 text-sm text-gray-500">
                {email.length}/128
              </span>
            </div>
          </div>

          {/* Website - Two Input Fields */}
          <div>
            <label className="block font-semibold mb-1">Website (Optional)</label>
            <div className="relative mb-2">
              <input
                type="url"
                className="w-full border border-gray-300 rounded px-3 py-2 pr-12"
                placeholder="https://www.example.com"
                maxLength="256"
                value={website1}
                onChange={(e) => setWebsite1(e.target.value)}
              />
              <span className="absolute right-3 top-3 text-sm text-gray-500">
                {website1.length}/256
              </span>
            </div>
            <div className="relative">
              <input
                type="url"
                className="w-full border border-gray-300 rounded px-3 py-2 pr-12"
                placeholder="https://www.another-example.com"
                maxLength="256"
                value={website2}
                onChange={(e) => setWebsite2(e.target.value)}
              />
              <span className="absolute right-3 top-3 text-sm text-gray-500">
                {website2.length}/256
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 text-left">
          <button className="w-32 px-4 py-2 bg-whatsapp-green text-black font-semibold rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};


// Right-Side Profile Box Component
const ProfileBox = () => (
  <div className="bg-gray-50 rounded-lg shadow p-4 max-w-xs">
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

// Placeholder Content for Non-Profile Sections
const PlaceholderContent = ({ section }) => (
  <div className="p-4">
    <h2 className="text-xl font-bold">Content for {section}</h2>
    <p>This section is under construction.</p>
  </div>
);

// Main Settings Page Component
const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("profile"); // Default to profile

  return (
    <div className="flex h-screen">

      {/* Side Navigation */}
      <SideNavigation onSelect={(section) => setActiveSection(section)} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Render Header Dynamically */}
        <Header
          title={activeSection === "profile" ? "+91 82488 60985" : activeSection}
          subtitle={activeSection === "profile" ? "Vaseegrah Shop" : `Details for ${activeSection}`}
        />

        {/* Main Content and Profile Box */}
        <div className="flex flex-1 p-4">
          {/* Left/Main Content */}
          <div className="flex-1 overflow-auto p-4 bg-white rounded-lg shadow">
            {activeSection === "profile" ? (
              <ProfileContent />
            ) : (
              <PlaceholderContent section={activeSection} />
            )}
          </div>

          {/* Right-Side Profile Box */}
          {activeSection === "profile" && (
            <div className="w-1/3 p-4">
              <ProfileBox />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
