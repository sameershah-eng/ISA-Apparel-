
import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Category, Product } from '../types';

interface ShopProps {
  products: Product[];
  saleOnly?: boolean;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
}

const PRODUCTS_PER_PAGE = 12;

const Shop: React.FC<ShopProps> = ({ 
  products,
  saleOnly, 
  heroTitle = "Ready to Wear", 
  heroSubtitle = "The Permanent Collection", 
  heroImage = "https://images.unsplash.com/photo-1594932224030-9455144cced3?q=80&w=2070&auto=format&fit=crop"
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [priceRange, setPriceRange] = useState<number>(1500);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  // Reset visibility when filters change
  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, [searchQuery, activeCategory, priceRange]);

  const baseProducts = useMemo(() => {
    return products.filter(p => {
      const isSale = p.price < 250 || p.title.toLowerCase().includes('sale');
      const isBespoke = p.category === 'Bespoke';
      if (isBespoke && !saleOnly) return false;
      return saleOnly ? isSale : !isSale;
    });
  }, [products, saleOnly]);

  const availableCategories = useMemo(() => {
    const cats = Array.from(new Set(baseProducts.map(p => p.category)));
    return ['All', ...cats.sort()] as (Category | 'All')[];
  }, [baseProducts]);

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

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const hasActiveFilters = searchQuery !== '' || activeCategory !== 'All' || priceRange < 1500;

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setPriceRange(1500);
  };

  return (
    <div className="bg-white">
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
        <div className="mb-16">
          <div className="relative border-b border-slate-200 py-4 max-w-2xl mx-auto group">
            <input 
              type="text" 
              placeholder="Search 100+ articles in the archive..." 
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
          <aside className="w-full lg:w-64 space-y-12 flex-shrink-0">
            <div className={`transition-all duration-500 overflow-hidden ${hasActiveFilters ? 'max-h-20 opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
              <button 
                onClick={resetFilters}
                className="w-full py-3 border border-red-100 text-red-600 text-[10px] uppercase font-black tracking-widest hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                Clear {filteredProducts.length} Results
              </button>
            </div>

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

            <div className="space-y-6 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-[#2C3468]">Max Price</h3>
                <span className="text-xs font-bold text-[#2C3468]">${priceRange}</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="1500" 
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2C3468]"
              />
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-10 flex justify-between items-center text-[10px] uppercase tracking-widest text-slate-400 font-bold">
               <span>Showing {displayedProducts.length} of {filteredProducts.length} items</span>
               <div className="flex items-center gap-2">
                 <span>Sort:</span>
                 <select className="bg-transparent text-[#2C3468] focus:outline-none cursor-pointer">
                    <option>Latest Arrivals</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                 </select>
               </div>
            </div>

            {displayedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {displayedProducts.map((product, idx) => (
                    <div key={product.id} className="animate-fadeIn" style={{ animationDelay: `${(idx % 6) * 100}ms` }}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                
                {hasMore && (
                  <div className="mt-24 flex flex-col items-center space-y-8">
                    <div className="w-full h-px bg-slate-100 relative">
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-8">
                         <span className="text-[10px] uppercase tracking-[0.4em] text-slate-300 font-bold">You've viewed {displayedProducts.length} of {filteredProducts.length}</span>
                       </div>
                    </div>
                    <button 
                      onClick={() => setVisibleCount(prev => prev + PRODUCTS_PER_PAGE)}
                      className="px-16 py-5 border border-[#2C3468] text-[#2C3468] text-[10px] uppercase font-black tracking-[0.3em] hover:bg-[#2C3468] hover:text-white transition-all duration-500 shadow-xl transform active:scale-[0.98]"
                    >
                      Load More Articles
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 text-center animate-fadeIn">
                <h3 className="text-2xl font-serif text-slate-800 mb-2 italic">No articles match your criteria</h3>
                <button onClick={resetFilters} className="mt-8 px-10 py-4 bg-[#2C3468] text-white text-[10px] uppercase font-bold tracking-[0.2em]">Reset Selection</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
