import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: "autoUpdate",
    includeAssets: [
      'img/pwa-192x192.png',
      'img/icono-512x512.png',
      'img/gastos-512x512.png'
    ],
    workbox: {
      navigateFallback: "/index.html",
      globPatterns: ["**/*.{js,jsx,css,html,ico,png,svg}"]
    },
    manifest: {
      name: "Control de Gastos Diarios",
      short_name: "SpendWise",
      description: "Aplicación para registrar y controlar tus gastos diarios de forma rápida y sencilla",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
      icons: [
        {
          src: 'img/pwa-192x192.png',     // ✅ sin /
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'img/icono-512x512.png',   // ✅ sin /
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'img/icono-512x512.png',   // ✅ sin /
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    }
  })],
})