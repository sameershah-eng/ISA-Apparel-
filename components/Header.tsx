
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
  isAddingToCart?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onCartClick, 
  cartCount, 
  products, 
  searchQuery, 
  setSearchQuery, 
  activeCategory, 
  setActiveCategory,
  isAddingToCart = false
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAddingToCart) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isAddingToCart]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
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
      <header className={`fixed top-0 left-0 w-full z-[70] transition-all duration-500 ${isScrolled || isSearchOpen || isMenuOpen ? 'bg-white/98 backdrop-blur-xl shadow-sm py-2 md:py-4' : 'bg-transparent py-4 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
          
          {/* Mobile Menu Trigger (Left) */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 text-[#2C3468] active:scale-90 transition-transform"
            aria-label="Open Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M4 8h16M4 16h16" />
            </svg>
          </button>

          {/* Desktop Left Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            <a href="#/shop" className="text-[10px] font-black uppercase tracking-widest text-[#2C3468] hover:opacity-60 transition-opacity">Archive</a>
            <a href="#/tailoring" className="text-[10px] font-black uppercase tracking-widest text-[#2C3468] hover:opacity-60 transition-opacity">Tailoring</a>
          </nav>

          {/* Logo Center */}
          <a href="#/" onClick={() => handleQuickLink('#/')} className={`transition-all duration-500 hover:scale-105 absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0 ${isScrolled ? 'scale-[0.55] md:scale-90' : 'scale-[0.65] md:scale-110'}`}>
            <Logo />
          </a>

          {/* Desktop Right Nav & Icons */}
          <div className="flex items-center space-x-2 md:space-x-8">
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={onCartClick} 
                className={`relative group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${cartPulse ? 'text-green-600 scale-110' : 'text-[#2C3468]'}`}
              >
                Bag ({cartCount})
              </button>
              <button 
                onClick={handleSearchToggle}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2C3468] hover:opacity-60 transition-opacity border-l border-slate-100 pl-8"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                Search
              </button>
            </nav>
            
            {/* Mobile Bag Icon (Right) */}
            <div className="flex items-center md:hidden">
              <button onClick={handleSearchToggle} className="p-2 text-[#2C3468]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </button>
              <button onClick={onCartClick} className={`relative p-2 transition-all duration-300 rounded-full ${cartPulse ? 'scale-125 text-green-600 bg-green-50' : 'text-[#2C3468] active:bg-slate-50'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                {cartCount > 0 && <span className={`absolute top-1 right-1 text-white text-[7px] w-3 h-3 rounded-full flex items-center justify-center font-bold transition-colors ${cartPulse ? 'bg-green-600' : 'bg-[#2C3468]'}`}>{cartCount}</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Elegant Search Overlay Dropdown */}
        <div className={`absolute top-full right-0 w-full md:w-[60vw] bg-white shadow-2xl transition-all duration-700 overflow-y-auto ${isSearchOpen ? 'h-[calc(100dvh-54px)] md:max-h-[85vh] border-t border-slate-50' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8 md:py-16">
            <div className="flex flex-col space-y-12">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <h3 className="text-[9px] uppercase font-black tracking-super-wide text-slate-300">Archives Lookup</h3>
                   <button onClick={() => setIsSearchOpen(false)} className="text-[9px] uppercase font-bold text-slate-400 md:hidden">Close</button>
                </div>
                <div className="relative border-b-2 border-[#2C3468] pb-3">
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder="Enter keywords..."
                    className="w-full bg-transparent text-xl md:text-3xl font-serif italic text-[#2C3468] focus:outline-none placeholder:opacity-10 py-1"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="text-[9px] uppercase font-black tracking-super-wide text-slate-300">Quick Filters</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button 
                        key={cat} 
                        onClick={() => {
                          setActiveCategory(cat);
                          if (window.location.hash !== '#/shop') handleQuickLink('#/shop');
                        }}
                        className={`px-3 py-1.5 text-[8px] md:text-[9px] font-black uppercase tracking-widest border transition-all ${activeCategory === cat ? 'bg-[#2C3468] text-white border-[#2C3468]' : 'border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-900'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-[9px] uppercase font-black tracking-super-wide text-slate-300">
                    Results
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {quickResults.map(p => (
                      <button key={p.id} onClick={() => handleQuickLink(`#/product/${p.slug}`)} className="group text-left space-y-2">
                        <div className="aspect-[3/4] bg-slate-50 overflow-hidden rounded-sm relative">
                          <img src={p.images[0]} className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105" alt={p.title} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[9px] font-bold text-slate-900 uppercase truncate leading-tight">{p.title}</h4>
                          <p className="text-[9px] text-[#2C3468] font-black tracking-tighter mt-0.5">${p.price.toFixed(2)}</p>
                        </div>
                      </button>
                    ))}
                    {quickResults.length === 0 && searchQuery && (
                      <p className="col-span-2 text-slate-300 font-serif italic text-sm opacity-60 py-4 text-center">No archival matches.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-700 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute top-0 left-0 w-[80%] max-w-sm h-full bg-white shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="p-5 flex justify-between items-center bg-white border-b border-slate-50">
              <Logo className="scale-[0.55] origin-left" />
              <button onClick={() => setIsMenuOpen(false)} className="p-1 text-[#2C3468]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-8 space-y-10">
              <div className="space-y-6">
                <h3 className="text-[8px] uppercase font-black tracking-super-wide text-slate-300">Atelier</h3>
                <ul className="space-y-6">
                  <li><button onClick={() => handleQuickLink('#/')} className="text-2xl font-serif italic text-[#2C3468] block w-full text-left">The House</button></li>
                  <li><button onClick={() => handleQuickLink('#/shop')} className="text-2xl font-serif italic text-[#2C3468] block w-full text-left">Collections</button></li>
                  <li><button onClick={() => handleQuickLink('#/fabrics')} className="text-2xl font-serif italic text-[#2C3468] block w-full text-left">Fabrics</button></li>
                  <li><button onClick={() => handleQuickLink('#/tailoring')} className="text-2xl font-serif italic text-[#2C3468] block w-full text-left">Tailoring</button></li>
                </ul>
              </div>

              <div className="space-y-6 pt-4 border-t border-slate-50">
                <h3 className="text-[8px] uppercase font-black tracking-super-wide text-slate-300">Concierge</h3>
                <ul className="space-y-4 text-[9px] uppercase font-bold tracking-widest text-[#2C3468]/60">
                  <li><button onClick={() => handleQuickLink('#/checkout')} className="block w-full text-left">Secure Checkout</button></li>
                  <li><button onClick={() => setIsMenuOpen(false)} className="block w-full text-left">Client Services</button></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[50] transition-opacity duration-700"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
