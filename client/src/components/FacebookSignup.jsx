// components/FacebookSignup.jsx
import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export function FacebookSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [accessToken, setAccessToken] = useState(null);

  // Secure initialization
  useEffect(() => {
    window.fbAsyncInit = function() {
      FB.init({
        appId: import.meta.env.VITE_APP_META_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v21.0',
        cookie: true,
        status: true
      });
      
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          // Store token securely
          setAccessToken(response.authResponse.accessToken);
        }
      });
    };

    // Load SDK with error handling
    (function(d, s, id) {
      try {
        let js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        js.crossOrigin = 'anonymous';
        js.onerror = () => toast.error('Failed to load Facebook SDK');
        fjs.parentNode.insertBefore(js, fjs);
      } catch (error) {
        toast.error('Failed to initialize Facebook');
      }
    })(document, 'script', 'facebook-jssdk');

    // Cleanup function
    return () => {
      try {
        const fbRoot = document.getElementById('fb-root');
        const fbScript = document.getElementById('facebook-jssdk');
        if (fbRoot) fbRoot.remove();
        if (fbScript) fbScript.remove();
      } catch (error) {
        // Silent cleanup
      }
    };
  }, []);

  const handleMessage = async (event) => {
    if (!["https://www.facebook.com", "https://web.facebook.com"].includes(event.origin)) {
      return;
    }

    try {
      const data = JSON.parse(event.data);
      if (data.type === 'WA_EMBEDDED_SIGNUP') {
        switch(data.event) {
          case 'FINISH':
            await handleSetupCompletion(data.data);
            break;
          case 'CANCEL':
          case 'CLOSE':
            setIsLoading(false);
            toast.info('Setup canceled');
            break;
          case 'ERROR':
            setIsLoading(false);
            toast.error('Setup encountered an error');
            break;
        }
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Setup process failed');
    }
  };

  const handleSetupCompletion = async (setupData) => {
    try {
      setIsLoading(true);
      
      // Get Facebook login status
      const fbResponse = await new Promise((resolve) => {
        FB.getLoginStatus((response) => resolve(response));
      });
  
      if (fbResponse.status !== 'connected') {
        throw new Error('Facebook authentication lost');
      }
  
      // Exchange short-lived token
      const tokenResponse = await api.post('/api/whatsapp/exchange-token', {
        access_token: fbResponse.authResponse.accessToken
      });
  
      if (tokenResponse.data.status === 'success') {
        // Store WhatsApp credentials with phone number info
        const setupResponse = await api.post('/api/whatsapp/setup', {
          waba_id: setupData.waba_id,
          phone_number_id: setupData.phone_number_id,
          access_token: tokenResponse.data.access_token,
          display_phone_number: setupData.display_phone_number, // Add this
          business_name: setupData.business_name // Add this
        });
  
        if (setupResponse.data.status === 'success') {
          // Register phone number
          const phoneResponse = await api.post('/api/whatsapp/register-phone', {
            phone_number_id: setupData.phone_number_id,
            display_phone_number: setupData.display_phone_number,
            access_token: tokenResponse.data.access_token,
            certificate: setupData.certificate // Add this if you have the certificate
          });
  
          if (phoneResponse.data.status === 'success') {
            setIsConnected(true);
            toast.success('WhatsApp Business connected successfully!');
            navigate('/admin', { replace: true });
          } else {
            throw new Error('Phone registration failed');
          }
        } else {
          throw new Error(setupResponse.data.message || 'Setup failed');
        }
      } else {
        throw new Error('Token exchange failed');
      }
    } catch (error) {
      console.error('Setup error:', error);
      toast.error(error.message || 'Connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkPaymentStatus = async (wabaId) => {
    try {
      const response = await api.get(`/api/whatsapp/payment-status/${wabaId}`);
      if (response.data.status === 'success') {
        setHasPaymentMethod(response.data.hasPaymentMethod);
      }
    } catch (error) {
      console.error('Payment status check failed:', error);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    // Add timeout to reset loading state
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        toast.error('Connection timed out');
      }
    }, 120000); // 2 minutes timeout

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeout);
    };
  }, [isLoading]);

  const launchWhatsAppSignup = async () => {
    try {
      setIsLoading(true);
      
      if (!window.FB) {
        throw new Error('Facebook SDK not loaded');
      }

      const response = await new Promise((resolve) => {
        FB.login((response) => resolve(response), {
          config_id: import.meta.env.VITE_APP_META_CONFIG_ID,
          response_type: 'code',
          override_default_response_type: true,
          auth_type: 'rerequest',
          extras: {
            setup: {},
            feature: 'whatsapp_business_management',
            flow: 'short',
            type: 'regular',
            sessionInfoVersion: '3',
          }
        });
      });

      if (response.status === 'connected') {
        setAccessToken(response.authResponse.accessToken);
      } else {
        throw new Error('Facebook login failed');
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Connection failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="bg-white p-8 rounded-xl shadow-sm border max-w-md w-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Connect WhatsApp Business API</h2>
          <p className="text-gray-600 mb-6">
            Link your WhatsApp Business account to start managing your communications.
          </p>
          <button
            onClick={launchWhatsAppSignup}
            disabled={isLoading}
            className={`w-full px-6 py-3 ${
              isLoading ? 'bg-gray-400' : 'bg-[#1877f2] hover:bg-[#166fe5]'
            } text-white font-semibold rounded-lg transition-colors 
            disabled:opacity-50 flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Connecting...</span>
              </>
            ) : (
              'Connect WhatsApp'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}