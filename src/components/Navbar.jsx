import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { settings } from '../config/theme';

// Ikon kamera SVG untuk logo
function CameraIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );
}

// Ikon keranjang SVG
function CartIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

export default function Navbar() {
  const { getTotalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const totalItems = getTotalItems();

  const navLinks = [
    { to: '/',         label: 'Beranda',  end: true },
    { to: '/katalog',  label: 'Katalog',  end: false },
    { to: '/cara-sewa',label: 'Cara Sewa',end: false },
    { to: '/kontak',   label: 'Kontak',   end: false },
  ];

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-accent' : 'text-white/80 hover:text-white'
    }`;

  return (
    <nav className="sticky top-0 z-40 bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="text-accent">
              <CameraIcon className="w-6 h-6" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              {settings.siteName.slice(0, -4)}
              <span className="text-accent">{settings.siteName.slice(-4)}</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Keranjang + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Tombol keranjang */}
            <button
              onClick={() => navigate('/keranjang')}
              className="relative flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-colors duration-200"
              aria-label="Keranjang belanja"
            >
              <CartIcon />
              <span className="hidden sm:inline text-sm font-medium">Keranjang</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger mobile */}
            <button
              className="md:hidden p-2 text-white/70 hover:text-white rounded-lg transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 py-3 pb-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/15 text-accent'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
