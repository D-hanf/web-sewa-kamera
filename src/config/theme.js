/**
 * KONFIGURASI TEMA GLOBAL — LensaKita
 * ======================================
 * File ini adalah SATU-SATUNYA tempat untuk mengatur:
 *   - Warna website (colors)
 *   - Font (fonts)
 *   - Pengaturan & konten statis (settings)
 *
 * Cara menggunakan:
 *   1. Edit nilai di bawah ini sesuai kebutuhan.
 *   2. Simpan file → refresh browser → semua tampilan otomatis berubah.
 *
 * Catatan teknis:
 *   - Nilai colors & fonts diterapkan ke CSS custom properties saat startup
 *     oleh src/utils/applyTheme.js, sehingga semua Tailwind class
 *     (bg-primary, text-accent, dst.) otomatis mengikuti nilai di sini.
 *   - Nilai settings diimpor langsung oleh komponen yang membutuhkan.
 */

// ─── Warna ────────────────────────────────────────────────────────────────────

/** Palet warna utama. Gunakan kode hex (#RRGGBB). */
export const colors = {
  // Warna brand utama (navy gelap)
  primary:      '#0F2A3D',
  primaryDark:  '#0A1F2E',   // Dipakai untuk hover state elemen primary
  primaryLight: '#1A3D5C',   // Varian terang primary (border, divider)

  // Latar belakang halaman & komponen
  background: '#FFFFFF',     // Background utama (putih)
  card:       '#EEF3F5',     // Background card, section alternatif, input disabled

  // Warna aksen — tombol CTA, badge, link aktif
  accent:      '#1D9E75',    // Warna CTA utama (teal/hijau)
  accentDark:  '#17875F',    // Hover state tombol aksen
  accentLight: '#D6F0E9',    // Background ringan bertema aksen (badge, tag)

  // Warna teks
  textPrimary:   '#0F2A3D',  // Judul & teks utama
  textSecondary: '#5C7080',  // Teks body & keterangan
  textMuted:     '#8FA3AF',  // Placeholder, teks sangat ringan
  textOnDark:    '#FFFFFF',  // Teks di atas background gelap (primary/aksen)

  // Border & garis pembatas
  border:      '#D5E0E5',
  borderLight: '#EEF3F5',    // Border sangat tipis / separator

  // Warna status
  danger:  '#DC2626',        // Error, hapus, produk tidak tersedia
  success: '#1D9E75',        // Sukses (sama dengan accent)
  warning: '#D97706',        // Peringatan
};

// ─── Font ─────────────────────────────────────────────────────────────────────

export const fonts = {
  /**
   * Nama font yang digunakan di seluruh website.
   * Format: CSS font-family stack (dipisah koma, dengan fallback).
   */
  family: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",

  /**
   * URL Google Fonts untuk memuat font secara otomatis.
   * Kosongkan string ("") jika ingin menggunakan font sistem saja.
   */
  googleFontsUrl:
    'https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap',
};

// ─── Pengaturan Aplikasi ──────────────────────────────────────────────────────

export const settings = {
  // Identitas website
  siteName:        'LensaKita',
  siteTagline:     'Sewa Kamera Profesional',
  siteDescription: 'Solusi sewa kamera profesional terpercaya. Peralatan terawat, harga bersahabat, proses mudah.',

  // Kontak admin
  /** Nomor WhatsApp admin. Format: kode negara + nomor, TANPA tanda + */
  adminWaNumber: '6281234567890',

  /** Username Instagram (TANPA @) */
  instagram: 'lensakita',

  /** Alamat toko / lokasi pengambilan */
  address: 'Jl. Fotografi No. 10, Kebayoran Baru, Jakarta Selatan 12180',

  /** Jam operasional (bisa pakai \n untuk baris baru) */
  openingHours: 'Senin – Sabtu: 09.00 – 20.00 WIB\nMinggu: 10.00 – 17.00 WIB',

  // Link eksternal (digenerate otomatis dari data di atas)
  get waLink()        { return `https://wa.me/${this.adminWaNumber}`; },
  get instagramLink() { return `https://instagram.com/${this.instagram}`; },
  get mapsLink()      { return 'https://maps.google.com/?q=Kebayoran+Baru+Jakarta+Selatan'; },
};
