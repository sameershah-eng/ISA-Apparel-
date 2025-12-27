
import React, { useState } from 'react';
import { Product, CartItem } from '../types';

interface ProductDetailProps {
  products: Product[];
  slug: string;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

type ButtonStatus = 'idle' | 'adding' | 'success';

const ProductDetail: React.FC<ProductDetailProps> = ({ products, slug, onAddToCart }) => {
  const product = products.find(p => p.slug === slug);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [activeImage, setActiveImage] = useState(0);
  const [btnStatus, setBtnStatus] = useState<ButtonStatus>('idle');

  if (!product) return <div className="p-20 md:p-40 text-center font-serif italic text-slate-400">Article not found in the archive.</div>;

  const handleAddToCart = () => {
    if (btnStatus !== 'idle') return;
    
    setBtnStatus('adding');
    
    // Simulate luxury processing delay
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
      
      // Reset back to idle after a while
      setTimeout(() => setBtnStatus('idle'), 2000);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
        {/* Left: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/5] bg-slate-50 overflow-hidden rounded-sm relative group cursor-zoom-in">
            <img 
              src={product.images[activeImage]} 
              className="w-full h-full object-cover animate-fadeIn transition-transform duration-700 group-hover:scale-105" 
              alt={product.title} 
            />
          </div>
          <div className="grid grid-cols-4 gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)} 
                className={`aspect-square border-b-2 transition-all flex-shrink-0 min-w-[60px] ${activeImage === idx ? 'border-[#2C3468]' : 'border-transparent opacity-60'}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-5 flex flex-col space-y-10 md:space-y-12">
          <div className="space-y-3 md:space-y-4">
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black text-slate-400">{product.category}</p>
            <h1 className="text-3xl md:text-5xl font-serif italic text-slate-900 leading-tight">{product.title}</h1>
            <p className="text-xl md:text-2xl font-light text-slate-900">${product.price.toFixed(2)}</p>
          </div>

          <div className="space-y-8 md:space-y-10">
            {/* Size */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Select Size</label>
                <button className="text-[9px] uppercase font-bold tracking-widest text-[#2C3468] underline underline-offset-4">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)} 
                    className={`flex-1 md:flex-none min-w-[60px] py-3 text-[10px] md:text-xs font-bold border transition-all ${selectedSize === size ? 'bg-[#2C3468] text-white border-[#2C3468]' : 'border-slate-100 hover:border-slate-300 text-slate-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="space-y-4">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Color — <span className="text-[#2C3468] font-black">{selectedColor}</span></label>
              <div className="flex gap-4">
                {product.colors.map(color => (
                  <button 
                    key={color.name} 
                    onClick={() => setSelectedColor(color.name)} 
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 p-1 transition-all ${selectedColor === color.name ? 'border-[#2C3468]' : 'border-transparent hover:border-slate-200'}`}
                  >
                    <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color.hex }}></div>
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleAddToCart} 
              disabled={btnStatus !== 'idle'} 
              className={`relative w-full py-5 md:py-6 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all overflow-hidden flex items-center justify-center gap-4
                ${btnStatus === 'idle' ? 'bg-[#2C3468] text-white hover:bg-[#1a1f40] shadow-xl active:scale-[0.98]' : ''}
                ${btnStatus === 'adding' ? 'bg-[#2C3468] text-white cursor-wait' : ''}
                ${btnStatus === 'success' ? 'bg-green-600 text-white' : ''}
              `}
            >
              {btnStatus === 'idle' && (
                <>
                  <span>Add to Shopping Bag</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </>
              )}
              {btnStatus === 'adding' && (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Securing Article...</span>
                </>
              )}
              {btnStatus === 'success' && (
                <>
                  <svg className="w-5 h-5 animate-[bounce_0.5s_ease-in-out]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  <span>Article Added</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-8 md:pt-12 border-t border-slate-100 space-y-6 md:space-y-8">
             <div className="space-y-2">
               <h4 className="text-[10px] uppercase font-black tracking-widest text-slate-900">Description</h4>
               <p className="text-[11px] md:text-xs text-slate-500 font-light leading-relaxed">{product.description}</p>
             </div>
             <div className="space-y-4">
                <div className="flex gap-12 text-[10px] uppercase font-black tracking-widest text-slate-400">
                    <span>Fit: Slim</span>
                    <span>Fabric: Italy</span>
                    <span>Wash: Dry Clean</span>
                </div>
                <p className="text-[11px] md:text-xs text-slate-400 font-light leading-relaxed">{product.longDescription}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
