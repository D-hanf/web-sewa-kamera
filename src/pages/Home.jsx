import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';
import { settings } from '../config/theme';
import { formatRupiah } from '../utils/formatters';

// 4 produk tersedia untuk ditampilkan di beranda
const featured = products.filter((p) => p.status === 'tersedia').slice(0, 4);

// Ikon SVG inline untuk bagian "Kenapa Kami"
function IconPrice() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

const reasons = [
  { Icon: IconPrice,  title: 'Harga Terjangkau',  desc: 'Mulai Rp 75.000/hari. Sewa lebih lama, harga lebih hemat.' },
  { Icon: IconCheck,  title: 'Perangkat Terawat',  desc: 'Setiap perangkat dicek dan dibersihkan sebelum dan sesudah sewa.' },
  { Icon: IconBolt,   title: 'Proses Mudah',        desc: 'Pilih produk, hubungi via WhatsApp, konfirmasi, ambil — selesai.' },
  { Icon: IconShield, title: 'Aman dan Terpercaya', desc: 'Tersedia asuransi kerusakan ringan. Transaksi transparan.' },
];

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-primary relative overflow-hidden">
        {/* Dekorasi bulat */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/10 rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-block bg-accent/20 border border-accent/30 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              {settings.siteTagline}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Abadikan Momen Terbaik dengan Kamera&nbsp;
              <span className="text-accent">Profesional</span>
            </h1>

            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Sewa kamera mirrorless, lensa, flash, gimbal, dan aksesoris fotografi pilihan.
              Harga terjangkau, peralatan terawat, proses cepat via WhatsApp.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/katalog"
                className="bg-accent hover:bg-accent-dark active:scale-95 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-accent/20"
              >
                Lihat Katalog
              </Link>
              <Link
                to="/cara-sewa"
                className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/20 transition-all duration-200"
              >
                Cara Sewa
              </Link>
            </div>

            {/* Statistik */}
            <div className="flex flex-wrap gap-10 mt-12 pt-10 border-t border-white/10">
              {[
                { value: '50+',  label: 'Unit tersedia' },
                { value: '200+', label: 'Penyewa puas' },
                { value: '4.9',  label: 'Rating rata-rata' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-white/50 text-sm mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Kategori ──────────────────────────────────────────────────────── */}
      <section className="bg-card py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-primary text-2xl font-bold mb-8 text-center">Kategori Produk</h2>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { label: 'Kamera',    to: '/katalog?kategori=Kamera',    icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )},
              { label: 'Lensa',     to: '/katalog?kategori=Lensa',     icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="12" cy="12" r="9"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              )},
              { label: 'Aksesoris', to: '/katalog?kategori=Aksesoris', icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              )},
            ].map((cat) => (
              <Link
                key={cat.label}
                to={cat.to}
                className="flex flex-col items-center gap-2.5 p-5 bg-white hover:bg-accent-light border border-border hover:border-accent/30 rounded-2xl transition-all duration-200 text-center group"
              >
                <div className="text-primary group-hover:text-accent transition-colors">{cat.icon}</div>
                <span className="text-primary font-semibold text-sm">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Produk Unggulan ───────────────────────────────────────────────── */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-primary text-2xl font-bold">Produk Unggulan</h2>
              <p className="text-secondary text-sm mt-1">Paling banyak disewa, paling direkomendasikan</p>
            </div>
            <Link to="/katalog" className="text-accent hover:text-accent-dark text-sm font-semibold transition-colors">
              Lihat semua &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Kenapa Kami ───────────────────────────────────────────────────── */}
      <section className="bg-card py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-primary text-2xl font-bold mb-2">Kenapa Sewa di {settings.siteName}?</h2>
            <p className="text-secondary text-sm">Kami memastikan pengalaman sewa yang menyenangkan dari awal sampai selesai.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((r) => (
              <div key={r.title} className="p-6 bg-white rounded-2xl border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300">
                <div className="text-accent mb-4"><r.Icon /></div>
                <h3 className="text-primary font-semibold mb-2">{r.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Siap mulai sewa?</h2>
          <p className="text-white/60 mb-8">Pilih kamera impianmu dan hubungi kami sekarang via WhatsApp.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/katalog"
              className="bg-accent hover:bg-accent-dark active:scale-95 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200"
            >
              Jelajahi Katalog
            </Link>
            <a
              href={settings.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/20 transition-all duration-200"
            >
              Chat WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
