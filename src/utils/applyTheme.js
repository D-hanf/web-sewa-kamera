import { colors, fonts } from '../config/theme';

/**
 * Terapkan token desain dari src/config/theme.js sebagai CSS custom properties
 * pada elemen :root. Dipanggil sekali di src/main.jsx sebelum render.
 *
 * Tailwind v4 menggunakan var(--color-*) di dalam utility class yang
 * digenerate, sehingga mengubah CSS custom property akan otomatis
 * memperbarui tampilan semua elemen yang menggunakan class tersebut.
 */
export function applyTheme() {
  const root = document.documentElement;

  // ── Warna ──────────────────────────────────────────────────────────────────
  root.style.setProperty('--color-primary',      colors.primary);
  root.style.setProperty('--color-primary-dark', colors.primaryDark);
  root.style.setProperty('--color-primary-light',colors.primaryLight);
  root.style.setProperty('--color-background',   colors.background);
  root.style.setProperty('--color-card',         colors.card);
  root.style.setProperty('--color-accent',       colors.accent);
  root.style.setProperty('--color-accent-dark',  colors.accentDark);
  root.style.setProperty('--color-accent-light', colors.accentLight);
  root.style.setProperty('--color-secondary',    colors.textSecondary);
  root.style.setProperty('--color-muted',        colors.textMuted);
  root.style.setProperty('--color-border',       colors.border);
  root.style.setProperty('--color-danger',       colors.danger);

  // ── Font ───────────────────────────────────────────────────────────────────
  root.style.setProperty('--font-sans', fonts.family);

  if (fonts.googleFontsUrl) {
    // Cegah duplikasi jika dipanggil lebih dari sekali
    if (!document.querySelector(`link[href="${fonts.googleFontsUrl}"]`)) {
      const preconnect1 = document.createElement('link');
      preconnect1.rel = 'preconnect';
      preconnect1.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preconnect1);

      const preconnect2 = document.createElement('link');
      preconnect2.rel = 'preconnect';
      preconnect2.href = 'https://fonts.gstatic.com';
      preconnect2.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect2);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fonts.googleFontsUrl;
      document.head.appendChild(link);
    }
  }
}
