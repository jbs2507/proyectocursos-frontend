import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Box, Typography, Button, Card, CardContent, Stack, Chip
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import ApiIcon from '@mui/icons-material/Api';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const LandingPage = () => {
    return (
        <Box sx={{ backgroundColor: '#f8fafc', pt: '72px' }}>

            {/* ════════════ HERO ════════════ */}
            <Box sx={{
                background: 'linear-gradient(135deg, #000000 0%, #000000 50%, #000000 100%)',
                py: { xs: 10, md: 16 }, px: { xs: 3, md: 8 },
                position: 'relative', overflow: 'hidden'
            }}>
                {/* Decoración de fondo */}
                <Box sx={{
                    position: 'absolute', top: -100, right: -100,
                    width: 500, height: 500, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0, 0, 0, 0.15) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />
                <Box sx={{
                    position: 'absolute', bottom: -80, left: -80,
                    width: 400, height: 400, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <Box sx={{ maxWidth: '1100px', mx: 'auto', position: 'relative', zIndex: 1 }}>
                    <Chip
                        label="Plataforma Gastos Diarios 2026"
                        sx={{
                            backgroundColor: '#60fa81',
                            color: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.4)',
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 600, mb: 4
                        }}
                    />

                    <Typography sx={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: { xs: '2.5rem', md: '3.8rem', lg: '4.5rem' },
                        fontWeight: 800, color: 'white',
                        lineHeight: 1.1, mb: 3,
                        letterSpacing: '-1.5px'
                    }}>
                        Gestiona tus gastos{' '}
                        <Box component="span" sx={{
                            background: 'linear-gradient(135deg, #60fa81, #90f0a5)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            diarios
                        </Box>
                        {' '}con inteligencia
                    </Typography>

                    <Typography sx={{
                        color: '#ffffff', fontSize: { xs: '1rem', md: '1.2rem' },
                        maxWidth: 550, lineHeight: 1.8, mb: 5,
                        fontFamily: "'Space Grotesk', sans-serif"
                    }}>
                        SpendWise centraliza el registro, seguimiento y administración de gastos diarios.
                        Usuarios, categorías, presupuestos y más — todo en un solo lugar.
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button
                            component={NavLink} to="/register"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                backgroundColor: '#60fa81', color: 'white',
                                px: 4, py: 1.8, borderRadius: '12px',
                                textTransform: 'none',
                                fontFamily: "'Sora', sans-serif",
                                fontWeight: 700, fontSize: '1rem',
                                '&:hover': { backgroundColor: '#60fa81', transform: 'translateY(-2px)' },
                                transition: '0.2s'
                            }}
                        >
                            Empezar gratis
                        </Button>
                    </Stack>

                    {/* Stats */}
                    <Stack direction="row" spacing={4} sx={{ mt: 6 }}>
                        {[
                            { label: 'Gastos registrados', value: '2,400+' },
                            { label: 'Usuarios activos', value: '380+' },
                            { label: 'Categorías', value: '45+' }
                        ].map((stat, i) => (
                            <Box key={i}>
                                <Typography sx={{
                                    fontFamily: "'Sora', sans-serif",
                                    fontWeight: 800, fontSize: '1.8rem', color: 'white'
                                }}>
                                    {stat.value}
                                </Typography>
                                <Typography sx={{ color: '#60fa81', fontSize: '0.82rem' }}>
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Box>

            {/* ════════════ CARACTERÍSTICAS ════════════ */}
            <Box id="features" sx={{ py: 12, px: { xs: 3, md: 8 }, maxWidth: '1100px', mx: 'auto' }}>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Chip label="Características" sx={{ backgroundColor: '#60fa81', color: '#ffffff', fontWeight: 600, mb: 2 }} />
                    <Typography sx={{
                        fontFamily: "'Sora', sans-serif", fontWeight: 800,
                        fontSize: { xs: '2rem', md: '2.8rem' }, color: '#000000',
                        letterSpacing: '-1px'
                    }}>
                        Todo lo que necesitas para gestionar
                    </Typography>
                    <Typography sx={{ color: '#000000', mt: 2, fontSize: '1.05rem', maxWidth: 500, mx: 'auto' }}>
                        Una plataforma completa para administrar el ciclo de vida de tus gastos diarios.
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
                    gap: 3
                }}>
                    {[
                        {
                            icon: <SpeedIcon />, color: '#60fa81', bg: '#000000',
                            title: 'CRUD Completo de Gastos',
                            desc: 'Registra, actualiza, busca y elimina gastos con descripción, monto, categoría y fecha en segundos.'
                        },
                        {
                            icon: <CalendarMonthIcon />, color: '#60fa81', bg: '#000000',
                            title: 'Gestión de Categorías',
                            desc: 'Define múltiples categorías por gasto. Compatible con formatos de días y horas universitarias.'
                        },
                        {
                            icon: <GroupIcon />, color: '#60fa81', bg: '#000000',
                            title: 'Asignación de Usuarios',
                            desc: 'Vincula docentes a cada gasto automáticamente desde la sesión JWT del usuario autenticado.'
                        },
                        {
                            icon: <SecurityIcon />, color: '#60fa81', bg: '#000000',
                            title: 'Seguridad JWT',
                            desc: 'Autenticación robusta con tokens JWT. Solo usuarios autenticados pueden gestionar gastos.'
                        },
                        {
                            icon: <AutoGraphIcon />, color: '#60fa81', bg: '#000000',
                            title: 'Búsqueda Inteligente',
                            desc: 'Filtra gastos por descripción, categoría o fecha con búsqueda en tiempo real paginada.'
                        },
                        {
                            icon: <ApiIcon />, color: '#60fa81', bg: '#000000',
                            title: 'API RESTful',
                            desc: 'Backend con Express + MongoDB Atlas. Documentada y lista para integrarse con cualquier cliente.'
                        }
                    ].map((feat, i) => (
                        <Card key={i} sx={{
                            borderRadius: '16px', border: '1px solid #e2e8f0',
                            boxShadow: 'none', p: 1,
                            transition: '0.3s',
                            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }
                        }}>
                            <CardContent>
                                <Box sx={{
                                    width: 44, height: 44, borderRadius: '12px',
                                    backgroundColor: feat.bg,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: feat.color, mb: 2
                                }}>
                                    {feat.icon}
                                </Box>
                                <Typography sx={{
                                    fontFamily: "'Sora', sans-serif", fontWeight: 700,
                                    fontSize: '1rem', color: '#0f172a', mb: 1
                                }}>
                                    {feat.title}
                                </Typography>
                                <Typography sx={{ color: '#000000', fontSize: '0.88rem', lineHeight: 1.7 }}>
                                    {feat.desc}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>

            {/* ════════════ CÓMO FUNCIONA ════════════ */}
            <Box id="como-funciona" sx={{ py: 12, px: { xs: 3, md: 8 } }}></Box>
            <Box sx={{
                background: 'linear-gradient(135deg, #000000 0%, #000000 100%)',
                py: 12, px: { xs: 3, md: 8 }
            }}>
                <Box sx={{ maxWidth: '1100px', mx: 'auto' }}>
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Chip label="¿Cómo funciona?" sx={{ backgroundColor: '#60fa81', color: '#ffffff', fontWeight: 600, mb: 2 }} />
                        <Typography sx={{
                            fontFamily: "'Sora', sans-serif", fontWeight: 800,
                            fontSize: { xs: '2rem', md: '2.8rem' }, color: '#ffffff', letterSpacing: '-1px'
                        }}>
                            Tres pasos para empezar
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                        gap: 4
                    }}>
                        {[
                            {
                                step: '01', color: '#60fa81',
                                title: 'Crea tu cuenta',
                                desc: 'Regístrate con email y contraseña. El sistema crea tu perfil de usuario automáticamente.'
                            },
                            {
                                step: '02', color: '#60fa81',
                                title: 'Registra tus gastos',
                                desc: 'Agrega nombre del gasto, créditos y define los horarios de cada uno.'
                            },
                            {
                                step: '03', color: '#60fa81',
                                title: 'Gestiona y busca',
                                desc: 'Edita, filtra y elimina gastos fácilmente. Todo sincronizado con MongoDB Atlas.'
                            }
                        ].map((step, i) => (
                            <Box key={i} sx={{
                                backgroundColor: 'white', borderRadius: '20px',
                                p: 4, textAlign: 'center',
                                boxShadow: '0 4px 20px rgba(8, 8, 8, 0.06)'
                            }}>
                                <Typography sx={{
                                    fontFamily: "'Sora', sans-serif",
                                    fontSize: '3rem', fontWeight: 900,
                                    color: step.color, opacity: 0.2, lineHeight: 1
                                }}>
                                    {step.step}
                                </Typography>
                                <Typography sx={{
                                    fontFamily: "'Sora', sans-serif", fontWeight: 700,
                                    fontSize: '1.1rem', color: '#000000', mt: 1, mb: 1.5
                                }}>
                                    {step.title}
                                </Typography>
                                <Typography sx={{ color: '#000000', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                    {step.desc}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* ════════════ PLANES ════════════ */}
            <Box id="planes" sx={{ py: 12, px: { xs: 3, md: 8 } }}>
                <Box sx={{ maxWidth: '1100px', mx: 'auto' }}>
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Chip label="Planes" sx={{ backgroundColor: '#60fa81', color: '#ffffff', fontWeight: 600, mb: 2 }} />
                        <Typography sx={{
                            fontFamily: "'Sora', sans-serif", fontWeight: 800,
                            fontSize: { xs: '2rem', md: '2.8rem' }, color: '#000000', letterSpacing: '-1px'
                        }}>
                            Elige tu plan ideal
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                        gap: 3, alignItems: 'center'
                    }}>
                        {[
                            {
                                title: 'Básico', price: 'Gratis', period: '',
                                desc: 'Usuarios que solo quieren anotar qué gastan.',
                                color: '#60fa81', highlight: false,
                                features: ['Registro ilimitado de gastos diarios.', 'Categorías estándar (comida, transporte, etc.).', 'Gráfico mensual de consumo simple.', 'Recordatorios para no olvidar tus notas.']
                            },
                            {
                                title: 'Pro', price: '$15', period: '/mes',
                                desc: 'Gente que quiere ahorrar de verdad y tener metas.',
                                color: '#60fa81', highlight: true,
                                features: ['Presupuestos: Pon límites por categoría.', 'Foto-Recibos: Escanea tickets con la cámara.', 'Metas de Ahorro: Crea alcancías digitales.', 'Exportar datos: Descarga todo en Excel/PDF.']
                            },
                            {
                                title: 'Premium', price: '$45', period: '/mes',
                                desc: 'Autónomos (Freelancers) o familias grandes.',
                                color: '#60fa81', highlight: false,
                                features: ['Sincronización Bancaria: Carga automática de gastos.', 'Multi-moneda: Ideal para viajes y divisas.', 'IA Financiera: Consejos para ahorrar más.', 'Soporte 24/7 y cuentas compartidas.']
                            }
                        ].map((plan, i) => (
                            <Box key={i} sx={{
                                backgroundColor: plan.highlight ? '#000000' : 'white',
                                borderRadius: '20px',
                                border: plan.highlight ? '2px solid #60fa81' : '1px solid #e2e8f0',
                                p: 4,
                                transform: plan.highlight ? 'scale(1.05)' : 'scale(1)',
                                boxShadow: plan.highlight ? '0 20px 60px #60fa81' : '0 4px 20px rgba(0,0,0,0.04)',
                                transition: '0.3s',
                                '&:hover': { transform: plan.highlight ? 'scale(1.07)' : 'translateY(-4px)' }
                            }}>
                                <Typography sx={{
                                    fontFamily: "'Sora', sans-serif", fontWeight: 700,
                                    color: plan.highlight ? '#60fa81' : plan.color, mb: 0.5
                                }}>
                                    {plan.title}
                                </Typography>
                                <Typography sx={{ color: plan.highlight ? '#64748b' : '#000000', fontSize: '0.85rem', mb: 2 }}>
                                    {plan.desc}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 3 }}>
                                    <Typography sx={{
                                        fontFamily: "'Sora', sans-serif", fontWeight: 900,
                                        fontSize: '2.5rem', color: plan.highlight ? 'white' : '#000000'
                                    }}>
                                        {plan.price}
                                    </Typography>
                                    <Typography sx={{ color: plan.highlight ? '#000000' : '#94a3b8' }}>
                                        {plan.period}
                                    </Typography>
                                </Box>
                                <Stack spacing={1.2} sx={{ mb: 3 }}>
                                    {plan.features.map((f, fi) => (
                                        <Box key={fi} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <CheckCircleIcon sx={{ fontSize: 18, color: plan.highlight ? '#60fa81' : plan.color }} />
                                            <Typography sx={{
                                                fontSize: '0.88rem',
                                                color: plan.highlight ? '#e2e8f0' : '#000000'
                                            }}>
                                                {f}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                                <Button
                                    component={NavLink} to="/login" fullWidth
                                    sx={{
                                        backgroundColor: plan.highlight ? '#60fa81' : 'transparent',
                                        color: plan.highlight ? 'white' : plan.color,
                                        border: plan.highlight ? 'none' : `1px solid ${plan.color}`,
                                        borderRadius: '10px', py: 1.5,
                                        textTransform: 'none',
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontWeight: 600,
                                        '&:hover': { backgroundColor: plan.highlight ? '#60fa81' : `${plan.color}15` }
                                    }}
                                >
                                    Empezar ahora
                                </Button>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            
            {/* ════════════ CTA FINAL ════════════ */}
            <Box sx={{
                py: 14, px: { xs: 3, md: 8 },
                background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)',
                textAlign: 'center'
            }}>
                <Typography sx={{
                    fontFamily: "'Sora', sans-serif", fontWeight: 800,
                    fontSize: { xs: '2rem', md: '3rem' }, color: 'black',
                    letterSpacing: '-1px', mb: 2
                }}>
                    Empieza a gestionar hoy
                </Typography>
                <Typography sx={{ color: '#000000', mb: 5, fontSize: '1.05rem', maxWidth: 480, mx: 'auto' }}>
                    Únete a miles de docentes que ya usan SpendWise para organizar sus gastos diarios.
                </Typography>
                <Button
                    component={NavLink} to="/login"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                        backgroundColor: '#60fa81', color: 'white',
                        px: 5, py: 2, borderRadius: '14px',
                        textTransform: 'none',
                        fontFamily: "'Sora', sans-serif",
                        fontWeight: 700, fontSize: '1.1rem',
                        '&:hover': { backgroundColor: '#60fa81', transform: 'translateY(-2px)' },
                        transition: '0.2s'
                    }}
                >
                    Acceder al sistema
                </Button>
            </Box>
        </Box>
    );
};
