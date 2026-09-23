# Folder Gambar — LensaKita

Folder ini berisi semua aset gambar statis yang dipakai website.
Drag-and-drop file gambar ke folder yang sesuai tanpa perlu mengubah kode.

---

## Struktur Folder

```
public/images/
├── products/       → Foto tiap produk (1 foto per produk, nama = id produk)
├── placeholders/   → Gambar fallback jika foto produk belum tersedia
└── banners/        → Gambar hero/promo di beranda (opsional)
```

---

## Daftar File yang Diharapkan

### `/images/products/` — Foto Produk

| Nama File          | Produk                        | Rasio   | Ukuran Min  |
|--------------------|-------------------------------|---------|-------------|
| cam-001.jpg        | Sony Alpha A7 III             | 4:3     | 800×600px   |
| cam-002.jpg        | Canon EOS R6 Mark II          | 4:3     | 800×600px   |
| cam-003.jpg        | Fujifilm X-T5                 | 4:3     | 800×600px   |
| cam-004.jpg        | Nikon Z6 III                  | 4:3     | 800×600px   |
| lens-001.jpg       | Sony FE 85mm f/1.4 GM         | 4:3     | 800×600px   |
| lens-002.jpg       | Canon RF 50mm f/1.2L          | 4:3     | 800×600px   |
| lens-003.jpg       | Sigma 24-70mm f/2.8 DG DN Art | 4:3     | 800×600px   |
| lens-004.jpg       | Tamron 70-180mm f/2.8         | 4:3     | 800×600px   |
| acc-001.jpg        | Godox AD200Pro Flash          | 4:3     | 800×600px   |
| acc-002.jpg        | DJI RS 3 Gimbal Stabilizer    | 4:3     | 800×600px   |
| acc-003.jpg        | Neewer NL660S LED Panel       | 4:3     | 800×600px   |
| acc-004.jpg        | Peak Design Travel Tripod     | 4:3     | 800×600px   |

### `/images/placeholders/` — Gambar Fallback (**WAJIB ADA**)

| Nama File                 | Keterangan                              |
|---------------------------|-----------------------------------------|
| placeholder-camera.jpg    | Gambar default jika foto produk missing |

### `/images/banners/` — Banner Opsional

| Nama File          | Keterangan                        |
|--------------------|-----------------------------------|
| hero-bg.jpg        | Background hero section beranda   |

---

## Tips

- Format JPG/JPEG direkomendasikan untuk foto (kompresi lebih kecil)
- Gunakan format WebP untuk performa lebih baik (kompatibel semua browser modern)
- Kompres gambar sebelum upload: gunakan [Squoosh](https://squoosh.app) atau TinyJPG
- Pastikan nama file **huruf kecil semua** dan **tanpa spasi**
