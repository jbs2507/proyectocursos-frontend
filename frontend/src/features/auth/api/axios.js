// src/features/auth/api/axios.js
import axios from 'axios';

/**
 * Cliente HTTP centralizado.
 * baseURL apunta al backend:
 * - Desarrollo: localhost
 * - Producción: VITE_API_URL (configurado en Vercel)
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://proyectocursos-backend-2b6m.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});

// Adjuntar el token JWT en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de respuesta: si 401, limpiar sesión
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.hash = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;