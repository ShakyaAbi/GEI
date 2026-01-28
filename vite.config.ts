import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
  optimizeDeps: {
    exclude: ['lucide-react', 'pg', 'events'],
  },
  build: {
    assetsInlineLimit: 4096,
    rollupOptions: {
      external: ['pg', 'events'],
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(gif|jpe?g|png|svg|webp)$/i.test(assetInfo.name)) {
            return 'images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
