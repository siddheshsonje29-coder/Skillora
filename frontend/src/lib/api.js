import axios from 'axios';

let baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
// Remove trailing slash if present to prevent double slashes in requests
if (baseUrl.endsWith('/')) {
  baseUrl = baseUrl.slice(0, -1);
}

console.log('📡 API Base URL (Cleaned):', baseUrl);
console.log('🕒 Build Time:', new Date().toLocaleString());

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling 401s
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
