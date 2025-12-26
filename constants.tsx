
import React from 'react';
import { Product } from './types';

export const BRAND_COLORS = {
  primary: '#2C3468',
  secondary: '#F9F9F9',
  accent: '#B8860B',
};

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'tailored-dress-trouser',
    title: 'Executive Wool Trouser',
    category: 'Dress Pant',
    price: 245.00,
    description: '100% Italian Merino Wool, slim fit.',
    longDescription: 'Crafted from Super 130s wool from the Biella region, these trousers offer an unparalleled drape. Featuring a non-slip waistband and genuine horn buttons.',
    images: [
      'https://images.unsplash.com/photo-1594932224030-9455144cced3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Midnight Navy', hex: '#2C3468' },
      { name: 'Onyx Black', hex: '#000000' }
    ],
    stock: 12
  },
  {
    id: '2',
    slug: 'active-performance-pant',
    title: 'Active 360 Dress Pant',
    category: 'Active Waist Dress Pant',
    price: 195.00,
    description: 'Wrinkle-resistant stretch fabric for travel.',
    longDescription: 'The 360 Performance pant uses a hidden elasticized waistband for maximum comfort during long flights or busy days at the office.',
    images: [
      'https://images.unsplash.com/photo-1624372927050-12484ec669b2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { name: 'Slate Grey', hex: '#708090' },
      { name: 'Classic Khaki', hex: '#C3B091' }
    ],
    stock: 4
  },
  {
    id: '3',
    slug: 'essential-chino',
    title: 'The Signature Chino',
    category: 'Chino Pant',
    price: 165.00,
    description: 'Double-brushed cotton for a soft hand-feel.',
    longDescription: 'Our signature chino is garment-dyed to achieve a deep, consistent color that ages beautifully. A versatile staple for every wardrobe.',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa804b86d30b?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Sand', hex: '#D2B48C' },
      { name: 'Olive Drab', hex: '#556B2F' }
    ],
    stock: 20
  },
  {
    id: '4',
    slug: 'summer-cotton-pant',
    title: 'Lightweight Cotton Trouser',
    category: 'Cotton Pant',
    price: 155.00,
    description: 'Breathable cotton-linen blend.',
    longDescription: 'Perfect for warmer climates, this blend provides the structure of cotton with the cooling properties of linen.',
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Sky Blue', hex: '#87CEEB' }
    ],
    stock: 15
  }
];

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center gap-1 font-bold tracking-tighter ${className}`}>
    <div className="w-6 h-8 bg-[#2C3468] relative flex items-center justify-center overflow-hidden">
        <div className="w-[2px] h-full bg-white absolute left-1/2 -translate-x-1/2 flex flex-col justify-around py-1">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1 h-[2px] bg-slate-300"></div>
            ))}
        </div>
        <div className="w-2 h-3 bg-white border border-slate-400 rounded-sm z-10"></div>
    </div>
    <span className="text-2xl text-[#2C3468] font-serif uppercase tracking-tight">ISA</span>
  </div>
);
