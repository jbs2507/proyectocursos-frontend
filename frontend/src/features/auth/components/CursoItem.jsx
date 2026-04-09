import { useState } from 'react';
import {
    TableRow, TableCell, TextField, IconButton,
    Tooltip, Chip, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { updateCurso, deleteCurso } from '../services/curso.service';

export default function CursoItem({ curso, onChange }) {
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({ ...curso });
    const [horarioText, setHorarioText] = useState(
        (curso.horarios || []).join(', ')
    );
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const horarios = horarioText
                .split(',')
                .map(h => h.trim())
                .filter(h => h !== '');

            await updateCurso(curso._id, {
                nombre_curso: form.nombre_curso,
                creditos: Number(form.creditos),
                horarios,
                descripcion: form.descripcion
            });
            setEdit(false);
            onChange?.();
        } catch (err) {
            alert(err?.response?.data?.message || 'Error al actualizar');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`¿Eliminar el curso "${curso.nombre_curso}"?`)) return;
        try {
            await deleteCurso(curso._id);
            onChange?.();
        } catch (err) {
            alert(err?.response?.data?.message || 'Error al eliminar');
        }
    };

    const handleCancel = () => {
        setEdit(false);
        setForm({ ...curso });
        setHorarioText((curso.horarios || []).join(', '));
    };

    return (
        <TableRow hover sx={{ '&:last-child td': { borderBottom: 0 } }}>

            {/* NOMBRE */}
            <TableCell>
                {edit ? (
                    <TextField
                        name="nombre_curso"
                        value={form.nombre_curso}
                        onChange={handleChange}
                        size="small"
                        sx={cellInput}
                    />
                ) : (
                    <Box sx={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9rem' }}>
                        {curso.nombre_curso}
                    </Box>
                )}
            </TableCell>

            {/* CRÉDITOS */}
            <TableCell align="center">
                {edit ? (
                    <TextField
                        name="creditos"
                        type="number"
                        value={form.creditos}
                        onChange={handleChange}
                        size="small"
                        inputProps={{ min: 1, max: 10 }}
                        sx={{ ...cellInput, width: 80 }}
                    />
                ) : (
                    <Chip
                        label={`${curso.creditos} cr.`}
                        size="small"
                        sx={{
                            backgroundColor: '#dbeafe', color: '#1d4ed8',
                            fontWeight: 700, fontSize: '0.8rem'
                        }}
                    />
                )}
            </TableCell>

            {/* DOCENTE */}
            <TableCell>
                <Box sx={{ fontSize: '0.85rem', color: '#475569' }}>
                    {curso.docente_nombre || '—'}
                </Box>
            </TableCell>

            {/* HORARIOS */}
            <TableCell>
                {edit ? (
                    <TextField
                        value={horarioText}
                        onChange={(e) => setHorarioText(e.target.value)}
                        size="small"
                        placeholder="Lunes 8:00, Miércoles 8:00"
                        sx={cellInput}
                        helperText="Separados por coma"
                    />
                ) : (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(curso.horarios || []).length > 0 ? (
                            curso.horarios.map((h, i) => (
                                <Chip
                                    key={i} label={h} size="small"
                                    sx={{ backgroundColor: '#f0fdf4', color: '#166534', fontSize: '0.75rem' }}
                                />
                            ))
                        ) : (
                            <Box sx={{ color: '#94a3b8', fontSize: '0.82rem' }}>Sin horario</Box>
                        )}
                    </Box>
                )}
            </TableCell>

            {/* DESCRIPCIÓN */}
            <TableCell>
                {edit ? (
                    <TextField
                        name="descripcion"
                        value={form.descripcion || ''}
                        onChange={handleChange}
                        size="small"
                        multiline
                        sx={cellInput}
                    />
                ) : (
                    <Box sx={{ fontSize: '0.82rem', color: '#64748b', maxWidth: 200 }}>
                        {curso.descripcion || <em style={{ opacity: 0.5 }}>Sin descripción</em>}
                    </Box>
                )}
            </TableCell>

            {/* FECHA */}
            <TableCell>
                <Box sx={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    {new Date(curso.createdAt).toLocaleDateString('es-CO', {
                        day: '2-digit', month: 'short', year: 'numeric'
                    })}
                </Box>
            </TableCell>

            {/* ACCIONES */}
            <TableCell align="center">
                {edit ? (
                    <>
                        <Tooltip title="Guardar cambios">
                            <IconButton
                                onClick={handleSave}
                                disabled={saving}
                                size="small"
                                sx={{ color: '#2563eb', mr: 0.5 }}
                            >
                                <SaveIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancelar">
                            <IconButton onClick={handleCancel} size="small" sx={{ color: '#64748b' }}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Tooltip title="Editar">
                            <IconButton
                                onClick={() => setEdit(true)}
                                size="small"
                                sx={{ color: '#7c3aed', mr: 0.5 }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <IconButton
                                onClick={handleDelete}
                                size="small"
                                sx={{ color: '#ef4444' }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </TableCell>
        </TableRow>
    );
}

const cellInput = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        fontSize: '0.85rem'
    }
};
