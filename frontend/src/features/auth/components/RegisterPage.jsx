import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Card, Typography, TextField, Button,
    InputAdornment, IconButton, Alert, CircularProgress
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useAuth } from '../context/AuthContext';
import { registerRequest } from '../services/curso.service';

export const RegisterPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = React.useState({
        nombre: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = React.useState({});
    const [showPass, setShowPass] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState('');

    const validate = (name, value) => {
        let error = '';
        if (!value.trim()) {
            error = 'Este campo es obligatorio';
        } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            error = 'Ingresa un correo válido';
        } else if (name === 'password' && value.length < 6) {
            error = 'Mínimo 6 caracteres';
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
        setApiError('');
    };

    const isValid =
        form.nombre && form.email && form.password &&
        !errors.nombre && !errors.email && !errors.password;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;

        try {
            setLoading(true);
            setApiError('');

            const res = await registerRequest({
                nombre: form.nombre.trim(),
                email: form.email.toLowerCase().trim(),
                password: form.password.trim()
            });

            const { token, user } = res.data;

            login(token, user);
            navigate('/dashboard', { replace: true });

        } catch (err) {
            console.log("🔥 ERROR COMPLETO:", err.response?.data); // 👈 CLAVE
            const msg = err?.response?.data?.message || 'No se pudo registrar';
            setApiError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            pt: '72px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2
        }}>
            <Card sx={{
                width: { xs: '100%', sm: 420 },
                borderRadius: '24px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden'
            }}>

                {/* HEADER */}
                <Box sx={{
                    background: 'linear-gradient(135deg, #000000 0%, #60fa81 100%)',
                    p: 4,
                    textAlign: 'center'
                }}>
                    <Typography sx={{
                        fontFamily: "'Sora', sans-serif",
                        fontWeight: 800,
                        fontSize: '1.6rem',
                        color: 'white',
                        mb: 0.5
                    }}>
                        Crear cuenta
                    </Typography>
                    <Typography sx={{ color: '#ffffff', fontSize: '0.88rem' }}>
                        Regístrate para comenzar
                    </Typography>
                </Box>

                {/* FORM */}
                <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
                    {apiError && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>
                            {apiError}
                        </Alert>
                    )}

                    <TextField
                        name="nombre"
                        label="Nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        error={!!errors.nombre}
                        helperText={errors.nombre}
                        fullWidth
                        sx={{ mb: 2.5, ...inputStyle }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon sx={{ color: '#94a3b8' }} />
                                </InputAdornment>
                            )
                        }}
                    />

                    <TextField
                        name="email"
                        label="Correo electrónico"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                        sx={{ mb: 2.5, ...inputStyle }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon sx={{ color: '#94a3b8' }} />
                                </InputAdornment>
                            )
                        }}
                    />

                    <TextField
                        name="password"
                        label="Contraseña"
                        type={showPass ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        fullWidth
                        sx={{ mb: 3, ...inputStyle }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon sx={{ color: '#94a3b8' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPass(p => !p)}>
                                        {showPass ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={!isValid || loading}
                        sx={{
                            height: 52,
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontFamily: "'Sora', sans-serif",
                            fontWeight: 700,
                            fontSize: '1rem',
                            background: isValid ? 'linear-gradient(135deg, #60fa81, #000000)' : undefined,
                            '&:hover': { opacity: 0.9 }
                        }}
                    >
                        {loading
                            ? <CircularProgress size={22} sx={{ color: 'white' }} />
                            : 'Crear cuenta'}
                    </Button>

                    <Typography sx={{ mt: 2, fontSize: '0.85rem', textAlign: 'center' }}>
                        ¿Ya tienes cuenta?{" "}
                        <span
                            style={{ color: '#60fa81', cursor: 'pointer' }}
                            onClick={() => navigate('/login')}
                        >
                            Inicia sesión
                        </span>
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};

const inputStyle = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        '&.Mui-focused fieldset': { borderColor: '#60fa81' }
    }
};