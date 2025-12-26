
import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS } from '../constants';
import { Category } from '../types';

interface ShopProps {
  saleOnly?: boolean;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
}

const Shop: React.FC<ShopProps> = ({ 
  saleOnly, 
  heroTitle = "Ready to Wear", 
  heroSubtitle = "The Permanent Collection", 
  heroImage = "https://images.unsplash.com/photo-1594932224030-9455144cced3?q=80&w=2070&auto=format&fit=crop"
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [priceRange, setPriceRange] = useState<number>(1500);

  // Initial base filtering (Sale vs All)
  const baseProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter(p => {
      const isSale = p.price < 150 || p.title.toLowerCase().includes('archive');
      const isBespoke = p.category === 'Bespoke';
      // Hide bespoke from shop/sale unless specifically requested
      if (isBespoke) return false;
      return saleOnly ? isSale : !isSale;
    });
  }, [saleOnly]);

  // Dynamically get available categories from the base set
  const availableCategories = useMemo(() => {
    const cats = Array.from(new Set(baseProducts.map(p => p.category)));
    return ['All', ...cats.sort()] as (Category | 'All')[];
  }, [baseProducts]);

  // Full derived filtering
  const filteredProducts = useMemo(() => {
    return baseProducts.filter(product => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        product.title.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesPrice = product.price <= priceRange;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [baseProducts, searchQuery, activeCategory, priceRange]);

  const hasActiveFilters = searchQuery !== '' || activeCategory !== 'All' || priceRange < 1500;

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setPriceRange(1500);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <img 
          src={heroImage} 
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale-[0.5]"
          alt={heroTitle}
        />
        <div className="relative z-10 text-center text-white space-y-4 px-4">
          <h1 className="text-5xl md:text-7xl font-serif italic animate-fadeIn">{heroTitle}</h1>
          <p className="text-xs uppercase tracking-[0.5em] font-medium opacity-80 animate-fadeIn" style={{ animationDelay: '200ms' }}>{heroSubtitle}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        {/* Search Bar Mobile/Desktop */}
        <div className="mb-16">
          <div className="relative border-b border-slate-200 py-4 max-w-2xl mx-auto group">
            <input 
              type="text" 
              placeholder="Search by collection, fabric or style..." 
              className="w-full bg-transparent focus:outline-none text-xl font-light placeholder:italic placeholder:opacity-30 text-[#2C3468]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-4">
               {searchQuery && (
                 <button onClick={() => setSearchQuery('')} className="text-slate-300 hover:text-red-500 transition-colors">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                 </button>
               )}
               <svg className="w-6 h-6 text-[#2C3468] opacity-20 group-focus-within:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-12 flex-shrink-0">
            {/* Reset Button */}
            <div className={`transition-all duration-500 overflow-hidden ${hasActiveFilters ? 'max-h-20 opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
              <button 
                onClick={resetFilters}
                className="w-full py-3 border border-red-100 text-red-600 text-[10px] uppercase font-black tracking-widest hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                Clear All Filters
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-[#2C3468] border-b border-slate-100 pb-4">Category</h3>
              <div className="flex flex-col gap-4">
                {availableCategories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left text-xs uppercase tracking-[0.1em] transition-all relative group
                      ${activeCategory === cat ? 'text-[#2C3468] font-bold' : 'text-slate-400 hover:text-slate-900'}`}
                  >
                    {cat}
                    {activeCategory === cat && <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#2C3468] rounded-full"></span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-6 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-[#2C3468]">Max Price</h3>
                <span className="text-xs font-bold text-[#2C3468]">${priceRange}</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="1500" 
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2C3468]"
              />
              <div className="flex justify-between text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                <span>$20</span>
                <span>$1500</span>
              </div>
            </div>

            {/* Assistance */}
            <div className="p-8 bg-slate-50 rounded-sm space-y-4 mt-12 border border-slate-100">
              <h4 className="text-[10px] uppercase font-black tracking-widest text-[#2C3468]">Need Assistance?</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                Our consultants are available on WhatsApp to guide your selection.
              </p>
              <a href="https://wa.me/923142278722" className="block text-[10px] uppercase font-bold text-[#2C3468] underline underline-offset-4 hover:opacity-70 transition-opacity">Contact Concierge</a>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map((product, idx) => (
                  <div key={product.id} className="animate-fadeIn" style={{ animationDelay: `${idx * 50}ms` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 text-center animate-fadeIn">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100">
                  <svg className="w-8 h-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <h3 className="text-2xl font-serif text-slate-800 mb-2 italic">No pieces found</h3>
                <p className="text-slate-400 text-sm font-light max-w-xs mx-auto">Try refining your filters or search terms.</p>
                <button 
                  onClick={resetFilters}
                  className="mt-8 px-10 py-4 bg-[#2C3468] text-white text-[10px] uppercase font-bold tracking-[0.2em] hover:opacity-90 transition-all shadow-xl"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
