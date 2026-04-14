import { defineConfig, PluginOption } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()] as PluginOption[],
  base: '/details-game',
  server: {
    port: 3004,
    host: true,
  },
  build: {
    target: 'esnext',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@leopple-games/styles/scss/global' as *;
        `,
      },
    },
  },
});
