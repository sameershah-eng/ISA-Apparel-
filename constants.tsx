
import React from 'react';

export const BRAND_COLORS = {
  primary: '#2C3468',
  secondary: '#F9F9F9',
  accent: '#B8860B',
};

// Removed SAMPLE_PRODUCTS - the app now relies on Supabase live data.

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-end gap-1 select-none ${className}`}>
    <div className="relative w-[22px] h-[40px] bg-[#2C3468] flex flex-col items-center justify-between overflow-hidden rounded-[2px]">
      <div className="absolute left-0 top-0 bottom-0 w-[5px] flex flex-col justify-around py-1">
        {[...Array(10)].map((_, i) => (
          <div key={`l-${i}`} className="w-full h-[1px] bg-white/30"></div>
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-[5px] flex flex-col justify-around py-1">
        {[...Array(10)].map((_, i) => (
          <div key={`r-${i}`} className="w-full h-[1px] bg-white/30"></div>
        ))}
      </div>
      <div className="relative z-10 mt-3 w-[12px] h-[18px] bg-white border border-slate-300 rounded-sm flex items-center justify-center shadow-sm">
         <div className="w-[5px] h-[9px] border border-slate-200 rounded-full bg-slate-50"></div>
      </div>
    </div>
    <span className="text-5xl leading-none font-black text-[#2C3468] tracking-tighter -mb-1">SA</span>
  </div>
);
