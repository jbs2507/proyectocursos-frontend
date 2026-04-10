import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Typography, Button, TextField, InputAdornment,
    IconButton, Chip, Stack, Paper, Divider, CircularProgress, Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RefreshIcon from '@mui/icons-material/Refresh';

import { useAuth } from '../features/auth/context/AuthContext';
import { listCursos } from '../features/auth/services/curso.service';
import CursoForm from '../features/auth/components/CursoForm';
import CursoList from '../features/auth/components/CursoList';

export const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [q, setQ] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [stats, setStats] = useState({ total: 0, creditos: 0, horarios: 0 });

    const loadData = async (busqueda = q) => {
        try {
            setLoading(true);
            setError('');
            const res = await listCursos({ q: busqueda, limit: 100 });
            const lista = res.data.items ?? res.data ?? [];
            setItems(lista);

            // Calcular stats
            const totalCreditos = lista.reduce((s, c) => s + (c.creditos || 0), 0);
            const totalHorarios = lista.reduce((s, c) => s + (c.horarios?.length || 0), 0);
            setStats({ total: lista.length, creditos: totalCreditos, horarios: totalHorarios });
        } catch (err) {
            setError('No se pudo cargar la lista de cursos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        loadData(q);
    };

    const handleClear = () => {
        setQ('');
        loadData('');
    };

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', pt: '72px' }}>

            {/* ── TOPBAR DEL DASHBOARD ── */}
            <Box sx={{
                backgroundColor: '#0f172a',
                px: { xs: 3, md: 6 }, py: 2.5,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
                <Box>
                    <Typography sx={{
                        fontFamily: "'Sora', sans-serif", fontWeight: 800,
                        color: 'white', fontSize: '1.3rem'
                    }}>
                        Dashboard de Cursos
                    </Typography>
                    <Typography sx={{ color: '#64748b', fontSize: '0.82rem' }}>
                        Bienvenido, {user?.nombre || user?.email} · Rol: {user?.role}
                    </Typography>
                </Box>

                <Button
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                    sx={{
                        backgroundColor: '#ef4444', color: 'white',
                        borderRadius: '10px', textTransform: 'none',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600, px: 2.5,
                        '&:hover': { backgroundColor: '#dc2626' }
                    }}
                >
                    Cerrar sesión
                </Button>
            </Box>

            <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>

                {/* ── STATS CARDS ── */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                    gap: 3, mb: 4
                }}>
                    {[
                        {
                            label: 'Total de Cursos',
                            value: stats.total,
                            icon: <MenuBookIcon />,
                            color: '#2563eb', bg: '#dbeafe'
                        },
                        {
                            label: 'Créditos Totales',
                            value: stats.creditos,
                            icon: <CreditScoreIcon />,
                            color: '#7c3aed', bg: '#ede9fe'
                        },
                        {
                            label: 'Horarios Definidos',
                            value: stats.horarios,
                            icon: <CalendarMonthIcon />,
                            color: '#059669', bg: '#d1fae5'
                        }
                    ].map((stat, i) => (
                        <Paper key={i} elevation={0} sx={{
                            p: 3, borderRadius: '16px',
                            border: '1px solid #e2e8f0',
                            display: 'flex', alignItems: 'center', gap: 2.5,
                            transition: '0.3s',
                            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }
                        }}>
                            <Box sx={{
                                width: 52, height: 52, borderRadius: '14px',
                                backgroundColor: stat.bg,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: stat.color, flexShrink: 0
                            }}>
                                {stat.icon}
                            </Box>
                            <Box>
                                <Typography sx={{
                                    fontFamily: "'Sora', sans-serif", fontWeight: 800,
                                    fontSize: '1.8rem', color: '#0f172a', lineHeight: 1
                                }}>
                                    {loading ? '—' : stat.value}
                                </Typography>
                                <Typography sx={{ color: '#64748b', fontSize: '0.82rem', mt: 0.3 }}>
                                    {stat.label}
                                </Typography>
                            </Box>
                        </Paper>
                    ))}
                </Box>

                {/* ── BUSCADOR ── */}
                <Paper elevation={0} sx={{
                    p: 3, borderRadius: '16px',
                    border: '1px solid #e2e8f0', mb: 3
                }}>
                    <Typography sx={{
                        fontFamily: "'Sora', sans-serif", fontWeight: 700,
                        fontSize: '1rem', color: '#0f172a', mb: 2
                    }}>
                        🔍 Buscar cursos
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSearch}
                        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
                    >
                        <TextField
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Buscar por nombre, docente o descripción..."
                            size="small"
                            sx={{
                                flex: 1, minWidth: 220,
                                '& .MuiOutlinedInput-root': { borderRadius: '10px' }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#94a3b8' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: q && (
                                    <InputAdornment position="end">
                                        <IconButton size="small" onClick={handleClear}>
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SearchIcon />}
                            sx={{
                                borderRadius: '10px', textTransform: 'none',
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 600, backgroundColor: '#2563eb',
                                px: 3,
                                '&:hover': { backgroundColor: '#1d4ed8' }
                            }}
                        >
                            Buscar
                        </Button>
                        <Button
                            type="button"
                            onClick={handleClear}
                            startIcon={<ClearIcon />}
                            sx={{
                                borderRadius: '10px', textTransform: 'none',
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 600, color: '#64748b',
                                border: '1px solid #e2e8f0',
                                '&:hover': { backgroundColor: '#f8fafc' }
                            }}
                        >
                            Limpiar
                        </Button>
                        <Button
                            type="button"
                            onClick={() => loadData()}
                            startIcon={<RefreshIcon />}
                            sx={{
                                borderRadius: '10px', textTransform: 'none',
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 600, color: '#64748b',
                                border: '1px solid #e2e8f0',
                                '&:hover': { backgroundColor: '#f8fafc' }
                            }}
                        >
                            Refrescar
                        </Button>
                    </Box>

                    {q && (
                        <Box sx={{ mt: 2 }}>
                            <Chip
                                label={`Resultados para: "${q}"`}
                                onDelete={handleClear}
                                size="small"
                                sx={{ backgroundColor: '#dbeafe', color: '#1d4ed8' }}
                            />
                        </Box>
                    )}
                </Paper>

                {/* ── FORMULARIO CREAR ── */}
                <CursoForm onSaved={() => loadData()} />

                {/* ── LISTA / TABLA ── */}
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Typography sx={{
                            fontFamily: "'Sora', sans-serif", fontWeight: 700,
                            fontSize: '1.1rem', color: '#0f172a'
                        }}>
                            📋 Lista de Cursos
                        </Typography>
                        {!loading && (
                            <Chip
                                label={`${items.length} curso${items.length !== 1 ? 's' : ''}`}
                                size="small"
                                sx={{ backgroundColor: '#f0fdf4', color: '#166534', fontWeight: 600 }}
                            />
                        )}
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2, borderRadius: '10px' }}>
                            {error}
                        </Alert>
                    )}

                    {loading ? (
                        <Box sx={{ py: 8, textAlign: 'center' }}>
                            <CircularProgress sx={{ color: '#2563eb' }} />
                            <Typography sx={{ color: '#94a3b8', mt: 2 }}>Cargando cursos...</Typography>
                        </Box>
                    ) : (
                        <CursoList items={items} onChange={() => loadData()} />
                    )}
                </Box>

            </Box>
        </Box>
    );
};
