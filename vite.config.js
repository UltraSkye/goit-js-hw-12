import { defineConfig } from 'vite';
import { resolve } from 'path';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [
      FullReload(['./src/**/**.html']),
    ],
  };
});
