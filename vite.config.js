import { defineConfig } from 'vite';

export default defineConfig({
  // Esto asegura que las rutas sean relativas para Capacitor
  base: './', 
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'www',
    assetsDir: 'src/assets',
  },
  define: {
    // Definiciones globales si fueran necesarias
  }
});