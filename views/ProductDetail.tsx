
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
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
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  
  const mainActionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '32');
      setSelectedColor(product.colors[0]?.name || 'Midnight');
      window.scrollTo(0, 0);
    }
  }, [product]);

  // Sync horizontal gallery scroll to dots
  const handleScroll = useCallback(() => {
    if (galleryRef.current) {
      const scrollLeft = galleryRef.current.scrollLeft;
      const width = galleryRef.current.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setActiveImage(index);
    }
  }, []);

  // Sticky Button Visibility Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStickyVisible(!entry.isIntersecting && window.innerWidth < 768);
      },
      { threshold: 0, rootMargin: '0px' }
    );

    if (mainActionRef.current) {
      observer.observe(mainActionRef.current);
    }

    return () => observer.disconnect();
  }, [product]);

  const handleAddToCart = useCallback((e?: any) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    if (!product || btnStatus !== 'idle') return;
    
    setBtnStatus('adding');
    
    onAddToCart({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: 1
    });

    setTimeout(() => {
      setBtnStatus('success');
      setTimeout(() => setBtnStatus('idle'), 2000);
    }, 500);
  }, [product, selectedSize, selectedColor, btnStatus, onAddToCart]);

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto pb-32 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-16 lg:px-12">
        
        {/* GALLERY SYSTEM */}
        <div className="lg:col-span-7 relative">
          {/* Mobile Swipe Gallery */}
          <div 
            ref={galleryRef}
            onScroll={handleScroll}
            className="md:hidden snap-x overflow-x-auto no-scrollbar h-[70vh]"
          >
            {product.images.map((img, idx) => (
              <div key={idx} className="snap-center h-full">
                <img src={img} className="w-full h-full object-cover" alt={`${product.title} ${idx}`} />
              </div>
            ))}
          </div>

          {/* Desktop Stacked Gallery */}
          <div className="hidden md:flex flex-col gap-6 pt-16">
            {product.images.map((img, idx) => (
              <div key={idx} className="aspect-[4/5] bg-slate-50 overflow-hidden shadow-sm">
                <img src={img} className="w-full h-full object-cover" alt={`${product.title} view ${idx}`} />
              </div>
            ))}
          </div>

          {/* Mobile Indicators */}
          <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {product.images.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 rounded-full transition-all duration-300 ${activeImage === idx ? 'w-6 bg-[#2C3468]' : 'w-1 bg-white/50 backdrop-blur-md'}`} 
              />
            ))}
          </div>
        </div>

        {/* INTERACTION PANEL */}
        <div className="lg:col-span-5 px-6 pt-10 md:pt-16 space-y-12 md:sticky md:top-32 md:h-fit">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-300">{product.category}</span>
            <h1 className="text-4xl md:text-6xl font-serif italic text-slate-900 leading-tight">{product.title}</h1>
            <p className="text-2xl font-light text-[#2C3468] tabular-nums tracking-tighter">${product.price.toFixed(2)}</p>
          </div>

          <div className="space-y-10">
            {/* Dimensions */}
            <div className="space-y-5">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Dimensions</label>
              <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                {product.sizes.map(size => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)} 
                    className={`h-14 text-[11px] font-black border transition-all active:scale-95 ${selectedSize === size ? 'bg-[#2C3468] text-white border-[#2C3468] shadow-lg' : 'bg-white text-slate-400 border-slate-100'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Shades */}
            <div className="space-y-5">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Archival Shade — <span className="text-[#2C3468]">{selectedColor}</span></label>
              <div className="flex gap-4">
                {product.colors.map(color => (
                  <button 
                    key={color.name} 
                    onClick={() => setSelectedColor(color.name)} 
                    className={`w-14 h-14 rounded-full border-2 p-1 transition-all active:scale-90 ${selectedColor === color.name ? 'border-[#2C3468] scale-110 shadow-md' : 'border-transparent'}`}
                  >
                    <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color.hex }}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main CTA */}
            <div ref={mainActionRef} className="pt-6">
              <button 
                onClick={handleAddToCart}
                className={`w-full py-6 md:py-8 text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-300 flex items-center justify-center gap-4 shadow-2xl
                  ${btnStatus === 'idle' ? 'bg-[#2C3468] text-white' : ''}
                  ${btnStatus === 'adding' ? 'bg-slate-400 text-white cursor-wait' : ''}
                  ${btnStatus === 'success' ? 'bg-emerald-700 text-white' : ''}
                `}
              >
                {btnStatus === 'idle' && <><span>Secure to Bag</span><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg></>}
                {btnStatus === 'adding' && <><div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div><span>Inscribing...</span></>}
                {btnStatus === 'success' && <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg><span>Secured</span></>}
              </button>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-100 space-y-8">
             <div className="space-y-4">
               <h4 className="text-[10px] uppercase font-black tracking-widest text-slate-900">Archival Narrative</h4>
               <p className="text-sm text-slate-500 font-light leading-relaxed">{product.description}</p>
             </div>
             <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-5 bg-slate-50 rounded-sm">
                   <p className="text-[8px] uppercase tracking-widest text-slate-300 font-black mb-1">Canvas</p>
                   <p className="text-[10px] font-bold text-[#2C3468]">Half</p>
                </div>
                <div className="text-center p-5 bg-slate-50 rounded-sm">
                   <p className="text-[8px] uppercase tracking-widest text-slate-300 font-black mb-1">Textile</p>
                   <p className="text-[10px] font-bold text-[#2C3468]">Italy</p>
                </div>
                <div className="text-center p-5 bg-slate-50 rounded-sm">
                   <p className="text-[8px] uppercase tracking-widest text-slate-300 font-black mb-1">Fit</p>
                   <p className="text-[10px] font-bold text-[#2C3468]">Archival</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* STICKY MOBILE CONVERSION BAR */}
      <div className={`md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-2xl border-t border-black/5 p-4 z-[80] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pb-[calc(1rem+env(safe-area-inset-bottom))] ${isStickyVisible ? 'translate-y-0 opacity-100 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)]' : 'translate-y-full opacity-0'}`}>
        <div className="flex gap-4 items-center">
          <div className="flex-1 min-w-0">
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 truncate leading-tight">{product.title}</p>
             <p className="text-sm font-bold text-[#2C3468]">${product.price.toFixed(2)}</p>
          </div>
          <button 
            onClick={handleAddToCart}
            className={`px-8 h-12 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2
              ${btnStatus === 'idle' ? 'bg-[#2C3468] text-white' : ''}
              ${btnStatus === 'adding' ? 'bg-slate-400 text-white opacity-50' : ''}
              ${btnStatus === 'success' ? 'bg-emerald-700 text-white' : ''}
            `}
          >
            {btnStatus === 'idle' && <span>Secure Bag</span>}
            {btnStatus === 'adding' && <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>}
            {btnStatus === 'success' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
