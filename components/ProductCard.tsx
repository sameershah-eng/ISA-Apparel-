
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleNavigate = (e: React.MouseEvent) => {
    // Explicitly update hash to ensure App router triggers immediately
    window.location.hash = `#/product/${product.slug}`;
  };

  return (
    <div className="group relative">
      <div 
        onClick={handleNavigate}
        className="cursor-pointer block relative overflow-hidden aspect-[3/4] bg-slate-100 rounded-sm active:opacity-70 transition-opacity"
      >
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-110" 
          loading="lazy"
        />
        
        {product.images[1] && (
          <img 
            src={product.images[1]} 
            alt={product.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
            loading="lazy"
          />
        )}

        <div className="absolute top-3 left-3 pointer-events-none">
          {product.stock < 5 && (
              <div className="bg-white/95 px-2 py-1 text-[8px] uppercase tracking-widest font-black text-red-600 border border-red-50">Limited</div>
          )}
        </div>

        {/* Mobile Call-to-Action */}
        <div className="md:hidden absolute bottom-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-xl border border-slate-100">
           <svg className="w-4 h-4 text-[#2C3468]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
           </svg>
        </div>
      </div>
      
      <div className="mt-5 space-y-1 cursor-pointer" onClick={handleNavigate}>
        <div className="flex justify-between items-baseline">
          <p className="text-[8px] uppercase tracking-[0.3em] text-slate-300 font-black">{product.category}</p>
          <p className="text-xs font-black text-[#2C3468] tabular-nums tracking-tighter">${product.price.toFixed(2)}</p>
        </div>
        <h3 className="text-[11px] font-bold text-slate-800 leading-tight uppercase tracking-wide truncate">
          {product.title}
        </h3>
      </div>
    </div>
  );
};

export default ProductCard;
