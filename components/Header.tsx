
import React from 'react';
import { Logo } from '../constants';

interface HeaderProps {
  onCartClick: () => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, cartCount }) => {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Top Bar */}
      <div className="bg-[#2C3468] text-white text-[10px] py-2 text-center uppercase tracking-[0.2em] font-medium">
        Free Delivery on all orders above $150
      </div>
      
      <header className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-24 flex flex-col justify-center relative">
          {/* Logo & Icons Row */}
          <div className="flex items-center justify-between w-full mb-2">
            <div className="w-1/3 flex items-center space-x-4">
               <button className="md:hidden">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16m-7 6h7"/></svg>
               </button>
               <button className="hidden md:block hover:text-[#2C3468] transition-colors">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
               </button>
            </div>

            <div className="w-1/3 flex justify-center">
              <a href="#/" className="transition-opacity hover:opacity-80">
                <Logo />
              </a>
            </div>

            <div className="w-1/3 flex items-center justify-end space-x-6">
              <button className="hidden sm:block hover:text-[#2C3468] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              </button>
              <button onClick={onCartClick} className="relative p-1 hover:text-[#2C3468] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#2C3468] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Links Row */}
          <nav className="hidden md:flex items-center justify-center space-x-8 uppercase text-[10px] font-bold tracking-[0.15em] text-slate-600">
            <a href="#/shop" className="hover:text-[#2C3468] transition-colors">Ready to Wear</a>
            <a href="#/fabrics" className="hover:text-[#2C3468] transition-colors">Fabrics</a>
            <a href="#/tailoring" className="hover:text-[#2C3468] transition-colors">Tailoring</a>
            <a href="#/accessories" className="hover:text-[#2C3468] transition-colors">Accessories</a>
            <a href="#/sale" className="text-red-600 hover:text-red-700 transition-colors">Sale 50% Off</a>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
