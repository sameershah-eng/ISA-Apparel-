
import React, { useState, useEffect } from 'react';
import { Logo } from '../constants';

interface HeaderProps {
  onCartClick: () => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Nav links left */}
        <nav className="hidden md:flex items-center space-x-10">
          <a href="#/shop" className="text-[10px] font-black uppercase tracking-widest text-[#2C3468] hover:opacity-60 transition-opacity">Ready to Wear</a>
          <a href="#/fabrics" className="text-[10px] font-black uppercase tracking-widest text-[#2C3468] hover:opacity-60 transition-opacity">Fabrics</a>
        </nav>

        {/* Logo center */}
        <a href="#/" className={`transition-transform duration-500 hover:scale-105 ${isScrolled ? 'scale-90' : 'scale-110'}`}>
          <Logo />
        </a>

        {/* Nav links right */}
        <div className="flex items-center space-x-8">
          <nav className="hidden md:flex items-center space-x-10 mr-4">
            <a href="#/tailoring" className="text-[10px] font-black uppercase tracking-widest text-[#2C3468] hover:opacity-60 transition-opacity">Tailoring</a>
            <a href="#/accessories" className="text-[10px] font-black uppercase tracking-widest text-[#2C3468] hover:opacity-60 transition-opacity">Accessories</a>
          </nav>
          
          <button onClick={onCartClick} className="relative group">
            <svg className="w-6 h-6 text-[#2C3468]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#2C3468] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-fadeIn">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
