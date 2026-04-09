import CursoItem from './CursoItem';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Box
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function CursoList({ items, onChange }) {
    if (!items?.length) {
        return (
            <Box sx={{
                py: 8, textAlign: 'center',
                backgroundColor: 'white', borderRadius: '16px',
                border: '1px solid #e2e8f0'
            }}>
                <MenuBookIcon sx={{ fontSize: 48, color: '#e2e8f0', mb: 2 }} />
                <Typography sx={{
                    fontFamily: "'Sora', sans-serif", fontWeight: 600,
                    color: '#94a3b8', fontSize: '1.1rem'
                }}>
                    No hay cursos registrados
                </Typography>
                <Typography sx={{ color: '#cbd5e1', fontSize: '0.9rem', mt: 1 }}>
                    Usa el formulario de arriba para agregar el primer curso
                </Typography>
            </Box>
        );
    }

    return (
        <TableContainer component={Paper} elevation={0} sx={{
            borderRadius: '16px', border: '1px solid #e2e8f0',
            overflowX: 'auto'
        }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#0f172a' }}>
                        {['Nombre del Curso', 'Créditos', 'Docente', 'Horarios', 'Descripción', 'Registrado', 'Acciones'].map(col => (
                            <TableCell
                                key={col}
                                align={col === 'Créditos' || col === 'Acciones' ? 'center' : 'left'}
                                sx={{
                                    color: 'white', fontWeight: 700,
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '0.82rem', letterSpacing: '0.5px',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {col}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(curso => (
                        <CursoItem
                            key={curso._id}
                            curso={curso}
                            onChange={onChange}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
