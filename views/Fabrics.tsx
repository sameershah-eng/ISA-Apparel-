
import React from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface FabricsProps {
  products: Product[];
}

const Fabrics: React.FC<FabricsProps> = ({ products }) => {
  // Use products from props to handle dynamic Supabase data
  const fabricProducts = products.filter(p => ['Dress Pant', 'Cotton Pant', 'Chino Pant'].includes(p.category));

  return (
    <div className="bg-white min-h-screen">
      <section className="relative h-[50vh] flex items-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
          alt="Fabrics"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-white space-y-6">
          <p className="text-xs uppercase tracking-[0.5em] font-medium opacity-80">Sourced from the World's Finest Mills</p>
          <h1 className="text-6xl md:text-8xl font-serif italic leading-tight">The Fabric Archive</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="w-16 h-1 bg-[#2C3468]"></div>
          <h2 className="text-4xl font-serif italic text-[#2C3468]">Tactile Heritage</h2>
          <p className="text-slate-500 font-light leading-loose text-lg italic">
            "From Vitale Barberis Canonico wool to rare Sea Island cotton, our fabrics are selected for their distinct character, durability, and the way they move with the body."
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1558223108-630df9014387?q=80&w=800&auto=format&fit=crop" className="aspect-square object-cover rounded-sm grayscale" alt="Wool" />
          <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop" className="aspect-square object-cover rounded-sm grayscale mt-8" alt="Cotton" />
        </div>
      </div>

      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-center text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 mb-16">Explore the Selection</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {fabricProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fabrics;
