import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="container">
      <header className="header">
        <div className="badge badge-vite">⚡ VITE DEMO</div>
        <h1>Khám Phá Cơ Chế Vite & React</h1>
        <p className="subtitle">
          Tìm hiểu thế hệ công cụ frontend tiếp theo: Native ESM, esbuild và Rollup.
        </p>
      </header>

      <main className="content">
        {/* Khối thử nghiệm HMR */}
        <section className="card">
          <h2>1. Thử nghiệm HMR (Fast Refresh)</h2>
          <p>
            Nhấn tăng số đếm dưới đây, sau đó mở file <code>src/App.jsx</code> và sửa chữ bất kỳ. 
            Vite cập nhật qua WebSocket trong <strong>vài phần nghìn giây (vài ms)</strong> mà không mất state.
          </p>
          <div className="counter-box">
            <button className="btn btn-primary" onClick={() => setCount((prev) => prev + 1)}>
              Bấm tăng số: {count}
            </button>
            <button className="btn btn-secondary" onClick={() => setCount(0)}>
              Reset
            </button>
          </div>
        </section>

        {/* Khối giải thích cơ chế Vite */}
        <section className="card">
          <h2>2. Tại Sao Vite Lại Nhanh Như Vậy?</h2>
          <div className="grid">
            <div className="grid-item">
              <span className="step-num">01</span>
              <h3>Không Bundle Trước Ở Dev</h3>
              <p>
                Khác với Webpack phải đóng gói toàn bộ trước khi mở server, Vite mở server ngay lập tức. Trình duyệt cần file nào thì Vite mới nạp file đó.
              </p>
            </div>

            <div className="grid-item">
              <span className="step-num">02</span>
              <h3>esbuild (Viết bằng Go)</h3>
              <p>
                Pre-bundle các dependency (React, React-DOM) và compile TS/JSX cực nhanh bằng <code>esbuild</code>, tốc độ nhanh hơn Babel từ 10x đến 100x.
              </p>
            </div>

            <div className="grid-item">
              <span className="step-num">03</span>
              <h3>Native ES Modules</h3>
              <p>
                Tận dụng cú pháp <code>import / export</code> chuẩn của trình duyệt hiện đại (HTTP/2), biến trình duyệt thành một phần của hệ thống module.
              </p>
            </div>

            <div className="grid-item">
              <span className="step-num">04</span>
              <h3>Production với Rollup</h3>
              <p>
                Khi build production, Vite dùng <code>Rollup</code> đóng gói file chuẩn ESM cực kỳ sạch, hỗ trợ Tree Shaking tối đa, kích thước bundle siêu nhỏ.
              </p>
            </div>
          </div>
        </section>

        {/* Khối hướng dẫn xem Bundle */}
        <section className="card card-highlight">
          <div className="card-header-toggle" onClick={() => setShowDetails(!showDetails)}>
            <h2>3. Cách Kiểm Tra File Bundle Xuất Ra (dist/)</h2>
            <button className="btn btn-sm">
              {showDetails ? 'Thu gọn ▲' : 'Xem chi tiết ▼'}
            </button>
          </div>

          {showDetails && (
            <div className="guide-content">
              <p>Chạy các lệnh sau trong terminal của thư mục này:</p>
              <pre className="code-block">
{`# 1. Build đóng gói ứng dụng (sử dụng Rollup)
npm run build

# 2. Chạy thử bản build production ngay trên máy
npm run preview`}
              </pre>
              <div className="tips">
                <strong>🔍 Điểm cần chú ý khi mở thư mục <code>dist/</code>:</strong>
                <ul>
                  <li><strong>dist/index.html:</strong> Nhẹ nhàng, gọn gàng, chứa thẻ <code>&lt;script type="module" crossorigin src="/assets/index-xxx.js"&gt;</code>.</li>
                  <li><strong>dist/assets/:</strong> Chứa các file JS và CSS đã được phân tích và trích xuất riêng biệt.</li>
                  <li><strong>Không có Webpack Runtime wrapper:</strong> Mã nguồn trong bundle Rollup giữ nguyên chuẩn module ESM, không cần hàm bao giả lập module phức tạp như Webpack.</li>
                </ul>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        Cấu hình chi tiết nằm tại: <code>02-vite-demo/vite.config.js</code>
      </footer>
    </div>
  );
}
