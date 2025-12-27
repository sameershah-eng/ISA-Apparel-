
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
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 z-[90] ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-[100] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 md:p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
            <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#2C3468]">Shopping Bag</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors" aria-label="Close Cart">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 scrollbar-hide">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-300 space-y-6">
                <div className="w-12 h-px bg-slate-100"></div>
                <p className="text-[10px] uppercase tracking-widest font-serif italic">Your bag is empty.</p>
                <button onClick={onClose} className="text-[#2C3468] text-[9px] uppercase font-black tracking-super-wide border-b border-[#2C3468]/20 pb-1">Begin Browsing</button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 animate-fadeIn">
                  <div className="w-20 h-28 md:w-24 md:h-32 bg-slate-50 rounded-sm overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale-[0.3]" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-[9px] md:text-[10px] uppercase tracking-wide text-slate-800 leading-tight pr-4">{item.title}</h3>
                        <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                      </div>
                      <p className="text-[8px] md:text-[9px] text-slate-400 uppercase tracking-widest font-black">{item.color} — {item.size}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-slate-100 rounded overflow-hidden">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)} 
                          className="px-2.5 py-1 md:px-3 md:py-1.5 hover:bg-slate-50 text-[#2C3468] font-bold text-[10px]"
                        >-</button>
                        <span className="px-2.5 py-1 md:px-3 md:py-1.5 text-[9px] md:text-xs tabular-nums font-black text-[#2C3468] bg-slate-50/50">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)} 
                          className="px-2.5 py-1 md:px-3 md:py-1.5 hover:bg-slate-50 text-[#2C3468] font-bold text-[10px]"
                        >+</button>
                      </div>
                      <span className="font-black text-[#2C3468] text-[10px] md:text-xs tabular-nums">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t bg-white sticky bottom-0 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-[8px] md:text-[10px] uppercase font-black tracking-widest">Archive Subtotal</span>
                <span className="text-lg md:text-xl font-black text-[#2C3468] tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout} 
                className="w-full py-4 md:py-5 bg-[#2C3468] text-white font-black uppercase tracking-[0.4em] text-[9px] md:text-[10px] hover:bg-black transition-all shadow-xl active:scale-[0.98]"
              >
                Checkout Securely
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
