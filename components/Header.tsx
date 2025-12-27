
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Logo } from '../constants';
import { Product } from '../types';

interface HeaderProps {
  onCartClick: () => void;
  cartCount: number;
  products: Product[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: string;
  setActiveCategory: (c: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onCartClick, 
  cartCount, 
  products, 
  searchQuery, 
  setSearchQuery, 
  activeCategory, 
  setActiveCategory 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when overlays are open
  useEffect(() => {
    if (isSearchOpen || isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isSearchOpen, isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(products.map(p => p.category))).sort()];
  }, [products]);

  const quickResults = useMemo(() => {
    if (!searchQuery && activeCategory === 'All') return [];
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCat;
    }).slice(0, 4);
  }, [products, searchQuery, activeCategory]);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMenuOpen(false); 
  };

  const handleQuickLink = (path: string) => {
    setIsSearchOpen(false);
    setIsMenuOpen(false);
    window.location.hash = path;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[70] transition-all duration-500 ${isScrolled || isSearchOpen || isMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
          
          {/* Mobile Menu Trigger (Left) */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 text-[#2C3468] hover:bg-slate-50 rounded-full transition-colors"
            aria-label="Open Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Nav links left (Desktop Only) */}
          <nav className="hidden md:flex items-center space-x-10">
            <button 
              onClick={handleSearchToggle}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2C3468] hover:opacity-60 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              Search
            </button>
            <a href="#/shop" className="text-[10px] font-black uppercase tracking-widest text-[#2C3468] hover:opacity-60 transition-opacity">Shop</a>
          </nav>

          {/* Logo center */}
          <a href="#/" onClick={() => handleQuickLink('#/')} className={`transition-all duration-500 hover:scale-105 ${isScrolled ? 'scale-75 md:scale-90' : 'scale-90 md:scale-110'}`}>
            <Logo />
          </a>

          {/* Nav links right & Icons */}
          <div className="flex items-center space-x-2 md:space-x-8">
            <nav className="hidden md:flex items-center space-x-10 mr-4">
              <a href="#/tailoring" className="text-[10px] font-black uppercase tracking-widest text-[#2C3468] hover:opacity-60 transition-opacity">Tailoring</a>
              <button onClick={onCartClick} className="relative group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2C3468]">
                Bag ({cartCount})
              </button>
            </nav>
            
            {/* Mobile Icons (Right) */}
            <div className="flex items-center md:hidden">
              <button onClick={handleSearchToggle} className="p-2 text-[#2C3468] hover:bg-slate-50 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </button>
              <button onClick={onCartClick} className="relative p-2 text-[#2C3468] hover:bg-slate-50 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                {cartCount > 0 && <span className="absolute top-1 right-1 bg-[#2C3468] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay Dropdown (Responsive) */}
        <div className={`absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-500 overflow-y-auto ${isSearchOpen ? 'h-[calc(100dvh-64px)] md:max-h-[80vh] border-t border-slate-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 md:py-12">
            
            {/* Mobile Close Button for Search */}
            <div className="md:hidden flex justify-end mb-4">
              <button onClick={() => setIsSearchOpen(false)} className="text-[10px] uppercase font-bold tracking-widest text-slate-400 p-2">
                Close Search
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
              
              {/* Left: Input and Categories */}
              <div className="lg:col-span-4 space-y-6 md:space-y-10">
                <div className="space-y-4">
                  <h3 className="text-[10px] uppercase font-black tracking-widest text-slate-400">Search Archive</h3>
                  <div className="relative border-b border-[#2C3468] pb-2">
                    <input 
                      ref={searchInputRef}
                      type="text" 
                      placeholder="e.g. Linen"
                      className="w-full bg-transparent text-xl md:text-2xl font-serif italic text-[#2C3468] focus:outline-none placeholder:opacity-20 py-2"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] uppercase font-black tracking-widest text-slate-400">Quick Filters</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button 
                        key={cat} 
                        onClick={() => {
                          setActiveCategory(cat);
                          if (window.location.hash !== '#/shop') handleQuickLink('#/shop');
                        }}
                        className={`px-3 py-2 md:px-4 md:py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest border transition-all ${activeCategory === cat ? 'bg-[#2C3468] text-white border-[#2C3468]' : 'border-slate-100 text-slate-400 hover:border-slate-300'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Results Preview */}
              <div className="lg:col-span-8 pb-20 md:pb-0">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                    {searchQuery ? `Results (${quickResults.length})` : 'New Arrivals'}
                  </h3>
                  {searchQuery && (
                    <button 
                      onClick={() => handleQuickLink('#/shop')}
                      className="text-[10px] font-black uppercase tracking-widest text-[#2C3468] underline underline-offset-4"
                    >
                      View All
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {(searchQuery || activeCategory !== 'All' ? quickResults : products.slice(0, 4)).map(p => (
                    <button 
                      key={p.id} 
                      onClick={() => handleQuickLink(`#/product/${p.slug}`)}
                      className="group text-left space-y-2 md:space-y-3"
                    >
                      <div className="aspect-[3/4] bg-slate-50 overflow-hidden rounded-sm">
                        <img src={p.images[0]} className="w-full h-full object-cover grayscale md:group-hover:grayscale-0 transition-all duration-700 md:group-hover:scale-105" alt={p.title} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-widest text-slate-400 font-bold truncate">{p.category}</p>
                        <h4 className="text-[9px] md:text-[10px] font-bold text-slate-800 uppercase truncate leading-tight">{p.title}</h4>
                        <p className="text-[9px] md:text-[10px] text-[#2C3468] font-bold">${p.price.toFixed(2)}</p>
                      </div>
                    </button>
                  ))}
                  {(searchQuery || activeCategory !== 'All') && quickResults.length === 0 && (
                    <div className="col-span-2 md:col-span-4 py-8 text-center">
                      <p className="text-slate-400 font-serif italic text-sm">No results found.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Side Drawer */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute top-0 left-0 w-4/5 max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 ease-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b flex justify-between items-center bg-white sticky top-0 z-10">
              <Logo className="scale-75 origin-left" />
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-[#2C3468] hover:bg-slate-50 rounded-full transition-colors" aria-label="Close Menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-8 space-y-12">
              <div className="space-y-8">
                <h3 className="text-[10px] uppercase font-black tracking-super-wide text-slate-400 border-b border-slate-50 pb-2">Collections</h3>
                <ul className="space-y-6">
                  <li><button onClick={() => handleQuickLink('#/shop')} className="text-2xl font-serif italic text-[#2C3468] block w-full text-left">Ready to Wear</button></li>
                  <li><button onClick={() => handleQuickLink('#/fabrics')} className="text-2xl font-serif italic text-[#2C3468] block w-full text-left">Fabric Archive</button></li>
                  <li><button onClick={() => handleQuickLink('#/tailoring')} className="text-2xl font-serif italic text-[#2C3468] block w-full text-left">Bespoke Services</button></li>
                  <li><button onClick={() => handleQuickLink('#/accessories')} className="text-2xl font-serif italic text-[#2C3468] block w-full text-left">Accessories</button></li>
                </ul>
              </div>

              <div className="space-y-8 pt-6 border-t border-slate-50">
                <h3 className="text-[10px] uppercase font-black tracking-super-wide text-slate-400 border-b border-slate-50 pb-2">Client Services</h3>
                <ul className="space-y-6 text-[11px] uppercase font-bold tracking-widest text-[#2C3468]/60">
                  <li><button onClick={() => handleQuickLink('#/')} className="block w-full text-left">About ISA Atelier</button></li>
                  <li><button onClick={() => setIsMenuOpen(false)} className="block w-full text-left">Store Locator</button></li>
                  <li><button onClick={() => setIsMenuOpen(false)} className="block w-full text-left">Care Guide</button></li>
                  <li><button onClick={() => setIsMenuOpen(false)} className="block w-full text-left">Contact Concierge</button></li>
                </ul>
              </div>
            </nav>

            <div className="p-8 border-t bg-slate-50 text-center">
              <p className="text-[9px] uppercase tracking-super-wide text-slate-400 font-bold mb-4">ISA SARTORIAL EXCELLENCE</p>
              <div className="flex justify-center gap-6 opacity-40">
                <span className="w-1.5 h-1.5 bg-[#2C3468] rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-[#2C3468] rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-[#2C3468] rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Backdrop (for Search) */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50] transition-opacity"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
