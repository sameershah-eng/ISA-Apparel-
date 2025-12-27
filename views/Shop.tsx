
import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface ShopProps {
  products: Product[];
  saleOnly?: boolean;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  externalSearch?: string;
  onSearchChange?: (q: string) => void;
  externalCategory?: string;
  onCategoryChange?: (c: string) => void;
}

const PRODUCTS_PER_PAGE = 12;

const Shop: React.FC<ShopProps> = ({ 
  products,
  saleOnly, 
  heroTitle = "Ready to Wear", 
  heroSubtitle = "The Permanent Collection", 
  heroImage = "https://images.unsplash.com/photo-1594932224030-9455144cced3?q=80&w=2070&auto=format&fit=crop",
  externalSearch = '',
  onSearchChange,
  externalCategory = 'All',
  onCategoryChange
}) => {
  const [internalSearch, setInternalSearch] = useState(externalSearch);
  const [internalCategory, setInternalCategory] = useState(externalCategory);
  const [priceRange, setPriceRange] = useState<number>(1500);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  useEffect(() => setInternalSearch(externalSearch), [externalSearch]);
  useEffect(() => setInternalCategory(externalCategory), [externalCategory]);

  const searchQuery = onSearchChange ? externalSearch : internalSearch;
  const activeCategory = onCategoryChange ? externalCategory : internalCategory;

  const setSearch = (val: string) => {
    onSearchChange ? onSearchChange(val) : setInternalSearch(val);
  };

  const setCategory = (val: string) => {
    onCategoryChange ? onCategoryChange(val) : setInternalCategory(val);
  };

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
    return ['All', ...cats.sort()];
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
    setSearch('');
    setCategory('All');
    setPriceRange(1500);
  };

  return (
    <div className="bg-white">
      <section className="relative h-[30vh] md:h-[45vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <img 
          src={heroImage} 
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale-[0.5]"
          alt={heroTitle}
        />
        <div className="relative z-10 text-center text-white space-y-4 px-6">
          <h1 className="text-4xl md:text-7xl font-serif italic animate-fadeIn">{heroTitle}</h1>
          <p className="text-[9px] md:text-xs uppercase tracking-super-wide font-medium opacity-80 animate-fadeIn" style={{ animationDelay: '200ms' }}>{heroSubtitle}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-24">
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-8">
          <button 
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className="w-full py-4 border border-slate-100 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#2C3468]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
            {isFilterExpanded ? 'Hide Filters' : 'Filter & Search'}
            {hasActiveFilters && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
          <aside className={`w-full lg:w-64 space-y-10 flex-shrink-0 transition-all duration-500 overflow-hidden lg:max-h-none ${isFilterExpanded ? 'max-h-[1000px] mb-12' : 'max-h-0 md:max-h-none'}`}>
            
            <div className={`transition-all duration-500 overflow-hidden ${hasActiveFilters ? 'max-h-20 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
              <button 
                onClick={resetFilters}
                className="w-full py-3 border border-red-100 text-red-600 text-[9px] uppercase font-black tracking-widest hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                Reset {filteredProducts.length} Results
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] uppercase font-black tracking-widest text-[#2C3468] border-b border-slate-50 pb-3">Search</h3>
              <input 
                type="text" 
                placeholder="Fabric name..." 
                className="w-full bg-slate-50 border-none p-3 text-xs focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] uppercase font-black tracking-widest text-[#2C3468] border-b border-slate-50 pb-3">Category</h3>
              <div className="flex flex-wrap md:flex-col gap-3 md:gap-4">
                {availableCategories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setCategory(cat)}
                    className={`text-left text-[10px] md:text-xs uppercase tracking-[0.1em] transition-all relative group
                      ${activeCategory === cat ? 'text-[#2C3468] font-bold' : 'text-slate-400 hover:text-slate-900'}
                      px-3 py-1 md:p-0 border md:border-none rounded-full md:rounded-none border-slate-100`}
                  >
                    {cat}
                    {activeCategory === cat && <span className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#2C3468] rounded-full"></span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] uppercase font-black tracking-widest text-[#2C3468]">Max Price</h3>
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
            <div className="mb-8 flex justify-between items-center text-[9px] uppercase tracking-widest text-slate-400 font-bold">
               <span>{filteredProducts.length} Items Found</span>
               <div className="flex items-center gap-2">
                 <span className="hidden sm:inline">Sort:</span>
                 <select className="bg-transparent text-[#2C3468] focus:outline-none cursor-pointer">
                    <option>Newest</option>
                    <option>Price: Low</option>
                    <option>Price: High</option>
                 </select>
               </div>
            </div>

            {displayedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16">
                  {displayedProducts.map((product, idx) => (
                    <div key={product.id} className="animate-fadeIn" style={{ animationDelay: `${(idx % 6) * 100}ms` }}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                
                {hasMore && (
                  <div className="mt-16 md:mt-24 flex flex-col items-center space-y-8">
                    <div className="w-full h-px bg-slate-50 relative">
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 md:px-8">
                         <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-slate-300 font-bold">Viewed {displayedProducts.length} of {filteredProducts.length}</span>
                       </div>
                    </div>
                    <button 
                      onClick={() => setVisibleCount(prev => prev + PRODUCTS_PER_PAGE)}
                      className="w-full md:w-auto px-16 py-4 border border-[#2C3468] text-[#2C3468] text-[10px] uppercase font-black tracking-widest hover:bg-[#2C3468] hover:text-white transition-all shadow-lg active:scale-95"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-fadeIn">
                <h3 className="text-xl font-serif text-slate-800 mb-2 italic">No articles found</h3>
                <button onClick={resetFilters} className="mt-6 px-10 py-4 bg-[#2C3468] text-white text-[10px] uppercase font-bold tracking-widest">Clear Selection</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
