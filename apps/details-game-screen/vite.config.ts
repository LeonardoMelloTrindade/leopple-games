import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  base: '/details-game',
  server: {
    port: 3004,
    host: true
  },
  build: {
    target: 'esnext',
  },
});

