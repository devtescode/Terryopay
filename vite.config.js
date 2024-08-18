import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Opay',
        short_name: 'OPay Application',
        description: 'My OPay Web App built with Vite',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: '/public/icons/opay.jpg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/public/icons/opay.jpg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true,
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Custom naming for assets, chunks, and entry files
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',

        // Separate vendor code into its own chunk
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // This creates a vendor chunk for all dependencies
          }
        },
      },
    },
  },
});
