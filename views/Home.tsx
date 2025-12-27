
import React, { useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface HomeProps {
  products: Product[];
}

const CategoryTile: React.FC<{ title: string; image: string; href?: string; className?: string }> = ({ title, image, href = "#/shop", className }) => (
  <a href={href} className={`relative overflow-hidden group ${className} animate-fadeIn h-full min-h-[40vh] md:min-h-0`}>
    <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center transform transition-transform duration-500 group-hover:scale-110">
        <span className="text-white text-lg md:text-xl font-bold uppercase tracking-[0.4em] border-b border-white/0 group-hover:border-white/100 transition-all pb-1">{title}</span>
      </div>
    </div>
  </a>
);

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* 1. Hero Campaign Banner */}
      <section className="relative h-[80vh] md:h-[90vh] w-full bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 scale-105 animate-[pulse_10s_ease-in-out_infinite]">
          <img 
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2070&auto=format&fit=crop" 
            alt="ISA Campaign" 
            className="w-full h-full object-cover opacity-70 grayscale-[0.3]"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 z-10">
          <div className="animate-fadeIn space-y-4 md:space-y-6">
             <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] md:tracking-[0.6em] mb-2 block font-medium opacity-80">Winter Collection 2024</span>
             <h1 className="text-5xl md:text-9xl font-serif mb-2 italic leading-tight">Quiet<br/>Luxury</h1>
             <p className="text-sm md:text-xl tracking-[0.1em] md:tracking-[0.2em] font-light max-w-sm md:max-w-xl mx-auto opacity-90">Engineered for the modern silhouette.</p>
             <div className="pt-6 md:pt-8">
               <a href="#/shop" className="inline-block border border-white px-8 md:px-12 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 transform hover:-translate-y-1">
                  Explore Collection
               </a>
             </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7-7-7" /></svg>
        </div>
      </section>

      {/* 2. New Arrivals Split Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-slate-100">
        <div className="bg-white p-10 md:p-32 flex flex-col justify-center items-start space-y-6 md:space-y-8 animate-fadeIn">
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-black text-[#2C3468]">The Biella Merino</h2>
            <h3 className="text-3xl md:text-5xl font-serif italic text-slate-800">Masterfully Cut</h3>
          </div>
          <p className="text-sm md:text-base text-slate-500 font-light leading-relaxed max-w-md">
            Sourced from the historic mills of Northern Italy, our wool trousers represent the pinnacle of sartorial engineering.
          </p>
          <a href="#/shop" className="group flex items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#2C3468]">
            <span className="border-b border-[#2C3468]/20 group-hover:border-[#2C3468] transition-all pb-1">Shop New Arrivals</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
        <div className="h-[40vh] md:h-auto overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=2070&auto=format&fit=crop" 
            alt="Trouser Detail" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </div>
      </section>

      {/* 3. Category Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <CategoryTile title="Formal" image="https://images.unsplash.com/photo-1594932224030-9455144cced3?q=80&w=2070&auto=format&fit=crop" href="#/shop" />
        <CategoryTile title="Travel" image="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=2070&auto=format&fit=crop" href="#/shop" />
        <CategoryTile title="Casual" image="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=2070&auto=format&fit=crop" href="#/shop" />
        <CategoryTile title="Tailoring" image="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop" href="#/tailoring" />
      </section>

      {/* 4. Product Showcase */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-32 w-full">
         <div className="flex flex-col items-center text-center mb-12 md:mb-20 space-y-3 md:space-y-4">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] font-bold text-[#2C3468]">The Collection</span>
            <h2 className="text-3xl md:text-5xl font-serif italic">Permanent Essentials</h2>
         </div>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16">
            {products.slice(0, 4).map((product, idx) => (
                <div key={product.id} className="animate-fadeIn" style={{ animationDelay: `${idx * 150}ms` }}>
                  <ProductCard product={product} />
                </div>
            ))}
         </div>
      </section>

      {/* 5. Brand Identity Section */}
      <section className="relative h-[50vh] md:h-[70vh] bg-[#2C3468] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <img src="https://images.unsplash.com/photo-1558223108-630df9014387?q=80&w=2071&auto=format&fit=crop" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center text-white space-y-6 md:space-y-8 animate-fadeIn px-6">
             <div className="w-16 h-16 md:w-20 md:h-20 border border-white/30 mx-auto flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-serif italic">I</span>
             </div>
             <h2 className="text-2xl md:text-7xl font-light uppercase tracking-[0.2em] md:tracking-[0.3em]">ISA ATELIER</h2>
             <p className="text-[9px] md:text-sm uppercase tracking-[0.4em] md:tracking-[0.5em] opacity-70 font-bold">Handcrafted Excellence Since 2024</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
