import { useState } from 'react';
import {
    Box, TextField, Button, Typography, Chip, IconButton, Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { createCurso } from '../services/curso.service';

export default function CursoForm({ onSaved }) {
    const [form, setForm] = useState({
        nombre_curso: '',
        creditos: '',
        descripcion: ''
    });
    const [horarios, setHorarios] = useState(['']);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const validate = (name, value) => {
        if (name === 'nombre_curso' && !value.trim()) return 'El nombre del curso es obligatorio';
        if (name === 'creditos') {
            if (!value) return 'Los créditos son obligatorios';
            const n = Number(value);
            if (!Number.isInteger(n) || n < 1 || n > 10) return 'Entre 1 y 10 créditos';
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    };

    const handleHorario = (idx, value) => {
        setHorarios(prev => prev.map((h, i) => i === idx ? value : h));
    };

    const addHorario = () => setHorarios(prev => [...prev, '']);
    const removeHorario = (idx) => setHorarios(prev => prev.filter((_, i) => i !== idx));

    const isValid =
        form.nombre_curso.trim() &&
        form.creditos &&
        !errors.nombre_curso && !errors.creditos;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;

        const horariosLimpios = horarios.filter(h => h.trim() !== '');

        try {
            setSaving(true);
            await createCurso({
                nombre_curso: form.nombre_curso.trim(),
                creditos: Number(form.creditos),
                horarios: horariosLimpios,
                descripcion: form.descripcion.trim()
            });
            setForm({ nombre_curso: '', creditos: '', descripcion: '' });
            setHorarios(['']);
            setErrors({});
            onSaved?.();
        } catch (err) {
            const msgs = err?.response?.data?.errors;
            if (msgs) {
                alert(msgs.map(e => e.msg).join('\n'));
            } else {
                alert(err?.response?.data?.message || 'Error al crear el curso');
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            elevation={0}
            sx={{
                p: 3, borderRadius: '16px',
                border: '1px solid #e2e8f0',
                mb: 4, backgroundColor: 'white'
            }}
        >
            <Typography sx={{
                fontFamily: "'Sora', sans-serif", fontWeight: 700,
                fontSize: '1.1rem', color: '#000000', mb: 3
            }}>
                Registrar nuevo curso
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2, mb: 2 }}>
                <TextField
                    name="nombre_curso"
                    label="Nombre del curso *"
                    placeholder="Ej: Bases de Datos NoSQL"
                    value={form.nombre_curso}
                    onChange={handleChange}
                    error={!!errors.nombre_curso}
                    helperText={errors.nombre_curso}
                    fullWidth
                    sx={inputStyle}
                />
                <TextField
                    name="creditos"
                    label="Créditos *"
                    type="number"
                    placeholder="1 - 10"
                    value={form.creditos}
                    onChange={handleChange}
                    error={!!errors.creditos}
                    helperText={errors.creditos}
                    inputProps={{ min: 1, max: 10 }}
                    fullWidth
                    sx={inputStyle}
                />
            </Box>

            <TextField
                name="descripcion"
                label="Descripción (opcional)"
                placeholder="Breve descripción del curso..."
                value={form.descripcion}
                onChange={handleChange}
                multiline rows={2}
                fullWidth
                sx={{ mb: 2, ...inputStyle }}
            />

            {/* HORARIOS */}
            <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', mb: 1.5 }}>
                    Horarios
                </Typography>
                {horarios.map((h, idx) => (
                    <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                        <TextField
                            size="small"
                            placeholder={`Ej: Lunes 8:00`}
                            value={h}
                            onChange={(e) => handleHorario(idx, e.target.value)}
                            fullWidth
                            sx={inputStyle}
                        />
                        {horarios.length > 1 && (
                            <IconButton onClick={() => removeHorario(idx)} size="small" color="error">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>
                ))}
                <Button
                    startIcon={<AddIcon />}
                    onClick={addHorario}
                    size="small"
                    sx={{
                        textTransform: 'none', color: '#60fa81',
                        fontFamily: "'Space Grotesk', sans-serif"
                    }}
                >
                    Agregar horario
                </Button>
            </Box>

            <Button
                type="submit"
                variant="contained"
                disabled={!isValid || saving}
                startIcon={<SaveIcon />}
                sx={{
                    borderRadius: '10px', px: 4, py: 1.2,
                    textTransform: 'none',
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    background: isValid ? 'linear-gradient(135deg, #60fa81, #7c3aed)' : undefined,
                    '&:hover': { opacity: 0.9 }
                }}
            >
                {saving ? 'Guardando...' : 'Guardar curso'}
            </Button>
        </Paper>
    );
}

const inputStyle = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        '&.Mui-focused fieldset': { borderColor: '#60fa81' }
    }
};
