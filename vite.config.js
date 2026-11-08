import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * ============================================================================
 * VITE CONFIGURATION (TƯ TƯỞNG: NATIVE ESM + ON-DEMAND COMPILATION)
 * ============================================================================
 * Khác biệt cốt lõi so với Webpack:
 * 1. TRONG LÚC DEV:
 *    - Không tốn thời gian đóng gói (bundle) toàn bộ dự án trước khi khởi động!
 *    - Khởi động server gần như tức thì (< 300ms) vì tận dụng Native ES Modules của trình duyệt.
 *    - Khi trình duyệt cần file nào, nó gửi request HTTP lấy file đó -> Vite mới biên dịch file đó
 *      bằng "esbuild" (viết bằng Golang, nhanh hơn công cụ JS như Babel từ 10 - 100 lần).
 * 2. TRONG LÚC PRODUCTION:
 *    - Sử dụng "Rollup" để đóng gói thành bundle tối ưu, hỗ trợ Tree-shaking và Code-splitting đỉnh cao.
 * 3. ENTRY POINT:
 *    - Chính là file "index.html" nằm ở thư mục gốc! Vite coi index.html là một phần của mã nguồn.
 */

export default defineConfig({
  // 1. PLUGINS: Sử dụng plugin chính thức của Vite cho React
  // Plugin này hỗ trợ JSX compilation và React Fast Refresh (HMR giữ state)
  plugins: [react()],

  // 2. SERVER: Cấu hình dev server
  server: {
    port: 3002, // Đặt cổng 3002 để không trùng với Webpack (3001) và Parcel (3003)
    open: false,
  },

  // 3. RESOLVE: Cấu hình alias tương tự Webpack
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // 4. BUILD: Cấu hình quá trình Rollup đóng gói sản phẩm ra thư mục dist/
  build: {
    outDir: 'dist',
    sourcemap: true, // Sinh source map để dễ debug
    rollupOptions: {
      output: {
        // Tách vendor chunks tương tự Webpack splitChunks để so sánh
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
