import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatRupiah, hitungSubtotal } from '../utils/formatters';

const PLACEHOLDER = '/images/placeholders/placeholder-camera.jpg';

/**
 * Baris item di halaman keranjang belanja.
 * @param {{ item: Object }} props
 */
export default function CartItem({ item }) {
  const { removeFromCart, updateItemDays } = useCart();
  const { showToast } = useToast();
  const [imgError, setImgError] = useState(false);

  const handleDaysChange = (val) => {
    const days = Math.max(1, parseInt(val) || 1);
    updateItemDays(item.id, days);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    showToast(`${item.nama} dihapus dari keranjang`, 'info');
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-border">

      {/* Foto kecil */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-card">
        <img
          src={imgError ? PLACEHOLDER : item.foto}
          alt={item.nama}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info + kontrol */}
      <div className="flex-1 min-w-0">
        <h4 className="text-primary font-semibold text-sm leading-tight mb-1 truncate">{item.nama}</h4>
        <div className="text-muted text-xs mb-3">{formatRupiah(item.harga_per_hari)} / hari</div>

        {/* Kontrol jumlah hari */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => handleDaysChange(item.jumlah_hari - 1)}
              className="px-3 py-1.5 text-secondary hover:bg-card transition-colors font-bold text-sm active:scale-90"
              aria-label="Kurang hari"
            >
              &minus;
            </button>
            <input
              type="number"
              min={1}
              value={item.jumlah_hari}
              onChange={(e) => handleDaysChange(e.target.value)}
              className="w-10 text-center bg-transparent text-primary text-sm font-medium py-1.5 focus:outline-none"
              aria-label="Jumlah hari sewa"
            />
            <button
              onClick={() => handleDaysChange(item.jumlah_hari + 1)}
              className="px-3 py-1.5 text-secondary hover:bg-card transition-colors font-bold text-sm active:scale-90"
              aria-label="Tambah hari"
            >
              +
            </button>
          </div>
          <span className="text-muted text-xs">hari</span>

          {/* Subtotal */}
          <span className="ml-auto text-accent font-bold text-sm">
            {formatRupiah(hitungSubtotal(item.harga_per_hari, item.jumlah_hari))}
          </span>
        </div>
      </div>

      {/* Hapus */}
      <button
        onClick={handleRemove}
        className="flex-shrink-0 text-muted hover:text-danger transition-colors p-1 mt-0.5"
        aria-label="Hapus item"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
