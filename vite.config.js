// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Base public path when served in production
  base: './',
  
  // Build options for projects
  build: {
    outDir: 'dist', // Default output directory
    assetsDir: 'assets',
    emptyOutDir: true,
    
    // Optimize chunks by project
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projectA: resolve(__dirname, 'projectA.html'),
        projectB: resolve(__dirname, 'projectB.html')
      },
      output: {
        // Generate clean file names without hashes for production
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        
        // Create separate chunks for each project
        manualChunks(id) {
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
  
  // Plugin options
  plugins: [],
  
  // Enable SCSS
  css: {
    preprocessorOptions: {
      scss: {
        // Common SCSS variables or imports if needed
      }
    },
    // Don't add hashes to CSS file names
    devSourcemap: true
  },
  
  // Server options for development
  server: {
    port: 3000,
    open: false,
    cors: true
  },
  
  // Configure file handling
  assetsInclude: ['**/*.html', '**/*.scss', '**/*.js'],
  
  // Resolve aliases for imports
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@projectA': resolve(__dirname, 'src/projectA'),
      '@projectB': resolve(__dirname, 'src/projectB'),
      '@buildUtils': resolve(__dirname, 'build-utils')
    }
  },
  
  // Ensure raw imports work for HTML templates
  optimizeDeps: {
    exclude: ['path', 'fs']
  },
  
  // Set up raw imports for template HTML files
  plugins: [
    {
      name: 'vite-plugin-raw-html',
      transform(code, id) {
        if (id.endsWith('?raw')) {
          const fileId = id.slice(0, -4);
          return `export default ${JSON.stringify(code)};`;
        }
      }
    }
  ]
});