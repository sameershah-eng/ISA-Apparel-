
import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS } from '../constants';
import { Category } from '../types';

interface ShopProps {
  saleOnly?: boolean;
}

const Shop: React.FC<ShopProps> = ({ saleOnly }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [priceRange, setPriceRange] = useState<number>(500);

  const categories: (Category | 'All')[] = ['All', 'Dress Pant', 'Active Waist Dress Pant', 'Cotton Pant', 'Chino Pant'];

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter(product => {
      // For the Sale section, we show items under $150 or explicitly with "Archive" in title
      const isSaleItem = saleOnly ? (product.price < 150 || product.title.toLowerCase().includes('archive')) : true;
      if (!isSaleItem) return false;

      // Regular filters
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesPrice = product.price <= priceRange;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, activeCategory, priceRange, saleOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
      {saleOnly && (
        <div className="bg-red-50 p-12 rounded-sm mb-16 text-center animate-fadeIn border border-red-100">
          <span className="text-[10px] uppercase font-black tracking-[0.4em] text-red-600 block mb-2">Exclusive Offer</span>
          <h2 className="text-5xl font-serif italic text-[#2C3468]">The Archive Event</h2>
          <p className="text-slate-500 font-light text-base mt-4 max-w-xl mx-auto">
            Explore our curated selection of seasonal staples and final pieces from the AW23 archive. Up to 50% off select styles.
          </p>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-serif text-[#2C3468] italic">
            {saleOnly ? 'The Archive' : 'Ready to Wear'}
          </h1>
          <p className="text-slate-400 text-xs uppercase tracking-[0.4em] font-medium">{filteredProducts.length} Exceptional Pieces</p>
        </div>

        <div className="w-full md:w-96 group">
          <div className="relative border-b-2 border-slate-100 group-focus-within:border-[#2C3468] transition-colors py-4">
            <input 
              type="text" 
              placeholder="Search by collection or fabric..." 
              className="w-full bg-transparent focus:outline-none text-base font-light placeholder:italic placeholder:opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#2C3468] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 space-y-12">
          <div className="space-y-8">
            <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-[#2C3468] border-b border-slate-100 pb-4">Category</h3>
            <div className="flex flex-col gap-4">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`text-left text-xs uppercase tracking-[0.2em] transition-all hover:translate-x-1 ${activeCategory === cat ? 'text-[#2C3468] font-bold underline underline-offset-8' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
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
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2C3468]"
            />
            <div className="flex justify-between text-[10px] text-slate-300 font-bold uppercase tracking-widest">
              <span>$20</span>
              <span>$1500</span>
            </div>
          </div>

          <div className="p-8 bg-slate-50 rounded-sm space-y-4">
            <h4 className="text-[10px] uppercase font-black tracking-widest text-[#2C3468]">Need Assistance?</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-light">
              Our styling consultants are available on WhatsApp to help you find the perfect fit and fabric for your needs.
            </p>
            <a href="https://wa.me/923142278722" className="block text-[10px] uppercase font-bold text-[#2C3468] underline underline-offset-4">Connect with Concierge</a>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
              {filteredProducts.map((product, idx) => (
                <div key={product.id} className="animate-fadeIn" style={{ animationDelay: `${idx * 100}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-40 text-center animate-fadeIn">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100">
                <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="text-2xl font-serif text-slate-800 mb-2 italic">Archive feels empty</h3>
              <p className="text-slate-400 text-sm font-light max-w-xs mx-auto">Try refining your search terms or expanding your price range.</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('All'); setPriceRange(1500);}}
                className="mt-10 px-8 py-3 bg-[#2C3468] text-white text-[10px] uppercase font-bold tracking-widest hover:opacity-90 transition-all shadow-lg"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
