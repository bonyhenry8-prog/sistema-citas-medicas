import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
});

// Interceptor para agregar el token automáticamente en cada petición
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

export default api;