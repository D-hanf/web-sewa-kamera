# LensaKita — Website Persewaan Kamera

Website persewaan kamera profesional berbasis React + Vite + Tailwind CSS.  
Frontend-only, tanpa backend — semua data dari mock JSON, cart disimpan di localStorage, pesanan dikirim via WhatsApp.

---

## 🚀 Cara Menjalankan Lokal

```bash
# 1. Install dependensi
npm install

# 2. Jalankan dev server
npm run dev

# 3. Buka di browser: http://localhost:5173
```

---

## 📁 Struktur Folder

```
src/
├── components/       → Komponen reusable (Navbar, Footer, ProductCard, CartItem)
├── context/          → Global state (CartContext, ToastContext)
├── data/             → Mock JSON (products.json)
├── pages/            → Halaman: Home, Katalog, ProdukDetail, Keranjang, Checkout, CaraSewa, Kontak
└── utils/            → Fungsi murni (formatRupiah, generateWhatsAppLink)

public/
└── images/
    ├── products/         → Foto produk (nama = id produk, contoh: cam-001.jpg)
    ├── placeholders/     → placeholder-camera.jpg (fallback jika foto belum ada)
    └── banners/          → Gambar hero opsional
```

---

## ✏️ Cara Ganti Data Produk

Edit file `src/data/products.json`.  
Setiap produk memiliki field:

| Field             | Tipe     | Keterangan                              |
|-------------------|----------|-----------------------------------------|
| id                | string   | Unik, juga nama file foto (cam-001)     |
| nama              | string   | Nama produk                             |
| kategori          | string   | "Kamera", "Lensa", atau "Aksesoris"     |
| harga_per_hari    | number   | Dalam rupiah (tanpa titik/koma)         |
| deskripsi_singkat | string   | Deskripsi singkat 1-2 kalimat           |
| foto              | string   | Path: "/images/products/cam-001.jpg"   |
| spesifikasi       | object   | Key-value bebas, tampil di detail produk|
| status            | string   | "tersedia" atau "disewa"               |

---

## 🖼️ Cara Menambah Foto Produk

1. Siapkan foto dengan rasio **4:3** (contoh: 800x600px), format JPG/PNG/WebP
2. Beri nama sesuai **id produk** di JSON (contoh: `cam-001.jpg`)
3. Taruh di folder `public/images/products/`
4. Tidak perlu mengubah kode apapun — foto langsung tampil

Selengkapnya: lihat `public/images/README.md`

---

## 📱 Cara Ganti Nomor WhatsApp Admin

Buka file `src/pages/Checkout.jsx`, cari baris:

```js
const ADMIN_WA_NUMBER = '6281234567890';
```

Ganti dengan nomor WhatsApp admin (format: kode negara + nomor, tanpa tanda +).
Contoh: `6285678901234` untuk +62 856-7890-1234.

---

## 🌐 Cara Deploy ke Vercel

1. Push project ke GitHub / GitLab
2. Login ke vercel.com -> Add New Project -> pilih repo
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Klik **Deploy** -- selesai!

File `vercel.json` sudah disertakan untuk routing SPA (mencegah 404 saat refresh halaman).

---

## 🛠️ Tech Stack

- **React 18** + **Vite 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **React Router DOM v7**
- **Context API** untuk state cart global
- **localStorage** untuk persistensi cart

---

## 📋 Halaman

| Route           | Halaman                                          |
|-----------------|--------------------------------------------------|
| /               | Beranda (hero, kategori, produk unggulan)        |
| /katalog        | Daftar semua produk + filter + search            |
| /produk/:id     | Detail produk + input jumlah hari + estimasi     |
| /keranjang      | Isi keranjang + update hari + total              |
| /checkout       | Form data diri + kirim pesanan via WhatsApp      |
| /cara-sewa      | Alur sewa + syarat + FAQ                         |
| /kontak         | Info kontak + WhatsApp + Instagram               |
