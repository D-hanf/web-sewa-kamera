import { createContext, useContext, useReducer, useEffect } from 'react';
import { hitungSubtotal } from '../utils/formatters';

// ─── Konstanta localStorage key ──────────────────────────────────────────────
const CART_STORAGE_KEY = 'lensaKita_cart';

// ─── Reducer ──────────────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, jumlah_hari } = action.payload;
      const existingIdx = state.findIndex((item) => item.id === product.id);

      if (existingIdx !== -1) {
        // Produk sudah ada → update jumlah hari
        return state.map((item, idx) =>
          idx === existingIdx
            ? {
                ...item,
                jumlah_hari,
                subtotal: hitungSubtotal(item.harga_per_hari, jumlah_hari),
              }
            : item
        );
      }

      // Produk baru → tambahkan ke keranjang
      return [
        ...state,
        {
          id: product.id,
          nama: product.nama,
          foto: product.foto,
          harga_per_hari: product.harga_per_hari,
          jumlah_hari,
          subtotal: hitungSubtotal(product.harga_per_hari, jumlah_hari),
        },
      ];
    }

    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload.id);

    case 'UPDATE_DAYS': {
      const { id, jumlah_hari } = action.payload;
      const days = Math.max(1, jumlah_hari); // minimal 1 hari
      return state.map((item) =>
        item.id === id
          ? { ...item, jumlah_hari: days, subtotal: hitungSubtotal(item.harga_per_hari, days) }
          : item
      );
    }

    case 'CLEAR_CART':
      return [];

    case 'HYDRATE':
      return action.payload;

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], () => {
    // Inisialisasi dari localStorage saat pertama render
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sinkron ke localStorage setiap kali items berubah
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // ── Helper: hitung total harga keseluruhan
  const getTotalPrice = () => items.reduce((sum, item) => sum + item.subtotal, 0);

  // ── Helper: jumlah total item di keranjang
  const getTotalItems = () => items.length;

  const addToCart = (product, jumlah_hari = 1) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, jumlah_hari } });

  const removeFromCart = (id) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });

  const updateItemDays = (id, jumlah_hari) =>
    dispatch({ type: 'UPDATE_DAYS', payload: { id, jumlah_hari } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateItemDays,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook shortcut
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart harus digunakan di dalam CartProvider');
  return ctx;
}
