// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Base public path when served in production
  base: './',
  
  // Enable SCSS
  css: {
    preprocessorOptions: {
      scss: {
        // Additional SCSS options if needed
      }
    }
  },
  
  // Server options for development
  server: {
    port: 3000,
    open: true
  },
  
  // Build options
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Improve build optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});