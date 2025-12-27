
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
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      // Small delay to ensure DOM is ready on mobile
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(products.map(p => p.category))).sort()];
  }, [products]);

  const quickResults = useMemo(() => {
    if (!searchQuery && activeCategory === 'All') return [];
    const query = searchQuery.toLowerCase();
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCat;
    }).slice(0, 4);
  }, [products, searchQuery, activeCategory]);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Robust Unified Navigation for All Screens
  const handleNavigate = (path: string) => {
    setIsSearchOpen(false);
    setIsMenuOpen(false);
    // Force immediate hash update to trigger App.tsx router
    if (window.location.hash === path) {
       window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
       window.location.hash = path;
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[70] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isScrolled || isSearchOpen || isMenuOpen ? 'bg-white/40 backdrop-blur-2xl py-2 md:py-4 border-b border-black/5' : 'bg-transparent py-4 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center relative h-10 md:h-12">
          
          {/* LEFT SECTION */}
          <div className="flex-1 flex items-center justify-start">
             <button 
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden p-2 text-[#2C3468] active:scale-90 transition-transform -ml-2 z-[80]"
                aria-label="Menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M4 8h16M4 16h16" />
                </svg>
              </button>

              <nav className="hidden md:flex items-center space-x-12">
                <button onClick={() => handleNavigate('#/shop')} className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2C3468] hover:opacity-50 transition-all">Shop</button>
                <button onClick={() => handleNavigate('#/tailoring')} className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2C3468] hover:opacity-50 transition-all">Tailoring</button>
              </nav>
          </div>

          {/* CENTER LOGO - Strictly anchored */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[80]">
            <button onClick={() => handleNavigate('#/')} className={`transition-all duration-700 hover:scale-105 block ${isScrolled ? 'scale-[0.45] md:scale-75' : 'scale-[0.5] md:scale-90'}`}>
              <Logo />
            </button>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex-1 flex items-center justify-end">
            <nav className="flex items-center space-x-4 md:space-x-12">
              <button 
                onClick={onCartClick} 
                className={`relative group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 z-[80] ${cartPulse ? 'text-emerald-600 scale-110' : 'text-[#2C3468]'}`}
              >
                <span className="hidden md:inline">Bag ({cartCount})</span>
                <div className="md:hidden relative">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                   {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#2C3468] text-white text-[7px] w-3 h-3 rounded-full flex items-center justify-center font-bold shadow-sm">{cartCount}</span>}
                </div>
              </button>
              <button 
                onClick={handleSearchToggle}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#2C3468] hover:opacity-50 transition-all z-[80]"
              >
                <svg className="w-4 h-4 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <span className="hidden md:inline">Search</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Cinematic Search Overlay */}
        <div className={`absolute top-full right-0 w-full md:w-[65vw] bg-white shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-y-auto ${isSearchOpen ? 'h-[calc(100dvh-54px)] md:max-h-[85vh] border-t opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="max-w-4xl mx-auto px-6 lg:px-12 py-10 md:py-20">
            <div className="flex flex-col space-y-12">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <h3 className="text-[8px] uppercase font-black tracking-super-wide text-slate-300">Catalog retrieval</h3>
                   <button onClick={() => setIsSearchOpen(false)} className="text-[8px] uppercase font-bold text-slate-400 md:hidden p-2">Close</button>
                </div>
                <div className="relative border-b border-[#2C3468]/20 pb-2">
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder="Keywords..."
                    className="w-full bg-transparent text-xl md:text-3xl font-serif italic text-[#2C3468] focus:outline-none placeholder:opacity-10 py-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-[8px] uppercase font-black tracking-super-wide text-slate-300">Collections</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button 
                        key={cat} 
                        onClick={() => {
                          setActiveCategory(cat);
                          handleNavigate('#/shop');
                        }}
                        className={`px-3 py-2 text-[8px] md:text-[9px] font-black uppercase tracking-widest border transition-all ${activeCategory === cat ? 'bg-[#2C3468] text-white border-[#2C3468]' : 'border-slate-100 text-slate-400 hover:text-[#2C3468]'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-[8px] uppercase font-black tracking-super-wide text-slate-300">Quick Hits</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {quickResults.map(p => (
                      <button key={p.id} onClick={() => handleNavigate(`#/product/${p.slug}`)} className="group text-left space-y-2">
                        <div className="aspect-[3/4] bg-slate-50 overflow-hidden rounded-sm relative shadow-sm">
                          <img src={p.images[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={p.title} loading="lazy" />
                        </div>
                        <h4 className="text-[8px] font-bold text-slate-900 uppercase truncate tracking-widest leading-tight">{p.title}</h4>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER - Refined Typography & Spacing */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-700 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute top-0 left-0 w-[85%] max-w-sm h-full bg-white shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="p-6 flex justify-between items-center bg-white border-b border-slate-50">
              <Logo className="scale-[0.4] origin-left" />
              <button onClick={() => setIsMenuOpen(false)} className="p-3 text-[#2C3468] active:scale-75 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-8 space-y-12">
              <div className="space-y-8">
                <h3 className="text-[8px] uppercase font-black tracking-super-wide text-slate-300">ARCHIVE</h3>
                <ul className="space-y-6">
                  <li><button onClick={() => handleNavigate('#/')} className="text-[11px] uppercase font-black tracking-[0.25em] text-[#2C3468] block w-full text-left active:opacity-50">The Atelier</button></li>
                  <li><button onClick={() => handleNavigate('#/shop')} className="text-[11px] uppercase font-black tracking-[0.25em] text-[#2C3468] block w-full text-left active:opacity-50">Collections</button></li>
                  <li><button onClick={() => handleNavigate('#/fabrics')} className="text-[11px] uppercase font-black tracking-[0.25em] text-[#2C3468] block w-full text-left active:opacity-50">The Fabrics</button></li>
                  <li><button onClick={() => handleNavigate('#/tailoring')} className="text-[11px] uppercase font-black tracking-[0.25em] text-[#2C3468] block w-full text-left active:opacity-50">Tailoring</button></li>
                  <li><button onClick={() => handleNavigate('#/accessories')} className="text-[11px] uppercase font-black tracking-[0.25em] text-[#2C3468] block w-full text-left active:opacity-50">Accessories</button></li>
                </ul>
              </div>

              <div className="pt-8 border-t border-slate-50 space-y-6">
                <h3 className="text-[8px] uppercase font-black tracking-super-wide text-slate-300">Support</h3>
                <ul className="space-y-4 text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                  <li><button onClick={() => setIsMenuOpen(false)} className="hover:text-[#2C3468] transition-colors">Our Story</button></li>
                  <li><button onClick={() => setIsMenuOpen(false)} className="hover:text-[#2C3468] transition-colors">Track Shipment</button></li>
                  <li><button onClick={() => setIsMenuOpen(false)} className="hover:text-[#2C3468] transition-colors">Returns & Boutique</button></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-[1px] z-[50]" onClick={() => setIsSearchOpen(false)} />
      )}
    </>
  );
};

export default Header;
