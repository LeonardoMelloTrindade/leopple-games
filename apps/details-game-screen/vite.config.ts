import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [devtools(), solidPlugin()],
  base: '/details-game',
  server: {
    port: 3004,
  },
  build: {
    target: 'esnext',
  },
});
