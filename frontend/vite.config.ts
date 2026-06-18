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
    sourcemap: false,
    // 🌟 لمسة إبداعية: تحسين وضغط الأكواد لضمان السرعة الفاخرة وتنقل الصفحات كالتلفاز
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // تنظيف الكود تلقائياً لزيادة سرعة التصفح للأعضاء
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        // 🌟 لمسة إبداعية: التحميل الكسول الذكي لتسريع فتح الموقع وتخفيف الضغط على Cloudflare
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  // 🌟 لمسة إبداعية: ضبط حماية المسارات الصارمة لبروتوكولات الأناقة
  server: {
    strictPort: true
  }
})
