
import React from 'react';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS } from '../constants';

const CategoryTile: React.FC<{ title: string; image: string; className?: string }> = ({ title, image, className }) => (
  <a href="#/shop" className={`relative overflow-hidden group ${className}`}>
    <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center w-full px-4">
      <span className="text-white text-sm md:text-lg font-bold uppercase tracking-[0.2em]">{title}</span>
    </div>
  </a>
);

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Sale Banner */}
      <section className="relative h-[85vh] w-full bg-[#1a3a2a] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="Campaign" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <div className="border border-white/40 p-12 backdrop-blur-sm bg-black/5">
             <span className="text-xs uppercase tracking-[0.5em] mb-4 block font-light">Season Finale</span>
             <h1 className="text-5xl md:text-8xl font-serif mb-2 italic">SALE</h1>
             <p className="text-2xl md:text-4xl tracking-[0.3em] font-bold">UPTO 70% OFF</p>
             <a href="#/shop" className="mt-8 inline-block bg-white text-black px-10 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                Shop Now
             </a>
          </div>
          <p className="absolute bottom-8 text-[10px] uppercase tracking-widest opacity-60">Selected Items Only*</p>
        </div>
      </section>

      {/* 2. New Arrivals Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="bg-[#f8f8f8] p-12 md:p-24 flex flex-col justify-center items-start space-y-6">
          <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-[#2C3468]">New Arrivals</h2>
          <p className="text-sm text-slate-500 font-light leading-relaxed max-w-sm">
            Discover the latest additions to our premium collection. Tailored for comfort and styled for elegance.
          </p>
          <a href="#/shop" className="px-10 py-4 bg-[#2C3468] text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
            Discover Now
          </a>
        </div>
        <div className="h-[60vh] md:h-auto overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1594932224030-9455144cced3?q=80&w=2070&auto=format&fit=crop" 
            alt="New Arrivals" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 3. Category Tiles Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 h-[50vh] md:h-[70vh]">
        <CategoryTile 
          title="Ready to Wear" 
          image="https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=2070&auto=format&fit=crop" 
        />
        <CategoryTile 
          title="Premium Fabric" 
          image="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2070&auto=format&fit=crop" 
        />
        <CategoryTile 
          title="Bespoke" 
          image="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=2070&auto=format&fit=crop" 
        />
        <CategoryTile 
          title="Signature" 
          image="https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=2070&auto=format&fit=crop" 
        />
      </section>

      {/* 4. The "Bloom" Style Banner */}
      <section className="relative h-[80vh] flex flex-col md:flex-row bg-white overflow-hidden border-y border-slate-100">
        <div className="w-full md:w-1/2 overflow-hidden h-full">
            <img 
              src="https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=1974&auto=format&fit=crop" 
              className="w-full h-full object-cover"
            />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-12 md:p-24 space-y-4">
            <h2 className="text-7xl md:text-9xl font-serif text-[#2C3468] lowercase italic tracking-tighter">bloom</h2>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400">Contemporary Menswear</p>
        </div>
      </section>

      {/* 5. Second Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-0">
         <CategoryTile title="Trousers" image="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=2070&auto=format&fit=crop" className="aspect-[3/4]" />
         <CategoryTile title="Fragrance" image="https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=2070&auto=format&fit=crop" className="aspect-[3/4]" />
         <CategoryTile title="Waistcoats" image="https://images.unsplash.com/photo-1592844220224-82a17950c00b?q=80&w=1974&auto=format&fit=crop" className="aspect-[3/4]" />
         <CategoryTile title="Accessories" image="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop" className="aspect-[3/4]" />
      </section>

      {/* 6. Brand Highlight (Cavalier Style) */}
      <section className="bg-slate-900 h-[60vh] relative overflow-hidden flex items-center justify-center">
        <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative text-center text-white space-y-4">
             <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 border-2 border-white/40 flex items-center justify-center font-serif text-2xl italic">I</div>
             </div>
             <h2 className="text-4xl md:text-6xl uppercase tracking-[0.2em] font-light">ISA BESPOKE</h2>
             <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-60">Handcrafted Excellence</p>
        </div>
      </section>

      {/* 7. Product Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 py-24 w-full">
         <div className="flex flex-col items-center mb-16">
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-[#2C3468] mb-4">Latest Additions</span>
            <h2 className="text-4xl font-serif">The Collection</h2>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SAMPLE_PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
         </div>
      </section>

      {/* 8. Visit Us Today Section */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1517544845501-bb7810f64d76?q=80&w=2032&auto=format&fit=crop" 
                  alt="Store front" 
                  className="w-full h-[50vh] object-cover grayscale brightness-75 shadow-2xl"
                />
            </div>
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                <div className="flex justify-center md:justify-start">
                    <div className="w-12 h-1 border-t-2 border-[#2C3468]"></div>
                </div>
                <h2 className="text-4xl font-serif uppercase tracking-tight">Visit Us Today</h2>
                <div className="space-y-4 text-slate-500 font-light">
                    <p className="text-sm">Experience the ISA difference in person. Our flagship boutique offers private fitting sessions and fabric consultations.</p>
                    <div>
                        <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">Contact</p>
                        <p className="text-sm mt-1">+1 234 567 8900 | concierge@isa-apparel.com</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">Flagship Store</p>
                        <p className="text-sm mt-1">Madison Avenue, 4th Floor, Suite 102<br/>New York, NY 10022</p>
                    </div>
                </div>
                <button className="px-10 py-4 border-2 border-[#2C3468] text-[#2C3468] text-[10px] font-bold uppercase tracking-widest hover:bg-[#2C3468] hover:text-white transition-all">
                    Book an Appointment
                </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
