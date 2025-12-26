
import React from 'react';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS } from '../constants';

const Accessories: React.FC = () => {
  const accessories = SAMPLE_PRODUCTS.filter(p => p.category === 'Accessories');

  return (
    <div className="bg-white min-h-screen">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-slate-50">
        <img 
          src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 brightness-75"
          alt="Accessories"
        />
        <div className="relative z-10 text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-serif italic text-[#2C3468]">Accessories</h1>
          <p className="text-xs uppercase tracking-[0.5em] font-medium text-slate-400">The Defining Details</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
          {accessories.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accessories;
