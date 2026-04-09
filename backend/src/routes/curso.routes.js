// src/routes/curso.routes.js
import { Router } from 'express';
import {
    createCurso,
    getCursos,
    getCursoById,
    updateCurso,
    deleteCurso
} from '../controllers/curso.controller.js';

import {
    createCursoValidator,
    updateCursoValidator,
    idValidator
} from '../validators/curso.validator.js';

import { protect } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * Rutas CRUD Cursos (todas protegidas con JWT):
 * GET    /api/cursos          → listar (con ?q=busqueda&page=1&limit=10)
 * POST   /api/cursos          → crear
 * GET    /api/cursos/:id      → obtener por ID
 * PUT    /api/cursos/:id      → actualizar
 * DELETE /api/cursos/:id      → eliminar
 */

// 🔒 Proteger todas las rutas
router.use(protect);

router.get('/', getCursos);
router.post('/', createCursoValidator, createCurso);
router.get('/:id', idValidator, getCursoById);
router.put('/:id', idValidator, updateCursoValidator, updateCurso);
router.delete('/:id', idValidator, deleteCurso);

export default router;
