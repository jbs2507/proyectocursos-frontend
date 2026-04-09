// src/seed.js
// Script para crear el usuario admin inicial en MongoDB Atlas
// Ejecutar: node src/seed.js

import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

const { MONGODB_URI } = process.env;

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Conectado a MongoDB Atlas');

        // Verificar si ya existe
        const exists = await User.findOne({ email: 'admin@cursos.com' });
        if (exists) {
            console.log('⚠️  El usuario admin ya existe. Omitiendo...');
            process.exit(0);
        }

        const hash = await bcrypt.hash('Admin123!', 10);
        const user = await User.create({
            nombre: 'Administrador',
            email: 'admin@cursos.com',
            password: hash,
            role: 'admin'
        });

        console.log('✅ Usuario admin creado:');
        console.log('   Email:    admin@cursos.com');
        console.log('   Password: Admin123!');
        console.log('   ID:', user._id);
        process.exit(0);
    } catch (err) {
        console.error('❌ Error en seed:', err.message);
        process.exit(1);
    }
}

seed();
