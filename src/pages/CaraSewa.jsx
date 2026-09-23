import { Link } from 'react-router-dom';
import { settings } from '../config/theme';

const steps = [
  {
    no: 1,
    title: 'Pilih Produk',
    desc: 'Jelajahi katalog dan pilih kamera atau aksesoris yang ingin kamu sewa. Klik "Tambah ke Keranjang" dan atur durasi sewa.',
  },
  {
    no: 2,
    title: 'Checkout & Isi Data',
    desc: 'Buka keranjang, lanjut ke halaman checkout. Isi nama dan nomor WhatsApp kamu. Tidak perlu login atau akun.',
  },
  {
    no: 3,
    title: 'Konfirmasi via WhatsApp',
    desc: 'Klik tombol "Kirim via WhatsApp". Pesan berisi detail pesanan akan terbuka otomatis. Kirim ke admin kami.',
  },
  {
    no: 4,
    title: 'Ambil & Nikmati',
    desc: 'Admin akan konfirmasi ketersediaan, pembayaran, dan jadwal pengambilan. Kamera siap digunakan!',
  },
];

const faqs = [
  {
    q: 'Berapa lama minimal sewa?',
    a: 'Minimal sewa adalah 1 hari. Semakin lama sewa, biasanya kami berikan harga lebih hemat.',
  },
  {
    q: 'Apakah ada deposit?',
    a: 'Ya, kami meminta deposit sebagai jaminan. Besarnya bervariasi sesuai produk dan akan dikonfirmasi admin.',
  },
  {
    q: 'Bagaimana jika perangkat rusak?',
    a: 'Kerusakan ringan di luar kelalaian ditanggung kami. Kerusakan akibat kelalaian ditanggung penyewa sesuai kesepakatan.',
  },
  {
    q: 'Bisa kirim ke luar kota?',
    a: 'Saat ini melayani ambil di toko saja. Untuk pengiriman, silakan diskusi langsung dengan admin kami.',
  },
  {
    q: 'Metode pembayaran apa yang diterima?',
    a: 'Transfer bank (BCA, Mandiri, BRI) dan tunai saat pengambilan di toko.',
  },
];

export default function CaraSewa() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Cara Sewa di {settings.siteName}
          </h1>
          <p className="text-white/60 text-base leading-relaxed">
            Sewa kamera sesimpel 4 langkah — semuanya bisa dilakukan dari HP kamu.
          </p>
        </div>
      </section>

      {/* Langkah-langkah */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-6">
            {steps.map((step, idx) => (
              <div key={step.no} className="flex gap-5">
                {/* Nomor + garis */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-accent text-white text-base font-bold rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-accent/20">
                    {step.no}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-2" />
                  )}
                </div>

                {/* Konten */}
                <div className={`pb-6 ${idx === steps.length - 1 ? '' : ''}`}>
                  <h3 className="text-primary font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-card border-t border-border py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-primary text-2xl font-bold mb-8 text-center">Pertanyaan Umum</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white border border-border rounded-2xl p-5">
                <h4 className="text-primary font-semibold text-sm mb-2">{faq.q}</h4>
                <p className="text-secondary text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-white text-2xl font-bold mb-3">Ada pertanyaan lain?</h2>
          <p className="text-white/60 text-sm mb-8">Tim kami siap membantu kamu menemukan peralatan yang tepat.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/katalog"
              className="bg-accent hover:bg-accent-dark active:scale-95 text-white font-semibold px-8 py-3.5 rounded-xl transition-all"
            >
              Lihat Katalog
            </Link>
            <a
              href={settings.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all"
            >
              Chat Admin
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
