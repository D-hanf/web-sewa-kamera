import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';

const KATEGORI_LIST = ['Semua', 'Kamera', 'Lensa', 'Aksesoris'];

export default function Katalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch]   = useState('');
  const [kategori, setKategori] = useState(searchParams.get('kategori') || 'Semua');
  const [sortBy, setSortBy]   = useState('default');

  // Sync kategori dari URL query param
  useEffect(() => {
    const katParam = searchParams.get('kategori');
    if (katParam) setKategori(katParam);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (kategori !== 'Semua') {
      result = result.filter((p) => p.kategori === kategori);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.nama.toLowerCase().includes(q) || p.deskripsi_singkat.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'harga-asc')  result.sort((a, b) => a.harga_per_hari - b.harga_per_hari);
    if (sortBy === 'harga-desc') result.sort((a, b) => b.harga_per_hari - a.harga_per_hari);
    if (sortBy === 'nama-asc')   result.sort((a, b) => a.nama.localeCompare(b.nama));

    return result;
  }, [search, kategori, sortBy]);

  const handleKategori = (kat) => {
    setKategori(kat);
    setSearchParams(kat === 'Semua' ? {} : { kategori: kat });
  };

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-1">Katalog Produk</h1>
          <p className="text-secondary text-sm">{filtered.length} produk ditemukan</p>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          {/* Search */}
          <div className="relative flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-border text-primary placeholder:text-muted rounded-xl text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-border text-secondary text-sm px-3 py-2.5 rounded-xl focus:outline-none focus:border-accent transition-colors cursor-pointer min-w-[165px]"
          >
            <option value="default">Urutkan</option>
            <option value="harga-asc">Harga: Terendah</option>
            <option value="harga-desc">Harga: Tertinggi</option>
            <option value="nama-asc">Nama: A&ndash;Z</option>
          </select>
        </div>

        {/* Tab kategori */}
        <div className="flex gap-2 flex-wrap mb-8">
          {KATEGORI_LIST.map((kat) => (
            <button
              key={kat}
              onClick={() => handleKategori(kat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                kategori === kat
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-secondary hover:bg-card border border-border'
              }`}
            >
              {kat}
            </button>
          ))}
        </div>

        {/* Grid produk */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-primary font-semibold text-lg mb-2">Produk tidak ditemukan</h3>
            <p className="text-secondary text-sm">Coba kata kunci atau kategori yang berbeda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
