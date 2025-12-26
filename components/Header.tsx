
import React, { useState, useEffect } from 'react';
import { Logo } from '../constants';

interface HeaderProps {
  onCartClick: () => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Ready to Wear', href: '#/shop' },
    { name: 'Fabrics', href: '#/fabrics' },
    { name: 'Tailoring', href: '#/tailoring' },
    { name: 'Accessories', href: '#/accessories' },
    { name: 'Sale 50% Off', href: '#/sale', isSale: true },
  ];

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm translate-y-[-32px]' : 'bg-white'}`}>
      {/* Top Bar */}
      <div className="bg-[#2C3468] text-white text-[10px] py-2 text-center uppercase tracking-[0.2em] font-medium transition-opacity">
        Free Delivery on all orders above $150
      </div>
      
      <header className="max-w-7xl mx-auto px-4 lg:px-8 h-20 md:h-24 flex items-center justify-between">
        {/* Left: Search & Mobile Menu */}
        <div className="w-1/3 flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16m-7 6h7"/></svg>
            )}
          </button>
          <a href="#/shop" className="hidden md:flex items-center gap-2 text-slate-400 hover:text-[#2C3468] transition-colors group">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Search</span>
          </a>
        </div>

        {/* Center: Logo */}
        <div className="w-1/3 flex justify-center">
          <a href="#/" className="transition-transform hover:scale-105 active:scale-95 duration-300">
            <Logo className="scale-75 md:scale-100" />
          </a>
        </div>

        {/* Right: Icons */}
        <div className="w-1/3 flex items-center justify-end space-x-2 md:space-x-6">
          <button className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-[#2C3468] transition-colors group">
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Account</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </button>
          <button onClick={onCartClick} className="relative p-2 hover:bg-slate-50 rounded-full transition-all group">
            <svg className="w-6 h-6 text-[#2C3468]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex border-t border-slate-50 items-center justify-center space-x-12 h-12">
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative group py-2
              ${link.isSale ? 'text-red-600 hover:text-red-700' : 'text-slate-500 hover:text-[#2C3468]'}`}
          >
            {link.name}
            <span className={`absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${link.isSale ? 'bg-red-600' : 'bg-[#2C3468]'}`}></span>
          </a>
        ))}
      </nav>

      {/* Mobile Sidebar Menu */}
      <div className={`fixed inset-0 bg-white z-[60] transform transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <Logo className="scale-75" />
            <button onClick={() => setIsMenuOpen(false)} className="p-2">
              <svg className="w-8 h-8 text-[#2C3468]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="flex flex-col space-y-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-serif italic ${link.isSale ? 'text-red-600' : 'text-[#2C3468]'}`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-12 border-t border-slate-100">
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-4">Visit Us</p>
            <p className="text-sm text-slate-600 font-light">Madison Avenue, 4th Floor<br/>New York, NY 10022</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
