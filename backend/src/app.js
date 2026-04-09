import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import cursoRoutes from './routes/curso.routes.js';

const app = express();

// Middlewares
app.use(cors({ origin: '*' })); // 🔑 Permite cualquier origen (para desarrollo, cambiar en prod)
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/cursos', cursoRoutes);

// Middleware de error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Error del servidor' });
});

export default app;