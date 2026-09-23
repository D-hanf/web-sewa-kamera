import { useReducer, useCallback } from 'react';
import { createContext, useContext } from 'react';

const ToastContext = createContext(null);

function toastReducer(state, action) {
  switch (action.type) {
    case 'ADD':    return [...state, action.payload];
    case 'REMOVE': return state.filter((t) => t.id !== action.payload);
    default:       return state;
  }
}

export function ToastProvider({ children }) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    dispatch({ type: 'ADD', payload: { id, message, type } });
    setTimeout(() => dispatch({ type: 'REMOVE', payload: id }), duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Container toast — pojok kanan bawah */}
      <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-2 max-w-xs w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            className={`
              pointer-events-auto flex items-center gap-3 px-4 py-3
              rounded-xl shadow-lg text-sm font-medium animate-slide-up text-white
              ${toast.type === 'success' ? 'bg-accent'   : ''}
              ${toast.type === 'error'   ? 'bg-danger'   : ''}
              ${toast.type === 'info'    ? 'bg-primary'  : ''}
            `}
          >
            {/* Ikon status */}
            {toast.type === 'success' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {toast.type === 'error' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {toast.type === 'info' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast harus digunakan di dalam ToastProvider');
  return ctx;
}
