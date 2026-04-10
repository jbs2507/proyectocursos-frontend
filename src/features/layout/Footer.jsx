import * as React from 'react';
import { Box, Typography, Stack, IconButton, Divider } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

export const Footer = () => {
    return (
        <Box sx={{
            backgroundColor: '#000000',
            borderTop: '1px solid #000000',
            color: '#ffffff',
            py: 5, px: { xs: 3, md: 6 }
        }}>
            <Box sx={{
                maxWidth: '1100px', mx: 'auto',
                display: 'flex', flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between', alignItems: { xs: 'center', md: 'flex-start' },
                gap: 4
            }}>
                {/* BRAND */}
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        
                        <Typography sx={{
                            fontFamily: "'Sora', sans-serif", fontWeight: 800,
                            color: 'white', fontSize: '1.1rem'
                        }}>
                            Spend<Box component="span" sx={{ color: '##60fa81' }}>Wise</Box>
                        </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '0.85rem', maxWidth: 280, lineHeight: 1.7 }}>
                        Plataforma académica para la gestión integral de gastos diarios.
                    </Typography>
                </Box>

                {/* LINKS */}
                <Box sx={{ display: 'flex', gap: 6 }}>
                    <Box>
                        <Typography sx={{ color: 'white', fontWeight: 600, mb: 1.5, fontSize: '0.9rem' }}>Producto</Typography>
                        {['Características', 'Planes', 'API', 'Documentación'].map(item => (
                            <Typography key={item} sx={{ fontSize: '0.85rem', mb: 1, cursor: 'pointer', '&:hover': { color: '#60fa81' }, transition: '0.2s' }}>
                                {item}
                            </Typography>
                        ))}
                    </Box>
                    <Box>
                        <Typography sx={{ color: 'white', fontWeight: 600, mb: 1.5, fontSize: '0.9rem' }}>Soporte</Typography>
                        {['Centro de ayuda', 'Comunidad', 'Contacto', 'Estado'].map(item => (
                            <Typography key={item} sx={{ fontSize: '0.85rem', mb: 1, cursor: 'pointer', '&:hover': { color: '#60fa81' }, transition: '0.2s' }}>
                                {item}
                            </Typography>
                        ))}
                    </Box>
                </Box>

                {/* SOCIAL */}
                <Box>
                    <Typography sx={{ color: 'white', fontWeight: 600, mb: 1.5, fontSize: '0.9rem' }}>Síguenos</Typography>
                    <Stack direction="row" spacing={1}>
                        {[GitHubIcon, LinkedInIcon, TwitterIcon].map((Icon, i) => (
                            <IconButton key={i} sx={{
                                color: '#ffffff', border: '1px solid #1e293b',
                                borderRadius: '8px', p: 1,
                                '&:hover': { color: '#60fa81', borderColor: '#60fa81' },
                                transition: '0.2s'
                            }}>
                                <Icon fontSize="small" />
                            </IconButton>
                        ))}
                    </Stack>
                </Box>
            </Box>

            <Divider sx={{ borderColor: '#1e293b', my: 3, maxWidth: '1100px', mx: 'auto' }} />

            <Typography sx={{
                textAlign: 'center', fontSize: '0.8rem',
                color: '#ffffff'
            }}>
                © 2026 SpendWise. Todos los derechos reservados. Juliana Betancur Salcedo
            </Typography>
        </Box>
    );
};
