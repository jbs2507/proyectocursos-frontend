import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Gestión de Gastos',
                short_name: 'SpendWise',
                description: 'Plataforma de gestión de gastos diarios',
                theme_color: '#2563eb',
                background_color: '#ffffff',
                display: 'standalone',
            }
        })
    ]
});
