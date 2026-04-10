import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    AppBar, Toolbar, Box, Typography, Button, Stack, IconButton, Drawer,
    List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAuth } from '../auth/context/AuthContext';

export const Header = () => {
    const { isAuth, logout, user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { label: 'Inicio', to: '/' },
        { label: 'Características', to: '#features' },
        { label: '¿Como funciona?', to: '#como-funciona' },
        { label: 'Planes', to: '#planes' },
        { label: 'API', to: '/apigf' }, // ← ruta a tu componente ApiGf
    ];

    const handleNavigation = (link) => {
        if (link.to === '/') {
            // Solo para home
            if (window.location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else if (link.to.startsWith('/')) {
            // Para cualquier otra ruta React Router
            navigate(link.to);
        } else if (link.to.startsWith('#')) {
            // Scroll smooth para secciones
            const id = link.to.replace('#', '');
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{ backgroundColor: '#000000', borderBottom: '1px solid #000000' }}
        >
            <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1, justifyContent: 'space-between' }}>
                {/* LOGO */}
                <Box
                    component={NavLink}
                    to="/"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}
                >
                    <Typography sx={{
                        fontFamily: "'Sora', sans-serif",
                        fontWeight: 800,
                        fontSize: '1.3rem',
                        color: 'white',
                        letterSpacing: '-0.5px'
                    }}>
                        Spend
                        <Box component="span" sx={{ color: '#60fa81' }}>Wise</Box>
                    </Typography>
                </Box>

                {/* NAV DESKTOP */}
                {!isMobile && (
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        {navLinks.map(link => (
                            <Button
                                key={link.label}
                                onClick={() => handleNavigation(link)}
                                sx={{
                                    color: '#ffffff',
                                    textTransform: 'none',
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    px: 1.5,
                                    borderRadius: '8px',
                                    '&:hover': {
                                        color: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)'
                                    }
                                }}
                            >
                                {link.label}
                            </Button>
                        ))}
                    </Stack>
                )}

                {/* ACCIONES */}
                <Stack direction="row" spacing={1} alignItems="center">
                    {isAuth ? (
                        <>
                            <Typography sx={{
                                color: '#60fa81',
                                fontSize: '0.85rem',
                                display: { xs: 'none', md: 'block' }
                            }}>
                                Hola, {user?.nombre || user?.email}
                            </Typography>

                            <Button
                                component={NavLink}
                                to="/dashboard"
                                startIcon={<DashboardIcon />}
                                sx={{
                                    backgroundColor: '#60fa81',
                                    color: 'white',
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontWeight: 600,
                                    px: 2,
                                    '&:hover': { backgroundColor: '#60fa81' }
                                }}
                            >
                                Dashboard
                            </Button>

                            <IconButton onClick={handleLogout} sx={{ color: '#ef4444' }}>
                                <LogoutIcon />
                            </IconButton>
                        </>
                    ) : (
                        <Button
                            component={NavLink}
                            to="/login"
                            sx={{
                                backgroundColor: '#60fa81',
                                color: 'white',
                                textTransform: 'none',
                                borderRadius: '8px',
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 600,
                                px: 2.5,
                                py: 1,
                                '&:hover': { backgroundColor: '#60fa81' }
                            }}
                        >
                            Iniciar sesión
                        </Button>
                    )}

                    {/* HAMBURGUESA MOBILE */}
                    {isMobile && (
                        <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'white' }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                </Stack>
            </Toolbar>

            {/* DRAWER MOBILE */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 240, pt: 2, backgroundColor: '#0f172a', height: '100%' }}>
                    <List>
                        {navLinks.map(link => (
                            <ListItem key={link.label} disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        handleNavigation(link);
                                        setDrawerOpen(false);
                                    }}
                                    sx={{ color: '#ffffff', '&:hover': { color: 'white' } }}
                                >
                                    <ListItemText primary={link.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    );
};