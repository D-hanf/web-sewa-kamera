import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { formatRupiah } from '../utils/formatters';

export default function Keranjang() {
  const { items, getTotalPrice } = useCart();
  const totalHarga = getTotalPrice();
  const isEmpty    = items.length === 0;

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-1">Keranjang Sewa</h1>
          {!isEmpty && (
            <p className="text-secondary text-sm">{items.length} item dipilih</p>
          )}
        </div>

        {isEmpty ? (
          /* Keranjang kosong */
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center border border-border">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-primary text-lg font-semibold">Keranjang masih kosong</h3>
            <p className="text-secondary text-sm">Tambahkan kamera atau aksesoris yang ingin kamu sewa.</p>
            <Link
              to="/katalog"
              className="mt-2 bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors active:scale-95"
            >
              Jelajahi Katalog
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">

            {/* Daftar item */}
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Ringkasan total */}
            <div className="bg-white border border-border rounded-2xl p-6">
              <h3 className="text-primary font-semibold text-lg mb-4">Ringkasan Pesanan</h3>

              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-secondary truncate pr-4">
                      {item.nama} ({item.jumlah_hari} hari)
                    </span>
                    <span className="text-primary flex-shrink-0">{formatRupiah(item.subtotal)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="text-primary font-semibold">Total</span>
                <span className="text-accent font-extrabold text-xl">{formatRupiah(totalHarga)}</span>
              </div>

              <p className="text-muted text-xs mt-3">
                * Harga belum termasuk deposit. Detail akan dikonfirmasi via WhatsApp admin.
              </p>
            </div>

            {/* Tombol aksi */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/katalog"
                className="flex-1 text-center border border-border bg-white hover:bg-card text-secondary font-medium px-6 py-3 rounded-xl transition-colors"
              >
                &larr; Tambah Item Lain
              </Link>
              <Link
                to="/checkout"
                className="flex-1 text-center bg-accent hover:bg-accent-dark active:scale-95 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md shadow-accent/20"
              >
                Lanjut ke Checkout &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
