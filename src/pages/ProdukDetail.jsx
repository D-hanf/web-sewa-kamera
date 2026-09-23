import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatRupiah, hitungSubtotal } from '../utils/formatters';
import products from '../data/products.json';

const PLACEHOLDER = '/images/placeholders/placeholder-camera.jpg';

export default function ProdukDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const product = products.find((p) => p.id === id);

  const [jumlahHari, setJumlahHari] = useState(1);
  const [imgError, setImgError]     = useState(false);
  const [loading, setLoading]       = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-primary text-xl font-bold">Produk tidak ditemukan</h2>
        <Link to="/katalog" className="text-accent hover:text-accent-dark text-sm font-medium transition-colors">
          &larr; Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const estimasiTotal  = hitungSubtotal(product.harga_per_hari, jumlahHari);
  const isSedangDisewa = product.status === 'disewa';

  const handleAddToCart = () => {
    if (isSedangDisewa) return;
    setLoading(true);
    setTimeout(() => {
      addToCart(product, jumlahHari);
      showToast(`${product.nama} ditambahkan ke keranjang`, 'success');
      setLoading(false);
    }, 400);
  };

  const handleDaysChange = (val) => setJumlahHari(Math.max(1, parseInt(val) || 1));

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link to="/" className="hover:text-accent transition-colors">Beranda</Link>
          <span>/</span>
          <Link to="/katalog" className="hover:text-accent transition-colors">Katalog</Link>
          <span>/</span>
          <span className="text-secondary truncate">{product.nama}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Foto */}
          <div className="aspect-[4/3] bg-card rounded-2xl overflow-hidden border border-border">
            <img
              src={imgError ? PLACEHOLDER : product.foto}
              alt={product.nama}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            {/* Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-card text-secondary text-xs font-medium px-3 py-1 rounded-full border border-border">
                {product.kategori}
              </span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                isSedangDisewa
                  ? 'bg-danger/10 text-danger'
                  : 'bg-accent-light text-accent-dark'
              }`}>
                {isSedangDisewa ? 'Sedang Disewa' : 'Tersedia'}
              </span>
            </div>

            <h1 className="text-primary text-2xl font-bold leading-tight">{product.nama}</h1>
            <p className="text-secondary text-sm leading-relaxed">{product.deskripsi_singkat}</p>

            {/* Harga */}
            <div className="border-t border-border pt-4">
              <div className="text-muted text-sm mb-1">Harga sewa per hari</div>
              <div className="text-accent text-3xl font-extrabold">{formatRupiah(product.harga_per_hari)}</div>
            </div>

            {/* Input jumlah hari */}
            {!isSedangDisewa && (
              <div className="bg-card rounded-xl p-4 border border-border">
                <label className="text-secondary text-sm font-medium block mb-3">Durasi Sewa</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => handleDaysChange(jumlahHari - 1)}
                      className="px-4 py-2.5 text-secondary hover:bg-card transition-colors font-bold active:scale-90"
                    >
                      &minus;
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={jumlahHari}
                      onChange={(e) => handleDaysChange(e.target.value)}
                      className="w-14 text-center bg-transparent text-primary font-bold py-2.5 focus:outline-none text-lg"
                    />
                    <button
                      onClick={() => handleDaysChange(jumlahHari + 1)}
                      className="px-4 py-2.5 text-secondary hover:bg-card transition-colors font-bold active:scale-90"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-muted text-sm">hari</span>
                </div>

                {/* Estimasi total */}
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-secondary text-sm">Estimasi total</span>
                  <span className="text-accent font-bold text-lg">{formatRupiah(estimasiTotal)}</span>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isSedangDisewa || loading}
                className={`
                  flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all duration-200
                  ${isSedangDisewa
                    ? 'bg-card text-muted cursor-not-allowed border border-border'
                    : loading
                    ? 'bg-accent/70 text-white cursor-wait'
                    : 'bg-accent hover:bg-accent-dark active:scale-95 text-white shadow-md shadow-accent/20'
                  }
                `}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Menambahkan...
                  </>
                ) : isSedangDisewa ? (
                  'Tidak Tersedia'
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Tambah ke Keranjang
                  </>
                )}
              </button>

              <button
                onClick={() => navigate('/keranjang')}
                className="px-4 py-3.5 bg-white hover:bg-card border border-border text-secondary rounded-xl transition-colors"
                title="Lihat keranjang"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Spesifikasi */}
        {product.spesifikasi && (
          <div className="mt-12">
            <h2 className="text-primary text-xl font-bold mb-6">Spesifikasi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(product.spesifikasi).map(([key, val]) => (
                <div key={key} className="flex gap-3 p-4 bg-white rounded-xl border border-border">
                  <div className="text-muted text-sm capitalize min-w-[120px] font-medium">
                    {key.replace(/_/g, ' ')}
                  </div>
                  <div className="text-primary text-sm font-medium">{val}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
