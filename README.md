# 02 - Vite React Demo

Thư mục này minh họa cách thiết lập, cấu hình và cơ chế hoạt động mang tính cách mạng của **Vite** khi kết hợp cùng React 18.

---

## ⚡ 1. Triết Lý & Cách Hoạt Động Của Vite

- **Native ES Modules (ESM) ở Dev:**
  - Webpack phải chờ gom và biên dịch mọi file rồi mới mở server.
  - Vite mở Dev Server **ngay tức thì** (thường < 300ms) vì nó **không bundle** toàn bộ dự án trước. Trình duyệt gửi request HTTP đến file nào, Vite mới dịch file đó (On-demand compilation).
- **esbuild (Siêu tốc độ):**
  - Vite sử dụng `esbuild` (viết bằng Golang) để pre-bundle các dependencies (như `react`, `react-dom`) và biên dịch JSX/TS sang JS nhanh hơn từ 10x đến 100x so với Babel.
- **Rollup ở Production:**
  - Khi chạy `npm run build`, Vite sử dụng `Rollup` để đóng gói. Rollup nổi tiếng với khả năng tạo bundle ESM gọn nhẹ, Tree-shaking triệt để (loại bỏ code thừa không dùng).
- **Entry point là `index.html`:**
  - File `index.html` nằm ngay tại thư mục gốc, chứa thẻ `<script type="module" src="/src/main.jsx"></script>`, trở thành điểm xuất phát trực tiếp của toàn ứng dụng.

---

## ⚙️ 2. Giải Thích File Cấu Hình `vite.config.js`

Trong file [vite.config.js](file:///c:/Users/nconghau/Desktop/new%20fe/Webpack-Vite-Parcel/02-vite-demo/vite.config.js), cấu hình rất ngắn gọn và trực quan:

1. **`plugins: [react()]`**: Tích hợp hỗ trợ React JSX và tính năng React Fast Refresh (HMR tức thời giữ nguyên state).
2. **`server.port: 3002`**: Chạy dev server tại cổng 3002.
3. **`resolve.alias`**: Định nghĩa alias `@` trỏ đến thư mục `src/`.
4. **`build.rollupOptions`**: Tuỳ biến Rollup khi build, ví dụ tách riêng vendor chunks (`react`, `react-dom`).

---

## 🚀 3. Hướng Dẫn Chạy & Khám Phá

### Cài đặt thư viện:
```bash
npm install
```

### Chế độ Dev (Khởi động tức thì):
```bash
npm run dev
```
> Mở `http://localhost:3002`. Thử sửa file `src/App.jsx` và quan sát tốc độ cập nhật HMR siêu tốc (Fast Refresh).

### Chế độ Build xem Bundle:
```bash
# 1. Đóng gói mã nguồn qua Rollup
npm run build

# 2. Chạy thử bản production dist/ ngay trên máy
npm run preview
```

Sau khi chạy `build`, hãy mở thư mục `dist/` ra xem:
- Mở `dist/index.html` để thấy cách Rollup liên kết file bundle thông qua `<script type="module">`.
- Mở `dist/assets/`: Các file JS được biên dịch theo chuẩn ESM nguyên bản, không cần lớp vỏ wrapper phức tạp như Webpack runtime.
