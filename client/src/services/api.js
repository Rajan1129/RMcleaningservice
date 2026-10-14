import axios from 'axios';

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (envUrl && !envUrl.includes('localhost')) {
      return envUrl;
    }
    // Adapt to whichever hostname (localhost or 192.168.x.x) the browser is visiting
    return `http://${host}:5000/api`;
  }
  return envUrl || 'http://localhost:5000/api';
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('gc_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('gc_admin_token');
      localStorage.removeItem('gc_admin');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
