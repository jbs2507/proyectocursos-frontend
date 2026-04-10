import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Card, Typography, TextField, Button,
    InputAdornment, IconButton, Alert, CircularProgress
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../context/AuthContext';
import { loginRequest } from '../services/curso.service';

export const LoginPage = () => {
    const { login, isAuth } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = React.useState({ email: 'admin@cursos.com', password: 'Admin123!' });
    const [errors, setErrors] = React.useState({});
    const [showPass, setShowPass] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState('');

    React.useEffect(() => {
        if (isAuth) navigate('/dashboard', { replace: true });
    }, [isAuth, navigate]);

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
        form.email && form.password &&
        !errors.email && !errors.password;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;
        try {
            setLoading(true);
            setApiError('');
            const res = await loginRequest({
                email: form.email.toLowerCase().trim(),
                password: form.password.trim()
            });
            const { token, user } = res.data;
            if (!token) throw new Error('No se recibió token');
            login(token, user);
            navigate('/dashboard', { replace: true });
        } catch (err) {
            const msg = err?.response?.data?.message || 'No se pudo iniciar sesión';
            setApiError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh', pt: '72px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            px: 2
        }}>
            <Card sx={{
                width: { xs: '100%', sm: 420 },
                borderRadius: '24px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden'
            }}>

                {/* Header */}
                <Box sx={{
                    background: 'linear-gradient(135deg, #000000 0%, #60fa81 100%)',
                    p: 4, textAlign: 'center'
                }}>
                    <Typography sx={{
                        fontFamily: "'Sora', sans-serif", fontWeight: 800,
                        fontSize: '1.6rem', color: 'white', mb: 0.5
                    }}>
                        Bienvenido a SpendWise
                    </Typography>
                    <Typography sx={{ color: '#ffffff', fontSize: '0.88rem' }}>
                        Ingresa tus credenciales para continuar
                    </Typography>
                </Box>

                {/* Formulario */}
                <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>

                    {apiError && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>
                            {apiError}
                        </Alert>
                    )}

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
                                    <IconButton onClick={() => setShowPass(p => !p)} edge="end">
                                        {showPass ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    {/* Botón Ingresar */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={!isValid || loading}
                        sx={{
                            height: 52, borderRadius: '12px',
                            textTransform: 'none',
                            fontFamily: "'Sora', sans-serif",
                            fontWeight: 700, fontSize: '1rem', mb: 2,
                            background: isValid ? 'linear-gradient(135deg, #60fa81, #000000)' : undefined,
                            '&:hover': { opacity: 0.9 }
                        }}
                    >
                        {loading
                            ? <CircularProgress size={22} sx={{ color: 'white' }} />
                            : 'Ingresar al sistema'}
                    </Button>


                    {/* Link registro */}
                    <Typography sx={{ mt: 2, fontSize: '0.85rem', textAlign: 'center' }}>
                        ¿No tienes cuenta?{' '}
                        <span
                            style={{ color: '#22c55e', cursor: 'pointer', fontWeight: 600 }}
                            onClick={() => navigate('/register')}
                        >
                            Regístrate
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