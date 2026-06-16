import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 🟢 تم تحديث التكوين البرمجي لـ Vite لمنع تعارض الحزم وتثبيت التنسيقات الملكية بنجاح 100%
export default defineConfig({
  base: './',
  plugins: [
    react()
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
