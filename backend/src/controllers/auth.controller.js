import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password)
      return res.status(400).json({ message: 'Todos los campos son requeridos' });

    const exist = await User.findOne({ email: email.toLowerCase().trim() });
    if (exist) return res.status(400).json({ message: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ nombre, email: email.toLowerCase().trim(), password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ uid: newUser._id, nombre: newUser.nombre, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.status(201).json({ token, user: { id: newUser._id, nombre: newUser.nombre, email: newUser.email, role: newUser.role } });

  } catch (err) { next(err); }
};

// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email y contraseña son requeridos' });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ uid: user._id, nombre: user.nombre, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({ token, user: { id: user._id, nombre: user.nombre, email: user.email, role: user.role } });

  } catch (err) { next(err); }
};