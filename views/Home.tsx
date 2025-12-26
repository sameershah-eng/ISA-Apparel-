
import React, { useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS } from '../constants';

const CategoryTile: React.FC<{ title: string; image: string; href?: string; className?: string }> = ({ title, image, href = "#/shop", className }) => (
  <a href={href} className={`relative overflow-hidden group ${className} animate-fadeIn`}>
    <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center transform transition-transform duration-500 group-hover:scale-110">
        <span className="text-white text-sm md:text-xl font-bold uppercase tracking-[0.4em] border-b border-white/0 group-hover:border-white/100 transition-all pb-1">{title}</span>
      </div>
    </div>
  </a>
);

const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* 1. Hero Campaign Banner */}
      <section className="relative h-[90vh] w-full bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 scale-105 animate-[pulse_10s_ease-in-out_infinite]">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            alt="Campaign" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4 z-10">
          <div className="animate-fadeIn space-y-6">
             <span className="text-xs uppercase tracking-[0.6em] mb-4 block font-medium opacity-80">Autumn / Winter 2024</span>
             <h1 className="text-6xl md:text-9xl font-serif mb-2 italic leading-tight">Sartorial<br/>Excellence</h1>
             <p className="text-lg md:text-xl tracking-[0.2em] font-light max-w-xl mx-auto opacity-90">Precision cut trousers from the world's finest mills.</p>
             <div className="pt-8">
               <a href="#/shop" className="inline-block border border-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 transform hover:-translate-y-1">
                  Explore Collection
               </a>
             </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7-7-7" /></svg>
        </div>
      </section>

      {/* 2. New Arrivals Split Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-slate-100">
        <div className="bg-white p-12 md:p-32 flex flex-col justify-center items-start space-y-8 animate-fadeIn">
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-[0.5em] font-black text-[#2C3468]">The New Standard</h2>
            <h3 className="text-4xl md:text-5xl font-serif italic text-slate-800">Masterfully Crafted</h3>
          </div>
          <p className="text-base text-slate-500 font-light leading-relaxed max-w-md">
            Our latest collection redefines the modern silhouette. Combining traditional Italian tailoring techniques with contemporary functional design.
          </p>
          <a href="#/shop" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#2C3468]">
            <span className="border-b border-[#2C3468]/20 group-hover:border-[#2C3468] transition-all pb-1">Shop New Arrivals</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
        <div className="h-[70vh] md:h-auto overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1594932224030-9455144cced3?q=80&w=2070&auto=format&fit=crop" 
            alt="New Arrivals" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </div>
      </section>

      {/* 3. Category Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-screen md:h-[80vh]">
        <CategoryTile title="Dress Pants" image="https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=2070&auto=format&fit=crop" href="#/shop" />
        <CategoryTile title="Active Waist" image="https://images.unsplash.com/photo-1624372927050-12484ec669b2?q=80&w=2070&auto=format&fit=crop" href="#/shop" />
        <CategoryTile title="Cotton Chinos" image="https://images.unsplash.com/photo-1473966968600-fa804b86d30b?q=80&w=2070&auto=format&fit=crop" href="#/shop" />
        <CategoryTile title="Tailoring" image="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=2070&auto=format&fit=crop" href="#/tailoring" />
      </section>

      {/* 4. Product Showcase (The Collection) */}
      <section className="max-w-7xl mx-auto px-4 py-32 w-full">
         <div className="flex flex-col items-center text-center mb-20 space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] font-bold text-[#2C3468]">Curated Selection</span>
            <h2 className="text-5xl font-serif italic">Essentials for the Modern Wardrobe</h2>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {SAMPLE_PRODUCTS.slice(0, 4).map((product, idx) => (
                <div key={product.id} className="animate-fadeIn" style={{ animationDelay: `${idx * 150}ms` }}>
                  <ProductCard product={product} />
                </div>
            ))}
         </div>
         <div className="flex justify-center mt-20">
            <a href="#/shop" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#2C3468] transition-colors border-b border-slate-200 hover:border-[#2C3468] pb-1">View Entire Archive</a>
         </div>
      </section>

      {/* 5. Brand Identity Section */}
      <section className="relative h-[70vh] bg-[#2C3468] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center text-white space-y-8 animate-fadeIn px-6">
             <div className="w-20 h-20 border border-white/30 mx-auto flex items-center justify-center">
                <span className="text-3xl font-serif italic">I</span>
             </div>
             <h2 className="text-4xl md:text-7xl font-light uppercase tracking-[0.3em]">ISA BESPOKE</h2>
             <p className="text-xs md:text-sm uppercase tracking-[0.5em] opacity-70">Handcrafted Excellence Since 2024</p>
        </div>
      </section>

      {/* 6. Lifestyle / Visit Us Section */}
      <section className="bg-slate-50 py-32">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative group animate-fadeIn">
                <div className="absolute -inset-4 border border-[#2C3468]/10 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
                <img 
                  src="https://images.unsplash.com/photo-1517544845501-bb7810f64d76?q=80&w=2032&auto=format&fit=crop" 
                  alt="Flagship Boutique" 
                  className="relative w-full h-[60vh] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
            </div>
            <div className="space-y-8 animate-fadeIn">
                <div className="w-16 h-1 bg-[#2C3468]"></div>
                <h2 className="text-5xl font-serif leading-tight">Visit the ISA<br/>Flagship Boutique</h2>
                <p className="text-lg text-slate-500 font-light leading-relaxed">
                  Experience our full collection in person. Our atelier offers complimentary measurements and personalized style consultations with our master tailors.
                </p>
                <div className="grid grid-cols-2 gap-8 py-4">
                  <div>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-900 mb-2">Location</h4>
                    <p className="text-sm text-slate-500 font-light">Madison Avenue, 4th Floor<br/>New York, NY 10022</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-900 mb-2">Hours</h4>
                    <p className="text-sm text-slate-500 font-light">Mon - Sat: 10am - 7pm<br/>Sun: 12pm - 5pm</p>
                  </div>
                </div>
                <a href="https://wa.me/923142278722" target="_blank" className="inline-block bg-[#2C3468] text-white px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-[#1a2145] transition-all transform active:scale-95 shadow-xl">
                    Book an Appointment
                </a>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
