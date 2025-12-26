
import React from 'react';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS } from '../constants';

const ReadyToWear: React.FC = () => {
  const products = SAMPLE_PRODUCTS.filter(p => p.category !== 'Bespoke' && p.category !== 'Accessories');
  
  return (
    <div className="bg-white">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1594932224030-9455144cced3?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Ready to Wear"
        />
        <div className="relative z-10 text-center text-white space-y-4 px-4">
          <h1 className="text-5xl md:text-7xl font-serif italic">Ready to Wear</h1>
          <p className="text-xs uppercase tracking-[0.5em] font-medium opacity-80">The Permanent Collection</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="text-3xl font-serif italic text-[#2C3468]">Precision in Every Stitch</h2>
        <p className="text-slate-500 font-light leading-relaxed text-lg">
          Our ready-to-wear collection brings the uncompromising quality of bespoke tailoring to an accessible format, designed for the modern lifestyle and enduring elegance.
        </p>
      </div>

      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReadyToWear;
