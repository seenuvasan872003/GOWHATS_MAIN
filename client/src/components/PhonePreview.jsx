import React from 'react';
import { BiChevronLeft, BiInfoCircle } from 'react-icons/bi';
import { HiOutlineMicrophone } from 'react-icons/hi';
import { FiPhoneCall, FiExternalLink } from 'react-icons/fi';
import {
    FaSearch,
    FaEllipsisV,
    FaPaperclip,
    FaSmile,
    FaMicrophone,
    FaPaperPlane,
    FaStop,
  } from 'react-icons/fa';

const PhonePreview = ({ template }) => {
  const replacePlaceholders = (text) => {
    if (!text) return '';
    return text.replace(/{{(\d+)}}/g, (match, num) => {
      const variable = template.body.variables.find(v => v.id === parseInt(num));
      return variable ? variable.example : match;
    });
  };

  const renderButtons = () => {
    if (!template.buttons?.length) return null;

    return (
      <div className="border-t mt-2 pt-2 space-y-2">
        {template.buttons.map((button, index) => {
          if (button.type === 'quick_reply' && button.text) {
            return (
              <button
                key={index}
                className="w-full py-2 px-3 bg-[#f0f2f5] text-[#008069] rounded-md text-sm font-medium hover:bg-gray-100"
              >
                {button.text}
              </button>
            );
          }
          
          if (button.type === 'call_to_action' && button.text) {
            return (
              <button
                key={index}
                className="w-full py-2 px-3 bg-[#f0f2f5] text-[#008069] rounded-md text-sm font-medium hover:bg-gray-100 flex items-center justify-center gap-2"
              >
                {button.actionType === 'call_phone_number' ? (
                  <FiPhoneCall className="w-4 h-4" />
                ) : (
                  <FiExternalLink className="w-4 h-4" />
                )}
                {button.text}
              </button>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="w-[320px]  h-[650px] mx-auto relative">
      {/* Phone Frame */}
      <div className="absolute inset-0 bg-black rounded-[45px] shadow-xl">
        {/* Status Bar */}
        {/* <div className="absolute top-0  w-full h-7 px-6 flex justify-between items-center text-white text-xs">
          <span>10:23</span>
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-2xl" />
          <div className="flex items-center gap-1">
            <span>5G</span>
            <span className="battery-icon">100%</span>
          </div>
        </div> */}


        {/* Screen Content */}
        <div className="absolute top-4 left-2 right-2 bottom-2 bg-white rounded-[35px] overflow-hidden">
          {/* WhatsApp Header */}
          <div className="bg-[#008069] text-white px-4 py-4">
            <div className="flex items-center gap-3">
              <BiChevronLeft className="w-6 h-6" />
              <div className="flex-1">
                <div className="text-sm font-medium">vaseegrahveda</div>
              </div>
              <BiInfoCircle className="w-5 h-5" />
            </div>
          </div>

          {/* Chat Background */}
          <div className="bg-[#efeae2] h-[calc(100%-120px)] p-4 overflow-y-auto">
            {/* Message Bubble */}
            <div className="bg-white rounded-lg p-3 max-w-[85%] shadow-sm ml-auto space-y-2">
              {/* Header */}
              {template.header?.type === 'text' && template.header?.content && (
                <div className="font-semibold text-[#1e1e1e]">
                  {template.header.content}
                </div>
              )}

              {/* Body */}
              {template.body?.text && (
                <div className="text-sm text-[#1e1e1e] whitespace-pre-line">
                  {replacePlaceholders(template.body.text)}
                </div>
              )}

              {/* Footer */}
              {template.footer?.text && (
                <div className="text-xs text-gray-500">
                  {template.footer.text}
                </div>
              )}

              {/* Buttons */}
              {renderButtons()}

              {/* Time and Check Marks */}
              <div className="flex items-center justify-end gap-1 pt-1">
                <span className="text-[10px] text-gray-500">10:23 PM</span>
                <div className="flex">
                  <svg
                    className="w-4 h-4 text-[#53bdeb]"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#f0f2f5] px-2 py-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400">
                Type a message
              </div>
              <button className="w-10 h-10 bg-[#008069] rounded-full flex items-center justify-center text-white">
                <FaPaperPlane className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notch Area */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-3xl z-10">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full" />
      </div>
    </div>
  );
};

export default PhonePreview;