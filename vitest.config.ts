import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        reporter: ['text', 'json', 'html'],
        all: true,
        include: ['src/**/*.{js,ts,vue}'],
        exclude: [
          'src/main.ts',
          'src/router/index.ts',
          'src/types/**/*.ts',
          'src/views/__tests__/*',
          'src/components/__tests__/*',
          'src/assets/**/*',
          'src/App.vue',
          'src/components/**/*',
          'src/views/AboutView.vue',
        ],
      },
    },
  }),
)
