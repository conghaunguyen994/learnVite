import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css';

/**
 * Entry file của Vite (src/main.jsx).
 * Trình duyệt gọi file này trực tiếp qua Native ES Module (import ... from ...).
 * Vite sẽ tự động phân giải các bare import như 'react' thành đường dẫn dạng '/@fs/.../node_modules/...'.
 */

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
