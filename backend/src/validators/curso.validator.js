// src/validators/curso.validator.js
import { body, param } from 'express-validator';

/** Validar ID MongoDB */
export const idValidator = [
    param('id')
        .isMongoId()
        .withMessage('ID no válido — debe ser un ObjectId de MongoDB')
];

/** Validaciones al crear un curso */
export const createCursoValidator = [
    body('nombre_curso')
        .trim()
        .notEmpty()
        .withMessage('El nombre del curso es obligatorio')
        .isLength({ max: 200 })
        .withMessage('El nombre no puede superar 200 caracteres'),

    body('creditos')
        .notEmpty()
        .withMessage('Los créditos son obligatorios')
        .isInt({ min: 1, max: 10 })
        .withMessage('Los créditos deben estar entre 1 y 10'),

    body('horarios')
        .optional()
        .custom((val) => {
            if (!Array.isArray(val) && typeof val !== 'string') {
                throw new Error('Horarios debe ser un arreglo o texto');
            }
            return true;
        }),

    body('descripcion')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('La descripción no puede superar 500 caracteres')
];

/** Validaciones al actualizar un curso */
export const updateCursoValidator = [
    body('nombre_curso')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('El nombre no puede superar 200 caracteres'),

    body('creditos')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage('Los créditos deben estar entre 1 y 10'),

    body('horarios')
        .optional()
        .custom((val) => {
            if (!Array.isArray(val) && typeof val !== 'string') {
                throw new Error('Horarios debe ser un arreglo o texto');
            }
            return true;
        }),

    body('descripcion')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('La descripción no puede superar 500 caracteres')
];
