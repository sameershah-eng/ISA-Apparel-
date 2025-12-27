
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Product, CartItem } from '../types';

interface ProductDetailProps {
  products: Product[];
  slug: string;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

type ButtonStatus = 'idle' | 'adding' | 'success';

const ProductDetail: React.FC<ProductDetailProps> = ({ products, slug, onAddToCart }) => {
  const product = useMemo(() => {
    const decodedSlug = decodeURIComponent(slug).toLowerCase();
    return products.find(p => 
      p.slug.toLowerCase() === decodedSlug || 
      p.id.toLowerCase() === decodedSlug
    );
  }, [products, slug]);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [btnStatus, setBtnStatus] = useState<ButtonStatus>('idle');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '32');
      setSelectedColor(product.colors[0]?.name || 'Midnight');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [product]);

  // Size Selection: Absolute 0ms Latency
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  // Secure to Bag: High Priority Handler (No 'disabled' attribute to prevent mobile event cancellation)
  const handleAddToCart = useCallback(() => {
    if (!product || btnStatus !== 'idle') return;
    
    // 1. Trigger internal logic immediately
    onAddToCart({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: 1
    });

    // 2. Reflect visual state
    setBtnStatus('adding');
    
    const timer = setTimeout(() => {
      setBtnStatus('success');
      setTimeout(() => setBtnStatus('idle'), 1800);
    }, 400);

    return () => clearTimeout(timer);
  }, [product, selectedSize, selectedColor, btnStatus, onAddToCart]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
        <div className="w-px h-16 bg-slate-200 mb-8"></div>
        <h2 className="text-3xl font-serif italic text-slate-800 mb-4">Article Unretrievable</h2>
        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-10 max-w-xs leading-loose">
          The requested item has been moved or is currently unavailable in our digital archive.
        </p>
        <button onClick={() => window.location.hash = '#/shop'} className="text-[10px] font-black uppercase tracking-widest text-[#2C3468] border-b border-[#2C3468] pb-1">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-16 animate-fadeIn relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
        
        {/* Gallery Section */}
        <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-44 h-fit">
          <div className="aspect-[4/5] bg-slate-50 overflow-hidden rounded-sm relative group shadow-sm border border-slate-50">
            <img 
              src={product.images[activeImage]} 
              className="w-full h-full object-cover" 
              alt={product.title} 
              loading="eager"
            />
            {product.stock < 10 && (
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 text-[9px] uppercase font-black tracking-widest shadow-xl text-red-600 border border-red-50">Rare Archival Piece</div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-3 md:gap-5 overflow-x-auto pb-4 scrollbar-hide">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)} 
                className={`aspect-[3/4] border-b-2 transition-opacity flex-shrink-0 min-w-[70px] ${activeImage === idx ? 'border-[#2C3468] opacity-100' : 'border-transparent opacity-30 active:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="thumbnail" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Info & Interaction Panel */}
        <div className="lg:col-span-5 flex flex-col space-y-12 relative z-20">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
               <span className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-black text-slate-300">{product.category}</span>
               <div className="h-px flex-1 bg-slate-100"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif italic text-slate-900 leading-tight">{product.title}</h1>
            <p className="text-2xl font-light text-[#2C3468] tabular-nums tracking-tighter">${product.price.toFixed(2)}</p>
          </div>

          <div className="space-y-12">
            {/* Dimension Selection - Enhanced Touch Areas */}
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-black tracking-super-wide text-slate-400">Dimensions</label>
                <button className="text-[8px] uppercase font-bold tracking-widest text-[#2C3468] underline underline-offset-4">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map(size => (
                  <button 
                    key={size} 
                    type="button"
                    onClick={() => handleSizeSelect(size)} 
                    className={`py-5 text-[11px] font-black border transition-none active:scale-[0.96] active:bg-slate-50 ${selectedSize === size ? 'bg-[#2C3468] text-white border-[#2C3468] shadow-md z-10' : 'bg-white border-slate-100 text-slate-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Shade Selection */}
            <div className="space-y-5">
              <label className="text-[10px] uppercase font-black tracking-super-wide text-slate-400">Archival Shade — <span className="text-[#2C3468] font-black">{selectedColor}</span></label>
              <div className="flex gap-5">
                {product.colors.map(color => (
                  <button 
                    key={color.name} 
                    type="button"
                    onClick={() => setSelectedColor(color.name)} 
                    className={`w-12 h-12 rounded-full border-2 p-1 transition-none transform active:scale-90 ${selectedColor === color.name ? 'border-[#2C3468] scale-110 shadow-lg' : 'border-transparent'}`}
                  >
                    <div className="w-full h-full rounded-full shadow-inner border border-black/5" style={{ backgroundColor: color.hex }}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* BAG ACTION BUTTON - Reinforced Hit Area */}
            <div className="pt-6">
              <button 
                type="button"
                onClick={handleAddToCart} 
                className={`relative w-full py-7 md:py-8 text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-300 overflow-hidden rounded-sm flex items-center justify-center select-none shadow-xl border cursor-pointer z-30
                  ${btnStatus === 'idle' ? 'bg-[#2C3468] text-white border-[#2C3468] active:scale-[0.98] active:bg-black' : ''}
                  ${btnStatus === 'adding' ? 'bg-[#2C3468] text-white border-[#2C3468] opacity-90' : ''}
                  ${btnStatus === 'success' ? 'bg-emerald-800 text-white border-emerald-800' : ''}
                `}
              >
                <div className="relative flex items-center gap-5 pointer-events-none">
                  {btnStatus === 'idle' && (
                    <>
                      <span>Secure to Bag</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </>
                  )}
                  {btnStatus === 'adding' && (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Authorizing...</span>
                    </>
                  )}
                  {btnStatus === 'success' && (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" /></svg>
                      <span>Item Secured</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>

          <div className="pt-16 border-t border-slate-100 space-y-12">
             <div className="space-y-4">
               <h4 className="text-[10px] uppercase font-black tracking-widest text-slate-900">Archival Narrative</h4>
               <p className="text-xs md:text-sm text-slate-500 font-light leading-relaxed">{product.description}</p>
             </div>
             <div className="grid grid-cols-3 gap-6 py-6 border-y border-slate-50">
                <div>
                   <p className="text-[8px] uppercase tracking-widest text-slate-300 font-black mb-1">Origin</p>
                   <p className="text-[10px] font-bold text-[#2C3468]">Biella, IT</p>
                </div>
                <div>
                   <p className="text-[8px] uppercase tracking-widest text-slate-300 font-black mb-1">Fit</p>
                   <p className="text-[10px] font-bold text-[#2C3468]">Classic</p>
                </div>
                <div>
                   <p className="text-[8px] uppercase tracking-widest text-slate-300 font-black mb-1">Care</p>
                   <p className="text-[10px] font-bold text-[#2C3468]">Dry Clean</p>
                </div>
             </div>
             <p className="text-xs text-slate-400 font-light leading-relaxed italic">{product.longDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
