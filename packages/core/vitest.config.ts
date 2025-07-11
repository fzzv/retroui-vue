import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const r = (p: string) => resolve(__dirname, p)

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': r('./src'),
    },
    dedupe: [
      'vue',
      '@vue/runtime-core',
    ],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: ['**/node_modules/**'],
    include: ['./**/*.test.{ts,js}'],
    coverage: {
      provider: 'istanbul', // or 'v8'
    },
    setupFiles: './vitest.setup.ts',
    server: {
      deps: {},
    },
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  },
})
