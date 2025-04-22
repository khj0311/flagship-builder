// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Base public path when served in production
  base: './',
  
  // Multi-page application setup
  build: {
    outDir: 'dist',
    // Separate entries for each project
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projectA: resolve(__dirname, 'projectA.html'),
        projectB: resolve(__dirname, 'projectB.html')
      },
      output: {
        manualChunks(id) {
          // Create separate chunks for each project
          if (id.includes('projectA')) {
            return 'projectA';
          } else if (id.includes('projectB')) {
            return 'projectB';
          } else if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  
  // Enable SCSS
  css: {
    preprocessorOptions: {
      scss: {
        // Common SCSS variables or imports if needed
      }
    }
  },
  
  // Server options for development
  server: {
    port: 3000,
    open: false, // Don't automatically open browser
    cors: true
  },
  
  // Resolve paths and aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@projectA': resolve(__dirname, 'src/projectA'),
      '@projectB': resolve(__dirname, 'src/projectB'),
    }
  }
});