/// <reference types="vitest" />
import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        // Use .babelrc files, necessary to use LinguiJS CLI
        babelrc: true,
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
  base: '/booklet/',
  resolve: {
    alias: {
      /**
       * Storybook (specifically the interactions addon) requires that we use their
       *   instrumented version of jest-expect. So our storybook does so. To make
       *   these interactions still work in vitest we have @storybook/jest aliased
       *   to resolve to vitest which, critically, exports { expect } as well.
       */
      '@storybook/jest': 'vitest',
      '~': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env': {},
  },
})
