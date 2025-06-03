import react from '@vitejs/plugin-react';

import mkcert from 'vite-plugin-mkcert';
import { defineConfig } from 'vitest/config';

export default () => {
  return defineConfig({
    plugins: [react(), mkcert()],
    base: '/',
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/tests/setup',
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
    server: {
      https: true,
    },
    resolve: {
      alias: {
        '@': '/src',
        '@app': '/src/app',
        '@components': '/src/components',
        '@services': '/src/services',
        '@redux': '/src/redux',
        '@models': '/src/models',
        '@shared': '/src/shared',
        '@assets': '/src/assets',
        '@routes': '/src/routes/paths',
        '@helpers': '/src/helpers',
        '@layouts': '/src/layouts',
        '@pages': '/src/pages',
        '@containers': '/src/containers',
      },
    },
  });
};
