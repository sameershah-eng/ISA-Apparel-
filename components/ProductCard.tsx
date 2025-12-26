
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group animate-fadeIn">
      <a href={`#/product/${product.slug}`} className="block overflow-hidden relative aspect-[3/4] bg-slate-100 rounded-sm">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        {product.stock < 5 && (
            <div className="absolute top-4 left-4 bg-white px-2 py-1 text-[10px] uppercase tracking-tighter font-bold shadow-sm">
                Limited Stock
            </div>
        )}
      </a>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{product.category}</p>
          <h3 className="mt-1 text-sm font-medium text-slate-800">
            <a href={`#/product/${product.slug}`} className="hover:underline underline-offset-4">{product.title}</a>
          </h3>
        </div>
        <p className="font-semibold text-slate-900">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
