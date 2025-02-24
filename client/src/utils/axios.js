import axios from 'axios';

// Regular API instance (requires auth)
const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000
});

// Public API instance (no auth required)
export const publicApi = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error);
    return Promise.reject(error);
  }
);

export default api;