import React, { useState } from "react";
import Headerseting from "../components/setting/Headerseting";
import SideNavigation from "../components/setting/SideNavigation";
import ProfileBox from "../components/setting/ProfileBox";
import MessageHistoryContent from "../components/setting/MessageHistoryContent";
import TwoStepVerificationContent from "../components/setting/TwoStepVerificationContent";
import MessageLinksContent from "../components/setting/MessageLinksContent";
import AutomationsContent from "../components/setting/AutomationsContent";
import InsightsContent from "../components/setting/InsightsContent";
import ProfileContent from "../components/setting/ProfileContent";

// Main Settings Page Component
const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("profile"); // Set default to "profile"
  const [showProfileBox, setShowProfileBox] = useState(true);

  const handleSectionSelect = (section) => {
    setActiveSection(section);
  };

  const handleBackToMenu = () => {
    setActiveSection("");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileContent />;
      case "insights":
        return <InsightsContent />;
      case "automations":
        return <AutomationsContent />;
      case "messageLinks":
        return <MessageLinksContent />;
      case "twoStepVerification":
        return <TwoStepVerificationContent />;
      case "messageHistory":
        return <MessageHistoryContent />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Side Navigation */}
      <div className={`${
        !activeSection ? 'block' : 'hidden'
      } md:block md:w-1/4 h-screen fixed md:relative w-full  bg-gray-200`}>
        <SideNavigation 
          onSelect={handleSectionSelect}
          activeSection={activeSection}
          onBack={handleBackToMenu}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header - Only show on mobile */}
        <div >
          <Headerseting
            title={activeSection}
            subtitle={
              activeSection === "profile" 
                ? "+91 82488 60985" 
                : activeSection 
                  ? `Details for ${activeSection}` 
                  : " "
            }
            onBack={handleBackToMenu}
            showBackButton={!!activeSection}
          />
        </div>

        {/* Content Area */}
        {(activeSection || window.innerWidth >= 768) && (
          <div className="flex-1 overflow-auto">
            {/* Profile Box - Mobile */}
            {activeSection === "profile" && showProfileBox && (
              <div className="p-4 md:hidden">
                <ProfileBox />
              </div>
            )}

            {/* Main Content */}
            <div className="flex flex-1 p-4">
              {/* Left/Main Content */}
              <div className="flex-1 overflow-auto p-4 bg-white rounded-lg shadow">
                {renderContent()}
              </div>

              {/* Right-Side Profile Box */}
              {activeSection === "profile" && (
                <div className="hidden md:block w-1/3 p-4">
                  <ProfileBox />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;