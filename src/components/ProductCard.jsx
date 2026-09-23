import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatRupiah } from '../utils/formatters';

const PLACEHOLDER = '/images/placeholders/placeholder-camera.jpg';

/**
 * Kartu produk untuk halaman katalog.
 * @param {{ product: Object }} props
 */
export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(false);

  const isSedangDisewa = product.status === 'disewa';

  const handleAddToCart = () => {
    if (isSedangDisewa) return;
    setLoading(true);
    setTimeout(() => {
      addToCart(product, 1);
      showToast(`${product.nama} ditambahkan ke keranjang`, 'success');
      setLoading(false);
    }, 400);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300 flex flex-col">

      {/* Foto produk */}
      <Link to={`/produk/${product.id}`} className="block overflow-hidden aspect-[4/3] bg-card relative">
        <img
          src={imgError ? PLACEHOLDER : product.foto}
          alt={product.nama}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badge status */}
        {isSedangDisewa && (
          <span className="absolute top-2 right-2 bg-danger text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Sedang Disewa
          </span>
        )}
        {/* Badge kategori */}
        <span className="absolute top-2 left-2 bg-primary/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {product.kategori}
        </span>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/produk/${product.id}`}>
          <h3 className="text-primary font-semibold text-sm leading-snug hover:text-accent transition-colors line-clamp-2 mb-1">
            {product.nama}
          </h3>
        </Link>
        <p className="text-secondary text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
          {product.deskripsi_singkat}
        </p>

        {/* Harga + tombol */}
        <div className="flex items-end justify-between gap-2 mt-auto">
          <div>
            <div className="text-accent font-bold text-base">{formatRupiah(product.harga_per_hari)}</div>
            <div className="text-muted text-xs">per hari</div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isSedangDisewa || loading}
            className={`
              flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200
              ${isSedangDisewa
                ? 'bg-card text-muted cursor-not-allowed border border-border'
                : loading
                ? 'bg-accent/70 text-white cursor-wait'
                : 'bg-accent hover:bg-accent-dark active:scale-95 text-white'
              }
            `}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Menambahkan
              </>
            ) : isSedangDisewa ? (
              'Tidak Tersedia'
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                Tambah
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
