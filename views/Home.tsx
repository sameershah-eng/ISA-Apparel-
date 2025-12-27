
import React, { useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface HomeProps {
  products: Product[];
}

const CategoryTile: React.FC<{ title: string; image: string; href?: string; className?: string }> = ({ title, image, href = "#/shop", className }) => (
  <a href={href} className={`relative overflow-hidden group ${className} reveal h-full min-h-[45vh] md:min-h-0`}>
    <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 grayscale group-hover:grayscale-0" />
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center transform transition-transform duration-700 group-hover:scale-110">
        <span className="text-white text-lg md:text-xl font-bold uppercase tracking-[0.5em] border-b border-white/0 group-hover:border-white/100 transition-all pb-2">{title}</span>
      </div>
    </div>
  </a>
);

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* 1. Hero Campaign Banner */}
      <section className="relative h-[85vh] md:h-[100vh] w-full bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 scale-105 animate-[pulse_15s_ease-in-out_infinite]">
          <img 
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2070&auto=format&fit=crop" 
            alt="ISA Campaign" 
            className="w-full h-full object-cover opacity-60 grayscale-[0.5]"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 z-10">
          <div className="animate-fadeIn space-y-6 md:space-y-8">
             <span className="text-[9px] md:text-[10px] uppercase tracking-[0.6em] mb-4 block font-black opacity-60">Collection Archive 2025</span>
             <h1 className="text-5xl md:text-[10rem] font-serif mb-4 italic leading-none tracking-tighter">Sartorial<br/>Grace</h1>
             <p className="text-[10px] md:text-sm tracking-[0.4em] font-black max-w-sm md:max-w-xl mx-auto opacity-70 uppercase">Engineered for the discerning few.</p>
             <div className="pt-10 md:pt-14">
               <a href="#/shop" className="inline-block border border-white/30 backdrop-blur-sm px-10 md:px-16 py-4 md:py-5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-700 transform hover:-translate-y-2 shadow-2xl">
                  Inscribe Order
               </a>
             </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7-7-7" /></svg>
        </div>
      </section>

      {/* 2. New Arrivals Split Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-slate-50 reveal">
        <div className="bg-white p-12 md:p-40 flex flex-col justify-center items-start space-y-8 md:space-y-12">
          <div className="space-y-4">
            <h2 className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-black text-[#2C3468] opacity-40">The Italian Merino</h2>
            <h3 className="text-4xl md:text-7xl font-serif italic text-slate-800 leading-tight">Masterfully<br/>Forged</h3>
          </div>
          <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-md uppercase tracking-widest opacity-80">
            Sourced from the historic Biella mills, our wool trousers define the apex of modern tailoring.
          </p>
          <a href="#/shop" className="group flex items-center gap-6 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[#2C3468]">
            <span className="border-b border-[#2C3468]/10 group-hover:border-[#2C3468] transition-all pb-2">View Collections</span>
            <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
        <div className="h-[50vh] md:h-auto overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=2070&auto=format&fit=crop" 
            alt="Trouser Detail" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms] group-hover:scale-110"
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
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-40 w-full reveal">
         <div className="flex flex-col items-center text-center mb-16 md:mb-28 space-y-4">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-black text-[#2C3468] opacity-30">The Permanent Library</span>
            <h2 className="text-4xl md:text-7xl font-serif italic">Archive Essentials</h2>
         </div>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-16 md:gap-y-24">
            {products.slice(0, 4).map((product, idx) => (
                <div key={product.id} className="reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
                  <ProductCard product={product} />
                </div>
            ))}
         </div>
      </section>

      {/* 5. Brand Identity Section */}
      <section className="relative h-[60vh] md:h-[85vh] bg-black flex items-center justify-center overflow-hidden reveal">
        <div className="absolute inset-0 opacity-40">
           <img src="https://images.unsplash.com/photo-1558223108-630df9014387?q=80&w=2071&auto=format&fit=crop" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="relative z-10 text-center text-white space-y-8 px-6">
             <div className="w-20 h-20 md:w-28 md:h-28 border border-white/20 mx-auto flex items-center justify-center backdrop-blur-md">
                <span className="text-3xl md:text-5xl font-serif italic opacity-80">I</span>
             </div>
             <h2 className="text-3xl md:text-9xl font-light uppercase tracking-[0.4em] leading-none opacity-90">ISA ATELIER</h2>
             <p className="text-[9px] md:text-xs uppercase tracking-[0.6em] opacity-40 font-black">Handcrafted Excellence Since 2024</p>
        </div>
      </section>
    </div>
  );
};

export default Home;