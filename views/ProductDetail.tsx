
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
      window.scrollTo(0, 0);
    }
  }, [product]);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    // We handle the 'adding' state internally without disabling the button element
    // This is the most reliable way to prevent mobile click-swallowing.
    if (!product || btnStatus !== 'idle') return;
    
    // Immediate activation
    setBtnStatus('adding');
    
    // Logic execution
    onAddToCart({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: 1
    });

    const timer = setTimeout(() => {
      setBtnStatus('success');
      setTimeout(() => setBtnStatus('idle'), 2000);
    }, 500);

    return () => clearTimeout(timer);
  }, [product, selectedSize, selectedColor, btnStatus, onAddToCart]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
        <h2 className="text-3xl font-serif italic text-slate-800 mb-4">Article Unretrievable</h2>
        <button onClick={() => window.location.hash = '#/shop'} className="text-[10px] font-black uppercase tracking-widest text-[#2C3468] border-b border-[#2C3468] pb-1">Return to Archive</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 md:py-16 animate-fadeIn relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-20">
        
        {/* Gallery */}
        <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-44 h-fit">
          <div className="aspect-[4/5] bg-slate-50 overflow-hidden rounded-sm relative shadow-sm">
            <img 
              src={product.images[activeImage]} 
              className="w-full h-full object-cover" 
              alt={product.title} 
              loading="eager"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)} 
                className={`w-20 h-24 flex-shrink-0 border-b-2 transition-opacity ${activeImage === idx ? 'border-[#2C3468] opacity-100' : 'border-transparent opacity-40'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="thumb" />
              </button>
            ))}
          </div>
        </div>

        {/* Interaction Panel */}
        <div className="lg:col-span-5 flex flex-col space-y-10">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-300">{product.category}</p>
            <h1 className="text-4xl md:text-6xl font-serif italic text-slate-900 leading-tight">{product.title}</h1>
            <p className="text-2xl font-light text-[#2C3468] tabular-nums tracking-tighter">${product.price.toFixed(2)}</p>
          </div>

          <div className="space-y-10">
            {/* Dimensions */}
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Dimensions</label>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map(size => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)} 
                    className={`h-14 md:h-16 text-[11px] font-black border transition-colors flex items-center justify-center active:scale-95 ${selectedSize === size ? 'bg-[#2C3468] text-white border-[#2C3468]' : 'bg-white text-slate-400 border-slate-100'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-5">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Archival Shade — <span className="text-[#2C3468]">{selectedColor}</span></label>
              <div className="flex gap-4">
                {product.colors.map(color => (
                  <button 
                    key={color.name} 
                    onClick={() => setSelectedColor(color.name)} 
                    className={`w-12 h-12 rounded-full border-2 p-1 transition-transform active:scale-90 ${selectedColor === color.name ? 'border-[#2C3468]' : 'border-transparent'}`}
                  >
                    <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color.hex }}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* MAIN ACTION - Optimized for Touch */}
            <div className="pt-4">
              <button 
                onClick={handleAddToCart}
                className={`w-full py-6 md:py-8 text-[11px] font-black uppercase tracking-[0.4em] rounded-sm shadow-2xl transition-all duration-300 flex items-center justify-center gap-4 active:scale-95
                  ${btnStatus === 'idle' ? 'bg-[#2C3468] text-white hover:bg-black' : ''}
                  ${btnStatus === 'adding' ? 'bg-[#2C3468] text-white opacity-80' : ''}
                  ${btnStatus === 'success' ? 'bg-emerald-700 text-white' : ''}
                `}
              >
                {btnStatus === 'idle' && <><span>Secure to Bag</span><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg></>}
                {btnStatus === 'adding' && <><div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div><span>Inscribing...</span></>}
                {btnStatus === 'success' && <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg><span>Secured</span></>}
              </button>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-100 space-y-6">
             <h4 className="text-[10px] uppercase font-black tracking-widest text-slate-900">Archival Narrative</h4>
             <p className="text-sm text-slate-500 font-light leading-relaxed">{product.description}</p>
             <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-slate-50 rounded-sm">
                   <p className="text-[8px] uppercase tracking-widest text-slate-300 font-black mb-1">Origin</p>
                   <p className="text-[9px] font-bold text-[#2C3468]">Italy</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-sm">
                   <p className="text-[8px] uppercase tracking-widest text-slate-300 font-black mb-1">Fabric</p>
                   <p className="text-[9px] font-bold text-[#2C3468]">Merino</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-sm">
                   <p className="text-[8px] uppercase tracking-widest text-slate-300 font-black mb-1">Care</p>
                   <p className="text-[9px] font-bold text-[#2C3468]">Archive</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
