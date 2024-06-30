import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { BACKEND_URL } from './src/utils/api/config';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
});
