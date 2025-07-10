import vue from '@vitejs/plugin-vue'
import retro from 'retroui-vue/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), retro()],
})
