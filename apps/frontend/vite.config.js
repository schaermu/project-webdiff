import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },
  build: {
    sourcemap: true,
    commonjsOptions: { transformMixedEsModules: true }
  },
  plugins: [
    vue(),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules'],
      extension: ['.js', '.vue'],
      requireEnv: false,
      forceBuildInstrument: Boolean(process.env.INSTRUMENT_BUILD)
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
