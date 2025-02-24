import React, { useState } from 'react';
import { FiRefreshCcw, FiEye, FiStar, FiPlus, FiSearch, FiChevronDown } from 'react-icons/fi';
import { BiInfoCircle } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import TemplateTypeModal from '../components/TemplateTypeModal';
import CreateTemplate from '../components/CreateTemplate';

const Templates = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [showTemplateTypeModal, setShowTemplateTypeModal] = useState(false);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [showAlertBanner, setShowAlertBanner] = useState(true);
  const [templates] = useState([
    {
      id: 1,
      name: 'o_m',
      templateType: 'STANDARD',
      category: 'Utility',
      language: 'en_US',
      type: 'Text',
      status: 'Rejected',
      submittedAt: 'Oct 9, 2024, 1:06:19 PM',
      lastUpdated: 'Nov 2, 2024, 12:00:05 PM'
    },
    {
      id: 2,
      name: 'opening_message',
      templateType: 'STANDARD',
      category: 'Utility',
      language: 'en_US',
      type: 'Text',
      status: 'Rejected',
      submittedAt: 'Oct 9, 2024, 12:24:54 PM',
      lastUpdated: 'Nov 2, 2024, 12:00:05 PM'
    },
    {
      id: 3,
      name: 'billing',
      templateType: 'STANDARD',
      category: 'Utility',
      language: 'en_US',
      type: 'Text',
      status: 'Approved',
      submittedAt: 'Sep 6, 2024, 5:26:04 PM',
      lastUpdated: 'Sep 6, 2024, 5:30:18 PM'
    },
    {
      id: 4,
      name: 'holding_message',
      templateType: 'STANDARD',
      category: 'Utility',
      language: 'en_US',
      type: 'Text',
      status: 'Approved',
      submittedAt: 'Jul 25, 2024, 5:25:24 PM',
      lastUpdated: 'Jul 25, 2024, 5:30:03 PM'
    }
  ]);

  const handleTemplateTypeSelect = (type) => {
    setShowTemplateTypeModal(false);
    setShowCreateTemplate(true);
  };

  if (showCreateTemplate) {
    return (
      <CreateTemplate
        onCancel={() => setShowCreateTemplate(false)}
      />
    );
  }

  const filteredTemplates = templates.filter(template => {
    if (selectedTab === 'Deleted') return template.isDeleted;
    return template.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          {/* Header Content */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                {/* <span className="cursor-pointer hover:bg-gray-100 p-1 rounded">☰</span> */}
                Whatsapp Templates
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Create whatsapp templates and send them for approval to your WABA provider.
                <a href="#" className="text-teal-600 hover:underline ml-1">Learn More</a>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                <FiRefreshCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            
              <button 
                onClick={() => setShowTemplateTypeModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors" style={{ backgroundColor: '#25D366' }}
              >
                <FiPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Create Template</span>
                {/* <span className="text-xs bg-orange-500 px-1 rounded">NEW</span> */}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Alert Banner */}
        {/* {showAlertBanner && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BiInfoCircle className="text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  If template is in drafted state after submission, please
                  <a href="#" className="text-blue-600 hover:underline ml-1">
                    raise a support ticket
                  </a>
                </span>
              </div>
              <button 
                onClick={() => setShowAlertBanner(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
          </div>
        )} */}

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by template name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-600 focus:border-teal-600"
            />
          </div>
          <div className="sm:w-48">
            <div className="relative">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-600 focus:border-teal-600"
              >
                <option value="">Select Filter</option>
                <option value="status">Status</option>
                <option value="category">Category</option>
                <option value="type">Type</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setSelectedTab('All')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedTab === 'All' 
                ? 'bg-whatsapp-green text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedTab('Deleted')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedTab === 'Deleted' 
                ? 'bg-whatsapp-green text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Deleted
          </button>
        </div>

        {/* Table Section */}
       {/* Table Section */}
<div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead>
      <tr className="bg-gray-50">
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template Name</th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template Type</th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Submitted At ↓
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last updated</th>
        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {filteredTemplates.map((template, index) => (
        <tr key={template.id} className="hover:bg-gray-50">
          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
            {index + 1}
          </td>
          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
            {template.name}
          </td>
          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
            {template.templateType}
          </td>
          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
            {template.category}
          </td>
          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
            {template.language}
          </td>
          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
            {template.type}
          </td>
          <td className="px-4 py-3 whitespace-nowrap">
            <span className={`px-2 py-1 text-xs rounded-full ${
              template.status === 'Approved'
                ? 'bg-green-50 text-green-600 border border-green-200'
                : 'bg-red-50 text-red-600 border border-red-200'
            }`}>
              {template.status}
            </span>
          </td>
          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
            {template.submittedAt}
          </td>
          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
            {template.lastUpdated}
          </td>
          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
            <div className="flex justify-center items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              {template.status === 'Approved' && (
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              )}
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      </div>

      {/* Template Type Modal */}
      <TemplateTypeModal
        isOpen={showTemplateTypeModal}
        onClose={() => setShowTemplateTypeModal(false)}
        onSelectType={handleTemplateTypeSelect}
      />
    </div>
  );
};

export default Templates;