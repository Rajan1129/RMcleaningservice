import axios from 'axios';

const getBaseUrl = () => {
  let envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string') {
    envUrl = envUrl.trim().replace(/\/+$/, '');
    if (!envUrl.includes('localhost')) {
      // Auto-append /api if missing from configured backend URL
      if (!envUrl.endsWith('/api')) {
        envUrl = `${envUrl}/api`;
      }
      return envUrl;
    }
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const isLocal =
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host.startsWith('192.168.') ||
      host.startsWith('10.') ||
      host.endsWith('.local');

    if (isLocal) {
      return `http://${host}:5000/api`;
    }

    // On production deployed domains (Vercel, Netlify, custom domain), use live Render backend
    return 'https://rmcleaningservice.onrender.com/api';
  }

  return envUrl || 'https://rmcleaningservice.onrender.com/api';
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
