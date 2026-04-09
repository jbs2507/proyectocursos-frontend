import { validationResult } from 'express-validator';
import Curso from '../models/Curso.js';

const handleValidation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return true;
    }
    return false;
};

/** ➕ Crear curso */
export const createCurso = async (req, res, next) => {
    try {
        if (handleValidation(req, res)) return;

        const { nombre_curso, creditos, horarios, descripcion } = req.body;

        // docente_id viene del JWT del usuario autenticado
        const docente_id = req.user.uid;
        const docente_nombre = req.user.nombre || req.user.email;

        const nuevo = await Curso.create({
            nombre_curso,
            creditos: Number(creditos),
            docente_id,
            docente_nombre,
            horarios: Array.isArray(horarios) ? horarios : (horarios ? [horarios] : []),
            descripcion: descripcion || ''
        });

        res.status(201).json(nuevo);
    } catch (err) {
        next(err);
    }
};

/** 📄 Listar cursos con búsqueda y paginación */
export const getCursos = async (req, res, next) => {
    try {
        const { q, page = 1, limit = 10 } = req.query;

        const filter = q
            ? {
                $or: [
                    { nombre_curso: new RegExp(q, 'i') },
                    { docente_nombre: new RegExp(q, 'i') },
                    { descripcion: new RegExp(q, 'i') }
                ]
            }
            : {};

        const skip = (Number(page) - 1) * Number(limit);

        const [items, total] = await Promise.all([
            Curso.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit)),
            Curso.countDocuments(filter)
        ]);

        res.json({
            items,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit))
        });
    } catch (err) {
        next(err);
    }
};

/** 🔍 Obtener curso por ID */
export const getCursoById = async (req, res, next) => {
    try {
        if (handleValidation(req, res)) return;

        const item = await Curso.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        res.json(item);
    } catch (err) {
        next(err);
    }
};

/** ✏️ Actualizar curso */
export const updateCurso = async (req, res, next) => {
    try {
        if (handleValidation(req, res)) return;

        const { nombre_curso, creditos, horarios, descripcion, activo } = req.body;

        const updateData = {};
        if (nombre_curso !== undefined) updateData.nombre_curso = nombre_curso;
        if (creditos !== undefined) updateData.creditos = Number(creditos);
        if (horarios !== undefined) updateData.horarios = Array.isArray(horarios) ? horarios : [horarios];
        if (descripcion !== undefined) updateData.descripcion = descripcion;
        if (activo !== undefined) updateData.activo = activo;

        const updated = await Curso.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        res.json(updated);
    } catch (err) {
        next(err);
    }
};

/** 🗑️ Eliminar curso */
export const deleteCurso = async (req, res, next) => {
    try {
        if (handleValidation(req, res)) return;

        const deleted = await Curso.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        res.json({ message: 'Curso eliminado correctamente', id: req.params.id });
    } catch (err) {
        next(err);
    }
};