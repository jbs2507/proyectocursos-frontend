// src/models/Curso.js
import { Schema, model } from 'mongoose';

/**
 * Modelo Curso — estructura según enunciado:
 * db.cursos.insertOne({
 *   nombre_curso: "Bases de Datos NoSQL",
 *   creditos: 4,
 *   docente_id: ObjectId("..."),
 *   horarios: ["Lunes 8:00", "Miércoles 8:00"]
 * });
 */
const cursoSchema = new Schema(
    {
        nombre_curso: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },
        creditos: {
            type: Number,
            required: true,
            min: 1,
            max: 10
        },
        docente_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        docente_nombre: {
            type: String,
            trim: true,
            default: ''
        },
        horarios: {
            type: [String],
            default: []
        },
        descripcion: {
            type: String,
            trim: true,
            default: ''
        },
        activo: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

// Índice de texto para búsquedas
cursoSchema.index({ nombre_curso: 'text', docente_nombre: 'text' });

export default model('Curso', cursoSchema);
