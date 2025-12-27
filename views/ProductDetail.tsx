
import React, { useState, useMemo } from 'react';
import { Product, CartItem } from '../types';

interface ProductDetailProps {
  products: Product[];
  slug: string;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

type ButtonStatus = 'idle' | 'adding' | 'success';

const ProductDetail: React.FC<ProductDetailProps> = ({ products, slug, onAddToCart }) => {
  // Robust lookup: try slug, then fallback to ID, case-insensitive
  const product = useMemo(() => {
    return products.find(p => 
      p.slug.toLowerCase() === slug.toLowerCase() || 
      p.id.toLowerCase() === slug.toLowerCase()
    );
  }, [products, slug]);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [btnStatus, setBtnStatus] = useState<ButtonStatus>('idle');

  // Set defaults once product is found
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0]?.name || '');
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-px h-12 bg-slate-200 mb-6"></div>
        <h2 className="text-2xl font-serif italic text-slate-800 mb-4">Article Not Found</h2>
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-8">The requested item could not be retrieved from the archive.</p>
        <a href="#/shop" className="text-[10px] font-black uppercase tracking-widest text-[#2C3468] border-b border-[#2C3468] pb-1">Return to Collection</a>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (btnStatus !== 'idle') return;
    
    setBtnStatus('adding');
    
    // Simulate luxury processing delay for tactile feel
    setTimeout(() => {
      onAddToCart({
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
        quantity: 1
      });
      setBtnStatus('success');
      
      // Reset after animation
      setTimeout(() => setBtnStatus('idle'), 2500);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
        
        {/* Left: Gallery (Sticky on Desktop) */}
        <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-44 h-fit">
          <div className="aspect-[4/5] bg-slate-50 overflow-hidden rounded-sm relative group cursor-crosshair">
            <img 
              src={product.images[activeImage]} 
              className="w-full h-full object-cover animate-fadeIn transition-transform duration-1000 group-hover:scale-110" 
              alt={product.title} 
            />
            {product.stock < 5 && (
              <div className="absolute top-4 left-4 bg-white px-3 py-1.5 text-[8px] uppercase font-black tracking-widest shadow-xl text-red-600">Limited Availability</div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)} 
                className={`aspect-square border-b-2 transition-all flex-shrink-0 min-w-[70px] ${activeImage === idx ? 'border-[#2C3468]' : 'border-transparent opacity-40 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-5 flex flex-col space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
               <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black text-slate-400">{product.category}</span>
               <div className="h-px flex-1 bg-slate-100"></div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-slate-900 leading-tight">{product.title}</h1>
            <p className="text-2xl md:text-3xl font-light text-[#2C3468] tabular-nums">${product.price.toFixed(2)}</p>
          </div>

          <div className="space-y-10">
            {/* Size Selection */}
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-black tracking-super-wide text-slate-500">Size Selection</label>
                <button className="text-[8px] uppercase font-bold tracking-widest text-[#2C3468] border-b border-[#2C3468]/20 hover:border-[#2C3468] transition-all">Size Archive</button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map(size => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)} 
                    className={`flex-1 md:flex-none min-w-[64px] py-4 text-[10px] font-bold border transition-all duration-300 ${selectedSize === size ? 'bg-[#2C3468] text-white border-[#2C3468] shadow-lg scale-105' : 'border-slate-100 hover:border-slate-300 text-slate-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-5">
              <label className="text-[10px] uppercase font-black tracking-super-wide text-slate-500">Shade — <span className="text-[#2C3468] font-black">{selectedColor}</span></label>
              <div className="flex gap-5">
                {product.colors.map(color => (
                  <button 
                    key={color.name} 
                    onClick={() => setSelectedColor(color.name)} 
                    className={`w-12 h-12 rounded-full border-2 p-1 transition-all duration-500 transform hover:scale-110 ${selectedColor === color.name ? 'border-[#2C3468] scale-110 shadow-lg' : 'border-transparent hover:border-slate-200'}`}
                  >
                    <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color.hex }}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Elevated Add To Cart Button */}
            <div className="pt-4">
              <button 
                onClick={handleAddToCart} 
                disabled={btnStatus !== 'idle'} 
                className={`relative group w-full py-6 md:py-7 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-700 overflow-hidden rounded-sm flex items-center justify-center
                  ${btnStatus === 'idle' ? 'bg-[#2C3468] text-white hover:bg-slate-900 shadow-2xl active:scale-[0.97]' : ''}
                  ${btnStatus === 'adding' ? 'bg-[#2C3468] text-white cursor-wait' : ''}
                  ${btnStatus === 'success' ? 'bg-green-700 text-white' : ''}
                `}
              >
                {/* Background Shimmer */}
                {btnStatus === 'idle' && (
                   <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                )}

                <div className="relative flex items-center gap-4">
                  {btnStatus === 'idle' && (
                    <>
                      <span>Secure to Bag</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </>
                  )}
                  {btnStatus === 'adding' && (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span className="animate-pulse">Authorizing...</span>
                    </>
                  )}
                  {btnStatus === 'success' && (
                    <>
                      <svg className="w-5 h-5 animate-[checkPop_0.5s_ease-out]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" /></svg>
                      <span className="animate-[slideIn_0.3s_ease-out]">Added to Archive</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-100 space-y-10">
             <div className="space-y-3">
               <h4 className="text-[10px] uppercase font-black tracking-widest text-slate-900">Sartorial Detail</h4>
               <p className="text-xs md:text-sm text-slate-500 font-light leading-relaxed">{product.description}</p>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-2 border-y border-slate-50">
                <div className="space-y-1">
                   <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">Cut</p>
                   <p className="text-[10px] font-bold text-[#2C3468]">Modern Slim</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">Origin</p>
                   <p className="text-[10px] font-bold text-[#2C3468]">Biella, Italy</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">Care</p>
                   <p className="text-[10px] font-bold text-[#2C3468]">Dry Clean Only</p>
                </div>
             </div>
             <p className="text-xs text-slate-400 font-light leading-relaxed italic">{product.longDescription}</p>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes checkPop {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideIn {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
