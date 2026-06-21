import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    // نسخ ملفات التوجيه الخاصة بالاستضافة إلى مجلد البناء النهائي
    viteStaticCopy({
      targets: [
        { src: '_redirects', dest: '.' }
      ]
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // تنظيف الكود وتحسين الأداء عند بناء المشروع للإنتاج
    minify: 'esbuild', 
    rollupOptions: {
      output: {
        // تقسيم الملفات لضمان التخزين المؤقت (Caching) الفعال
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  // مسح ملفات السجل (Console) والتصحيح تلقائياً باستخدام esbuild الأسرع
  esbuild: {
    drop: ['console', 'debugger']
  },
  server: {
    strictPort: true,
    // تعطيل طبقة أخطاء HMR أثناء التطوير (اختياري)
    hmr: { overlay: false }
  }
})