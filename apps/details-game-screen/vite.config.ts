import { defineConfig, PluginOption } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [devtools(), solidPlugin() as PluginOption],
  base: '/details-game',
  server: {
    port: 3004,
  },
  build: {
    target: 'esnext',
  },
});
