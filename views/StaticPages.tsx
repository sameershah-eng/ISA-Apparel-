
import React from 'react';
import ProductCard from '../components/ProductCard';
// Fix: Added Logo to the imports from constants
import { SAMPLE_PRODUCTS, Logo } from '../constants';

const PageHero: React.FC<{ title: string; subtitle: string; image: string; align?: 'center' | 'left' }> = ({ title, subtitle, image, align = 'center' }) => (
  <section className="relative h-[60vh] flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src={image} className="w-full h-full object-cover brightness-[0.5] scale-105" alt={title} />
    </div>
    <div className={`relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 space-y-6 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <div className={`space-y-4 animate-fadeIn`}>
        <p className="text-xs md:text-sm uppercase tracking-[0.5em] font-medium text-white/80">{subtitle}</p>
        <h1 className="text-5xl md:text-8xl font-serif italic text-white leading-tight">{title}</h1>
      </div>
    </div>
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
       <div className="w-[1px] h-12 bg-white/30"></div>
    </div>
  </section>
);

const SectionIntro: React.FC<{ title: string; subtitle: string; body: string }> = ({ title, subtitle, body }) => (
  <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-8 animate-fadeIn">
    <div className="flex flex-col items-center gap-4">
      <span className="text-[10px] uppercase font-black tracking-[0.4em] text-[#2C3468]">{subtitle}</span>
      <h2 className="text-4xl md:text-5xl font-serif italic text-[#2C3468] leading-tight">{title}</h2>
    </div>
    <p className="text-slate-500 font-light leading-loose text-lg italic max-w-2xl mx-auto">
      "{body}"
    </p>
    <div className="w-20 h-px bg-[#2C3468]/20 mx-auto"></div>
  </div>
);

const ProductGrid: React.FC<{ products: typeof SAMPLE_PRODUCTS; emptyMessage?: string }> = ({ products, emptyMessage }) => (
  <section className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
    {products.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
        {products.map((product, idx) => (
          <div key={product.id} className="animate-fadeIn" style={{ animationDelay: `${idx * 100}ms` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    ) : (
      <div className="py-32 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
        </div>
        <p className="text-slate-400 font-light italic">{emptyMessage || "No exceptional pieces found in this archive."}</p>
      </div>
    )}
  </section>
);

export const ReadyToWear: React.FC = () => {
  const products = SAMPLE_PRODUCTS.filter(p => p.category !== 'Bespoke' && p.category !== 'Accessories');
  return (
    <div className="bg-white">
      <PageHero 
        title="Ready to Wear" 
        subtitle="The Permanent Collection" 
        image="https://images.unsplash.com/photo-1594932224030-9455144cced3?q=80&w=2070&auto=format&fit=crop" 
      />
      <SectionIntro 
        subtitle="Sartorial Utility"
        title="Precision in Every Stitch" 
        body="Our ready-to-wear collection brings the uncompromising quality of bespoke tailoring to an accessible format, designed for the modern lifestyle and enduring elegance." 
      />
      <ProductGrid products={products} />
    </div>
  );
};

export const Fabrics: React.FC = () => {
  const fabricProducts = SAMPLE_PRODUCTS.filter(p => ['Dress Pant', 'Cotton Pant', 'Chino Pant'].includes(p.category));
  return (
    <div className="bg-white min-h-screen">
      <PageHero 
        title="Fabric Archive" 
        subtitle="The World's Finest Mills" 
        image="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2070&auto=format&fit=crop" 
        align="left"
      />
      <SectionIntro 
        subtitle="Textile Excellence"
        title="Tactile Heritage" 
        body="From Vitale Barberis Canonico wool to rare Sea Island cotton, our fabrics are selected for their distinct character, durability, and the way they move with the body." 
      />
      
      {/* Editorial Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100 max-w-7xl mx-auto mb-32">
        <div className="bg-white p-12 md:p-20 space-y-6">
          <h4 className="text-2xl font-serif italic text-[#2C3468]">Super 130s Merino</h4>
          <p className="text-sm text-slate-500 font-light leading-relaxed">
            Sourced exclusively from the Biella region of Italy, our Merino wool is selected for its high crimp and long staple length, resulting in a cloth that is naturally wrinkle-resistant and incredibly soft.
          </p>
        </div>
        <div className="bg-white aspect-video md:aspect-auto overflow-hidden">
          <img src="https://images.unsplash.com/photo-1558223108-630df9014387?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Wool" />
        </div>
        <div className="bg-white aspect-video md:aspect-auto overflow-hidden md:order-4">
          <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Cotton" />
        </div>
        <div className="bg-white p-12 md:p-20 space-y-6 md:order-3">
          <h4 className="text-2xl font-serif italic text-[#2C3468]">Double-Brushed Twill</h4>
          <p className="text-sm text-slate-500 font-light leading-relaxed">
            Our signature chino fabric undergoes a double-brushing process on both sides of the cloth, creating a peach-fuzz texture that feels broken-in from the first wear.
          </p>
        </div>
      </div>

      <div className="text-center mb-16">
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-300">Explore the Selection</h3>
      </div>
      <ProductGrid products={fabricProducts} />
    </div>
  );
};

export const Tailoring: React.FC = () => {
  const bespokeProducts = SAMPLE_PRODUCTS.filter(p => p.category === 'Bespoke' || (p.category === 'Dress Pant' && p.price > 240));
  return (
    <div className="bg-white min-h-screen">
      <PageHero 
        title="Atelier Services" 
        subtitle="The Architecture of the Human Form" 
        image="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop" 
      />
      <SectionIntro 
        subtitle="Bespoke Excellence"
        title="Personalized Perfection" 
        body="Every body is unique. Our tailoring services combine heritage techniques with modern 3D scanning to create a silhouette that is truly yours—balancing comfort with sharp geometry." 
      />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 bg-[#2C3468] text-white mb-32 rounded-sm overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Logo className="scale-[5] rotate-[-15deg] absolute top-0 left-0" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center relative z-10">
          <div className="space-y-6">
            <span className="text-5xl font-serif italic opacity-30 block">01</span>
            <h5 className="font-bold text-xs uppercase tracking-[0.3em]">Consultation</h5>
            <p className="text-sm text-white/70 font-light max-w-[240px] mx-auto">Discuss your needs with our master tailor and select from over 2,000 seasonal fabric swatches.</p>
          </div>
          <div className="space-y-6">
            <span className="text-5xl font-serif italic opacity-30 block">02</span>
            <h5 className="font-bold text-xs uppercase tracking-[0.3em]">Measurement</h5>
            <p className="text-sm text-white/70 font-light max-w-[240px] mx-auto">Traditional 42-point hand measurements supplemented by laser precision 3D scanning.</p>
          </div>
          <div className="space-y-6">
            <span className="text-5xl font-serif italic opacity-30 block">03</span>
            <h5 className="font-bold text-xs uppercase tracking-[0.3em]">Master Drafting</h5>
            <p className="text-sm text-white/70 font-light max-w-[240px] mx-auto">A unique paper pattern is drafted specifically for you, archived for all your future orders.</p>
          </div>
        </div>
      </div>
      <ProductGrid products={bespokeProducts} />
    </div>
  );
};

export const Accessories: React.FC = () => {
  const accessories = SAMPLE_PRODUCTS.filter(p => p.category === 'Accessories');
  return (
    <div className="bg-white min-h-screen">
      <PageHero 
        title="Accessories" 
        subtitle="The Final Touches" 
        image="https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=2070&auto=format&fit=crop" 
      />
      <SectionIntro 
        subtitle="The Detail Library"
        title="Subtle Distinction" 
        body="Handcrafted leather belts, refined silk squares, and premium hosiery designed to complement the ISA silhouette with understated elegance and functional longevity." 
      />
      <ProductGrid products={accessories} />
    </div>
  );
};

export const Sale: React.FC = () => {
  const saleProducts = SAMPLE_PRODUCTS.filter(p => p.price < 150 || p.title.toLowerCase().includes('archive'));
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-red-50/50 py-32 text-center border-b border-red-100 flex flex-col items-center gap-6">
        <span className="text-[10px] uppercase font-black tracking-[0.6em] text-red-600 block">Seasonal Archive Event</span>
        <h1 className="text-5xl md:text-8xl font-serif italic text-[#2C3468]">ISA Archive</h1>
        <p className="text-slate-500 max-w-xl mx-auto font-light italic px-4 text-lg">
          "A final opportunity to acquire signature ISA silhouettes and heritage fabrics from previous seasons at exceptional value."
        </p>
        <div className="w-16 h-[1px] bg-red-200 mt-4"></div>
      </div>
      <div className="pt-24">
        <ProductGrid 
          products={saleProducts} 
          emptyMessage="The archive event has concluded. Please subscribe to our newsletter for early access to the next session." 
        />
      </div>
    </div>
  );
};
