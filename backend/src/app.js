import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import cursoRoutes from './routes/curso.routes.js';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ 
        ok: true, 
        service: 'cursos-api',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth/login',
            cursos: '/api/cursos'
        }
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/cursos', cursoRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Error del servidor' });
});

export default app;