import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import router from './router/router.jsx';
import { Toaster } from 'react-hot-toast';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
    <Toaster />
  </AuthProvider>
);
