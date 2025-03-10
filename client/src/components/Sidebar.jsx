// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GoWhatslogo from '../images/gowhats iscon bot png.png';
import { 
  MessageSquare, 
  LayoutTemplate, 
  BarChart3, 
  Settings, 
  LogOut, 
  Home,
  X,
  Package,
  Phone, 
  Printer,
  LocateFixed,
  HandHelping
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: <Phone size={20} />, label: 'Connect WhatsApp', id: 'connect-whatsapp', path: 'connect-whatsapp' }, // First item
    { icon: <Home size={20} />, label: 'Overview', id: 'overview', path: '/admin' }, // Second item
    { icon: <MessageSquare size={20} />, label: 'Chats', id: 'chats', path: 'chats' },
    { icon: <LayoutTemplate size={20} />, label: 'Templates', id: 'templates', path: 'templates' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', id: 'analytics', path: 'analytics' },
    { icon: <Package size={20} />, label: 'Inventory', id: 'inventory', path: 'inventory' },
    { icon: <Printer size={20} />, label: 'PrintManagement', id: 'PrintManagement', path: 'print-management' },
    { icon: <Package size={20} />, label: 'Packing', id: 'Packing', path: 'packing' },
    { icon: <HandHelping size={20} />, label: 'Holding', id: 'Holding', path: 'Holding' },
    { icon: <LocateFixed size={20} />, label: 'Tracking', id: 'Tracking', path: 'Tracking' },
    { icon: <Settings size={20} />, label: 'Settings', id: 'settings', path: 'settings' },
];


  const [activeItem, setActiveItem] = useState('overview');

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <div className={`fixed top-0 left-0 h-full shadow-lg transition-all duration-300 z-50
        ${isOpen ? 'translate-x-0 w-30' : '-translate-x-full w-20'} lg:translate-x-0`}
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="p-4 border-b flex items-center justify-between" style={{ backgroundColor: '#F5F5F5' }}>
          <div className="flex items-center space-x-2">
            <img src={GoWhatslogo} alt="logo Image" className="w-6 h-6 rounded-full" />
          </div>
          <button onClick={toggleSidebar} className="lg:hidden">
            <X size={24} style={{ color: '#9E9E9E' }} />
          </button>
        </div>
        <nav className="p-4">
          {menuItems.map((item) => (
            <Link to={item.path} key={item.id}>
              <button
                onClick={() => { setActiveItem(item.id); toggleSidebar(); }}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors
                  ${activeItem === item.id 
                    ? 'text-white' 
                    : 'text-gray-600 hover:bg-gray-100'}`}
                style={{
                  backgroundColor: activeItem === item.id ? '#25D366' : 'transparent',
                  color: activeItem === item.id ? 'black' : '#1C9A55',
                }}
              >
                {item.icon}
              </button>
            </Link>
          ))}
          <Link to='/'>
            <button 
              className="w-full flex items-center space-x-3 p-3 rounded-lg mt-8"
              style={{
                color: '#E57373',
                backgroundColor: '#F5F5F5',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFEBEE')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F5F5F5')}
            >
              <LogOut size={20} />
            </button>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;