import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatRupiah, generateWhatsAppLink } from '../utils/formatters';
import { settings } from '../config/theme';

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ nama: '', noWa: '', alamat: '', catatan: '' });
  const [submitted, setSubmitted] = useState(false);

  const totalHarga  = getTotalPrice();
  const isEmpty     = items.length === 0;
  const isFormValid = form.nama.trim() !== '' && form.noWa.trim() !== '';

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid || isEmpty) return;

    const itemsForWA = items.map((item) => ({
      nama:          item.nama,
      harga_per_hari: item.harga_per_hari,
      jumlah_hari:   item.jumlah_hari,
      subtotal:      item.subtotal,
    }));

    // Nomor admin diambil dari src/config/theme.js → settings.adminWaNumber
    const waUrl = generateWhatsAppLink(itemsForWA, form, totalHarga, settings.adminWaNumber);
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    clearCart();
    setSubmitted(true);
  };

  // ── Halaman sukses ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-10">
        <div className="max-w-md w-full mx-4 text-center">
          <div className="w-20 h-20 bg-accent-light border-2 border-accent/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-primary mb-3">Pesanan Terkirim</h1>
          <p className="text-secondary leading-relaxed mb-2">
            Pesan WhatsApp sudah terbuka di tab baru. Silakan kirim pesan tersebut ke admin kami.
          </p>
          <p className="text-muted text-sm mb-8">
            Tim kami akan segera menghubungi kamu untuk konfirmasi jadwal sewa dan pengambilan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="bg-accent hover:bg-accent-dark active:scale-95 text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              Kembali ke Beranda
            </Link>
            <Link
              to="/katalog"
              className="bg-white hover:bg-card border border-border text-secondary font-medium px-6 py-3 rounded-xl transition-colors"
            >
              Sewa Lagi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Keranjang kosong ───────────────────────────────────────────────────────
  if (isEmpty) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-10">
        <div className="text-center">
          <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-primary text-xl font-bold mb-2">Keranjang kosong</h2>
          <p className="text-secondary text-sm mb-6">Tambahkan produk ke keranjang terlebih dahulu.</p>
          <Link to="/katalog" className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            Ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  // ── Halaman checkout ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-1">Checkout</h1>
          <p className="text-secondary text-sm">Isi data diri, lalu kirim pesanan ke WhatsApp admin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 flex flex-col gap-5">
            <div className="bg-white border border-border rounded-2xl p-6">
              <h2 className="text-primary font-semibold text-lg mb-5">Data Pemesan</h2>

              <div className="flex flex-col gap-4">
                {/* Nama */}
                <div>
                  <label htmlFor="nama" className="block text-secondary text-sm font-medium mb-1.5">
                    Nama Lengkap <span className="text-danger">*</span>
                  </label>
                  <input
                    id="nama" name="nama" type="text" required
                    placeholder="Masukkan nama lengkap"
                    value={form.nama} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-border text-primary placeholder:text-muted rounded-xl text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* No. WA */}
                <div>
                  <label htmlFor="noWa" className="block text-secondary text-sm font-medium mb-1.5">
                    Nomor WhatsApp <span className="text-danger">*</span>
                  </label>
                  <input
                    id="noWa" name="noWa" type="tel" required
                    placeholder="08xx-xxxx-xxxx"
                    value={form.noWa} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-border text-primary placeholder:text-muted rounded-xl text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* Alamat */}
                <div>
                  <label htmlFor="alamat" className="block text-secondary text-sm font-medium mb-1.5">
                    Alamat / Lokasi Pengambilan
                  </label>
                  <input
                    id="alamat" name="alamat" type="text"
                    placeholder="Opsional — akan dikonfirmasi via WhatsApp"
                    value={form.alamat} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-border text-primary placeholder:text-muted rounded-xl text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* Catatan */}
                <div>
                  <label htmlFor="catatan" className="block text-secondary text-sm font-medium mb-1.5">
                    Catatan Tambahan
                  </label>
                  <textarea
                    id="catatan" name="catatan" rows={3}
                    placeholder="Opsional — tanggal sewa, permintaan khusus, dll."
                    value={form.catatan} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-border text-primary placeholder:text-muted rounded-xl text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Info pembayaran */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="text-primary font-medium mb-2">Cara Pembayaran</h3>
              <p className="text-secondary text-sm leading-relaxed">
                Pembayaran dikonfirmasi langsung bersama admin via WhatsApp.
                Tersedia transfer bank dan tunai saat pengambilan.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`
                w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-base transition-all duration-200
                ${isFormValid
                  ? 'bg-accent hover:bg-accent-dark active:scale-95 text-white shadow-lg shadow-accent/20'
                  : 'bg-card text-muted cursor-not-allowed border border-border'
                }
              `}
            >
              {/* WhatsApp logo SVG */}
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Kirim Pesanan via WhatsApp
            </button>

            {!isFormValid && (
              <p className="text-center text-muted text-xs -mt-2">
                Isi nama dan nomor WhatsApp terlebih dahulu
              </p>
            )}
          </form>

          {/* Ringkasan */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-border rounded-2xl p-6 sticky top-20">
              <h2 className="text-primary font-semibold text-lg mb-5">Ringkasan</h2>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-2 text-sm">
                    <div>
                      <div className="text-primary font-medium leading-tight">{item.nama}</div>
                      <div className="text-muted text-xs mt-0.5">
                        {item.jumlah_hari} hari &times; {formatRupiah(item.harga_per_hari)}
                      </div>
                    </div>
                    <div className="text-primary flex-shrink-0">{formatRupiah(item.subtotal)}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="text-primary font-semibold">Total</span>
                <span className="text-accent font-extrabold text-xl">{formatRupiah(totalHarga)}</span>
              </div>

              <div className="mt-4 bg-card rounded-xl p-3 text-xs text-secondary leading-relaxed border border-border">
                Setelah klik tombol di samping, pesan WhatsApp akan terbuka otomatis berisi detail pesananmu. Tinggal kirim ke admin.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
