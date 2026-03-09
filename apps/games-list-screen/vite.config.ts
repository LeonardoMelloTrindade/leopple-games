import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/games',
  server: {
    port: 3001,
    host: true,
  },
  plugins: [react() as PluginOption],
});
