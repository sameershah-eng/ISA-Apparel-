
import React from 'react';
import ProductCard from '../components/ProductCard';
import { Logo } from '../constants';
import { Product } from '../types';

interface TailoringProps {
  products: Product[];
}

const Tailoring: React.FC<TailoringProps> = ({ products }) => {
  // Filter products from props based on Bespoke category
  const bespokeProducts = products.filter(p => p.category === 'Bespoke');

  return (
    <div className="bg-white min-h-screen">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-[#2C3468]">
        <div className="relative z-10 text-center text-white space-y-4">
          <h1 className="text-5xl md:text-7xl font-serif italic">Bespoke Tailoring</h1>
          <p className="text-xs uppercase tracking-[0.5em] font-medium opacity-70">The Architecture of the Human Form</p>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <Logo className="scale-[8] absolute -bottom-20 -right-20 rotate-[-15deg]" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-6">
            <span className="text-5xl font-serif italic text-[#2C3468]/20">01</span>
            <h3 className="font-bold text-xs uppercase tracking-widest text-[#2C3468]">Consultation</h3>
            <p className="text-sm text-slate-500 font-light">Select from over 2,000 seasonal fabric swatches and discuss style with our master tailor.</p>
          </div>
          <div className="space-y-6">
            <span className="text-5xl font-serif italic text-[#2C3468]/20">02</span>
            <h3 className="font-bold text-xs uppercase tracking-widest text-[#2C3468]">Measurement</h3>
            <p className="text-sm text-slate-500 font-light">Traditional 42-point hand measurements supplemented by laser precision 3D scanning.</p>
          </div>
          <div className="space-y-6">
            <span className="text-5xl font-serif italic text-[#2C3468]/20">03</span>
            <h3 className="font-bold text-xs uppercase tracking-widest text-[#2C3468]">Master Cut</h3>
            <p className="text-sm text-slate-500 font-light">A unique paper pattern is drafted specifically for you, archived for all your future orders.</p>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 pb-24">
        <h4 className="text-2xl font-serif italic text-[#2C3468] mb-12 border-b border-slate-100 pb-4">Atelier Services</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {bespokeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tailoring;
