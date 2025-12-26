
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group">
      <a href={`#/product/${product.slug}`} className="block relative overflow-hidden aspect-[3/4] bg-slate-100 rounded-sm">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-[#2C3468]/0 group-hover:bg-[#2C3468]/5 transition-colors duration-500" />
        
        {product.images[1] && (
          <img 
            src={product.images[1]} 
            alt={product.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
          />
        )}

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.stock < 5 && (
              <div className="bg-white px-2 py-1 text-[9px] uppercase tracking-widest font-black shadow-sm text-red-600">Limited Availability</div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="w-full bg-white text-[#2C3468] py-3 text-[10px] uppercase font-bold tracking-[0.2em] text-center shadow-xl">View Details</div>
        </div>
      </a>
      
      <div className="mt-6 space-y-1">
        <div className="flex justify-between items-baseline">
          <p className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-bold">{product.category}</p>
          <p className="text-sm font-bold text-slate-900 tabular-nums">${product.price.toFixed(2)}</p>
        </div>
        <h3 className="text-sm font-medium text-slate-800 leading-tight">
          <a href={`#/product/${product.slug}`} className="hover:text-[#2C3468] transition-colors">{product.title}</a>
        </h3>
      </div>
    </div>
  );
};

export default ProductCard;
