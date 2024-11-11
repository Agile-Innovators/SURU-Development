import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0', // Permite que el servidor sea accesible desde cualquier IP en tu red local
        port: 5173,      // El puerto en el que se ejecutará la aplicación
        open: true,      // Opcional: abre el navegador automáticamente cuando el servidor se inicie
    },
});
