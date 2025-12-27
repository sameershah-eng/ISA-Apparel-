
import React, { useEffect } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  const handleCheckout = () => {
    onClose();
    window.location.hash = '#/checkout';
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 z-[90] ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[100] transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
            <h2 className="text-xl font-semibold uppercase tracking-widest text-[#2C3468]">Your Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors" aria-label="Close Cart">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                <p className="text-lg">Your cart is currently empty.</p>
                <button onClick={onClose} className="text-[#2C3468] underline font-medium uppercase text-[10px] tracking-widest font-bold">Start Shopping</button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 animate-fadeIn">
                  <div className="w-24 h-32 bg-slate-100 rounded-sm overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-[11px] uppercase tracking-wide text-slate-800 leading-tight pr-4">{item.title}</h3>
                        <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                      </div>
                      <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-widest font-bold">{item.color} — {item.size}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-slate-100 rounded overflow-hidden">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-slate-50 text-[#2C3468] font-bold transition-colors">-</button>
                        <span className="px-3 py-1 text-xs tabular-nums font-bold text-[#2C3468] bg-slate-50/50">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-slate-50 text-[#2C3468] font-bold transition-colors">+</button>
                      </div>
                      <span className="font-bold text-[#2C3468] text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t bg-slate-50 sticky bottom-0">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Subtotal Due</span>
                <span className="text-2xl font-bold text-[#2C3468]">${subtotal.toFixed(2)}</span>
              </div>
              <button onClick={handleCheckout} className="w-full py-5 bg-[#2C3468] text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-opacity-90 transition-all transform active:scale-[0.98] shadow-2xl">Proceed to Checkout</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
