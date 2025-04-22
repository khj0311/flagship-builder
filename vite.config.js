// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Base public path when served in production
  base: './',
  
  // Build output directory
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Improve build optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Set to true in production
        drop_debugger: true
      }
    },
    // Generate separate chunks for each project
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['path'],
          'projectA': ['./src/projectA/projectA.js'],
          'projectB': ['./src/projectB/projectB.js'],
        }
      }
    }
  },
  
  // Enable SCSS
  css: {
    preprocessorOptions: {
      scss: {
        // You can add shared SCSS variables, mixins, etc. here
        // additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  },
  
  // Server options for development
  server: {
    port: 3000,
    open: true,
    // Add CORS headers if needed
    cors: true
  },
  
  // Resolve paths and aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@projectA': resolve(__dirname, 'src/projectA'),
      '@projectB': resolve(__dirname, 'src/projectB'),
      '@components': resolve(__dirname, 'src/components'),
      '@styles': resolve(__dirname, 'src/styles')
    }
  }
});