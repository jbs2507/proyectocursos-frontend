// src/features/auth/services/curso.service.js
import api from '../api/axios';

/** 🔐 Login */
export const loginRequest = (data) => {
    return api.post('/api/auth/login', data);
};

/** 📝 Registro de usuario */
export const registerRequest = (data) => {
    return api.post('/api/auth/register', data);
};

/** 👤 Perfil del usuario autenticado */
export const getMe = () => {
    return api.get('/api/auth/me');
};

/** 📄 Listar cursos (con búsqueda ?q=texto&page=1&limit=10) */
export const listCursos = (params = {}) => {
    return api.get('/cursos', { params });
};

/** ➕ Crear curso */
export const createCurso = (data) => {
    return api.post('/cursos', data);
};

/** 🔍 Obtener curso por ID */
export const getCurso = (id) => {
    return api.get(`/cursos/${id}`);
};

/** ✏️ Actualizar curso */
export const updateCurso = (id, data) => {
    return api.put(`/cursos/${id}`, data);
};

/** 🗑️ Eliminar curso */
export const deleteCurso = (id) => {
    return api.delete(`/cursos/${id}`);
};