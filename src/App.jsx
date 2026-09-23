import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Katalog from './pages/Katalog';
import ProdukDetail from './pages/ProdukDetail';
import Keranjang from './pages/Keranjang';
import Checkout from './pages/Checkout';
import CaraSewa from './pages/CaraSewa';
import Kontak from './pages/Kontak';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl font-extrabold text-primary/10 mb-4">404</div>
        <h1 className="text-2xl font-bold text-primary mb-2">Halaman Tidak Ditemukan</h1>
        <p className="text-secondary mb-6">Halaman yang kamu cari tidak ada atau sudah dipindahkan.</p>
        <Link
          to="/"
          className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/"          element={<Home />} />
                <Route path="/katalog"   element={<Katalog />} />
                <Route path="/produk/:id" element={<ProdukDetail />} />
                <Route path="/keranjang" element={<Keranjang />} />
                <Route path="/checkout"  element={<Checkout />} />
                <Route path="/cara-sewa" element={<CaraSewa />} />
                <Route path="/kontak"    element={<Kontak />} />
                <Route path="*"          element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
