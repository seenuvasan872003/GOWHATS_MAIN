import React, { useContext, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import { AuthContext } from '../context/AuthContext';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && !loading) {
      navigate('/login');
    }
  }, [loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="lg:ml-20">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between lg:justify-end lg:mr-5 lg:mt-2 lg:p-0 p-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 lg:hidden"
            >
              <Menu size={24} />
            </button>
            {user && (
              <div className="flex items-center space-x-4">
                <div className="px-4 py-2 rounded-full bg-green-100">
                  <span className="font-semibold text-green-600">{user.name}</span>
                </div>
              </div>
            )}
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;