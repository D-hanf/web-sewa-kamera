import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { applyTheme } from './utils/applyTheme.js';

// Terapkan token desain dari src/config/theme.js sebelum render.
// Untuk mengubah warna/font/pengaturan: edit src/config/theme.js
applyTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
