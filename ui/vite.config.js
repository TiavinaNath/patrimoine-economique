import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Écouter sur toutes les interfaces réseau
    port: process.env.PORT || 5173, // Utiliser le port fourni par l'environnement ou fallback sur 3000
    proxy: {
      '/api': 'http://localhost:3000', // Proxy API requests to the backend server (en local)
    },
  },
  build: {
    outDir: 'dist', // Répertoire de sortie pour les fichiers construits
  },
});
