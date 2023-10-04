import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: `${env.VITE_BASE_PATH_PREFIX ?? ''}`,
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
      coverage: {
        provider: 'istanbul',
      },
    },
    server: {
      open: true,
      origin: `${env.VITE_SERVER_BASE_URL ? env.VITE_SERVER_BASE_URL + '/' : ''}`,
      cors: false,
    },
  };
});
