
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

  const isBespoke = product?.category === 'Bespoke';

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [btnStatus, setBtnStatus] = useState<ButtonStatus>('idle');
  
  // Customization state for Bespoke products
  const [customization, setCustomization] = useState({
    pleats: 'Flat Front',
    waistband: 'Belt Loops',
    cuffs: 'Plain'
  });

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '32');
      setSelectedColor(product.colors[0]?.name || 'Midnight');
      window.scrollTo(0, 0);
    }
  }, [product]);

  // VITAL FIX: High-Priority Touch Handler for Mobile
  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    // We handle the 'adding' state internally without disabling the button element.
    // This prevents mobile browsers from cancelling the 'click' event mid-tap.
    if (!product || btnStatus !== 'idle') return;
    
    // Immediate Visual & Logic Activation
    setBtnStatus('adding');
    
    const itemTitle = isBespoke ? `${product.title} (Bespoke)` : product.title;
    
    onAddToCart({
      productId: product.id,
      title: itemTitle,
      price: product.price,
      image: product.images[0],
      size: isBespoke ? 'Custom' : selectedSize,
      color: selectedColor,
      quantity: 1
    });

    const timer = setTimeout(() => {
      setBtnStatus('success');
      setTimeout(() => setBtnStatus('idle'), 2200);
    }, 450);

    return () => clearTimeout(timer);
  }, [product, selectedSize, selectedColor, btnStatus, onAddToCart, isBespoke]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
        <h2 className="text-3xl font-serif italic text-slate-800 mb-4">Article Unretrievable</h2>
        <button onClick={() => window.location.hash = '#/shop'} className="text-[10px] font-black uppercase tracking-widest text-[#2C3468] border-b border-[#2C3468] pb-1">Return to Archive</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 md:py-16 animate-fadeIn relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-20">
        
        {/* Gallery */}
        <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-44 h-fit">
          <div className="aspect-[4/5] bg-slate-50 overflow-hidden rounded-sm relative shadow-sm border border-slate-50">
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
                className={`w-20 h-24 flex-shrink-0 border-b-2 transition-opacity active:opacity-100 ${activeImage === idx ? 'border-[#2C3468] opacity-100' : 'border-transparent opacity-40'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="thumb" />
              </button>
            ))}
          </div>
        </div>

        {/* Interaction Panel */}
        <div className="lg:col-span-5 flex flex-col space-y-10 relative z-20">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-300">{product.category}</p>
            <h1 className="text-4xl md:text-6xl font-serif italic text-slate-900 leading-tight">{product.title}</h1>
            <p className="text-2xl font-light text-[#2C3468] tabular-nums tracking-tighter">
              ${product.price.toFixed(2)}
              {isBespoke && <span className="text-[10px] uppercase font-black ml-4 tracking-widest opacity-40">Base Price</span>}
            </p>
          </div>

          <div className="space-y-10">
            {isBespoke ? (
              /* Customization Controls for Bespoke */
              <div className="space-y-8 animate-fadeIn">
                <div className="space-y-4">
                   <label className="text-[9px] uppercase font-black tracking-super-wide text-slate-400">Silhoutte & Pleats</label>
                   <div className="grid grid-cols-2 gap-2">
                     {['Flat Front', 'Single Pleat'].map(p => (
                       <button 
                        key={p} 
                        onClick={() => setCustomization(prev => ({...prev, pleats: p}))}
                        className={`py-4 text-[10px] font-black uppercase border transition-colors cursor-pointer ${customization.pleats === p ? 'bg-[#2C3468] text-white border-[#2C3468]' : 'bg-white border-slate-100 text-slate-400'}`}
                       >
                         {p}
                       </button>
                     ))}
                   </div>
                </div>
                <div className="space-y-4">
                   <label className="text-[9px] uppercase font-black tracking-super-wide text-slate-400">Waistband Closure</label>
                   <div className="grid grid-cols-2 gap-2">
                     {['Belt Loops', 'Side Adjusters'].map(w => (
                       <button 
                        key={w} 
                        onClick={() => setCustomization(prev => ({...prev, waistband: w}))}
                        className={`py-4 text-[10px] font-black uppercase border transition-colors cursor-pointer ${customization.waistband === w ? 'bg-[#2C3468] text-white border-[#2C3468]' : 'bg-white border-slate-100 text-slate-400'}`}
                       >
                         {w}
                       </button>
                     ))}
                   </div>
                </div>
              </div>
            ) : (
              /* Standard Dimension Controls */
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Dimensions</label>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map(size => (
                    <button 
                      key={size} 
                      onClick={() => setSelectedSize(size)} 
                      className={`h-14 md:h-16 text-[11px] font-black border transition-colors flex items-center justify-center active:scale-95 cursor-pointer ${selectedSize === size ? 'bg-[#2C3468] text-white border-[#2C3468]' : 'bg-white text-slate-400 border-slate-100'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            <div className="space-y-5">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Archival Shade — <span className="text-[#2C3468]">{selectedColor}</span></label>
              <div className="flex gap-4">
                {product.colors.map(color => (
                  <button 
                    key={color.name} 
                    onClick={() => setSelectedColor(color.name)} 
                    className={`w-12 h-12 rounded-full border-2 p-1 transition-transform active:scale-90 cursor-pointer ${selectedColor === color.name ? 'border-[#2C3468]' : 'border-transparent'}`}
                  >
                    <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color.hex }}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* VITAL ACTION: SECURE TO BAG */}
            <div className="pt-4 relative z-30">
              <button 
                onClick={handleAddToCart}
                className={`w-full py-6 md:py-8 text-[11px] font-black uppercase tracking-[0.4em] rounded-sm shadow-2xl transition-all duration-300 flex items-center justify-center gap-4 active:scale-95 touch-manipulation cursor-pointer
                  ${btnStatus === 'idle' ? 'bg-[#2C3468] text-white' : ''}
                  ${btnStatus === 'adding' ? 'bg-[#2C3468] text-white opacity-80' : ''}
                  ${btnStatus === 'success' ? 'bg-emerald-700 text-white' : ''}
                `}
              >
                {btnStatus === 'idle' && (
                  <>
                    <span>{isBespoke ? 'Inscribe Custom Order' : 'Secure to Bag'}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
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
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                    <span>Secured</span>
                  </>
                )}
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
                   <p className="text-[8px] uppercase tracking-widest text-slate-300 font-black mb-1">Fit</p>
                   <p className="text-[9px] font-bold text-[#2C3468]">{isBespoke ? 'Bespoke' : 'Classic'}</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
