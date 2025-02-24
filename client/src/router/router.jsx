// src/router/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login';
import { SignUp } from '../pages/Signup';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import ChatContainer from '../components/ChatContainer';
import Templates from '../pages/Templates';
import Settings from '../pages/Settings';
import InventoryPage from '../pages/Inventory';
import WhatsAppConnect from '../pages/WhatsAppConnect';
import PrintManagement from '../pages/PrintManagement'; // Import the PrintManagement page
import Tracking from '../pages/Tracking';
import Analytics from '../pages/Analytics';
import Packing from '../pages/Packing';
import Holding from '../pages/Holding';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login', // Define the login route
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/admin",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "chats",
        element: <ChatContainer />,
      },
      {
        path: "templates",
        element: <Templates />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "connect-whatsapp",
        element: <WhatsAppConnect />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "inventory",
        element: <InventoryPage />,
      },
      {
        path: "print-management", // Add the PrintManagement route
        element: <PrintManagement />,
      },
      {
        path: "Packing", // Add the PrintManagement route
        element: <Packing />,
      },
      {
        path: "Holding", // Add the PrintManagement route
        element: <Holding />,
      },
      {
        path: "Tracking",
        element: <Tracking />,
      },
    ],
  },
]);

export default router;
