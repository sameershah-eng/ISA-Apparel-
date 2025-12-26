
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
    slug: 'biella-merino-trouser',
    title: 'The Biella Merino Trouser',
    category: 'Dress Pant',
    price: 325.00,
    description: 'Super 130s Merino Wool from northern Italy.',
    longDescription: 'A masterpiece of northern Italian weaving. These trousers feature a natural stretch, silk-lined waistband, and a sharp permanent crease. The Super 130s wool provides a subtle luster and an impeccable drape that resists wrinkling throughout the day.',
    images: [
      'https://images.unsplash.com/photo-1594932224030-9455144cced3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Midnight', hex: '#1B263B' },
      { name: 'Graphite', hex: '#3E3E3E' }
    ],
    stock: 8
  },
  {
    id: '2',
    slug: 'technical-travel-chino',
    title: '360° Technical Travel Chino',
    category: 'Active Waist Dress Pant',
    price: 210.00,
    description: 'High-twist technical fabric with active waistband.',
    longDescription: 'Engineered for the global traveler. Our technical chino utilizes a high-twist yarn that maintains its shape even after hours of transit. Featuring a hidden elasticized waistband that provides an extra 2 inches of comfort without sacrificing the formal silhouette.',
    images: [
      'https://images.unsplash.com/photo-1624372927050-12484ec669b2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473966968600-fa804b86d30b?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { name: 'Sandstone', hex: '#C2B280' },
      { name: 'Slate', hex: '#708090' }
    ],
    stock: 12
  },
  {
    id: '3',
    slug: 'pima-cotton-standard',
    title: 'Pima Cotton Standard',
    category: 'Cotton Pant',
    price: 185.00,
    description: 'Double-brushed long-staple Pima cotton.',
    longDescription: 'The foundation of the casual wardrobe. We use only long-staple Pima cotton, double-brushed for a cashmere-like hand feel. These pants are garment-dyed in small batches to achieve a unique depth of color.',
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['30', '31', '32', '33', '34', '36'],
    colors: [
      { name: 'Cream', hex: '#F5F5DC' },
      { name: 'Olive', hex: '#556B2F' }
    ],
    stock: 15
  },
  {
    id: '4',
    slug: 'limited-silk-wool-tuxedo',
    title: 'Atelier Silk-Wool Trouser',
    category: 'Bespoke',
    price: 550.00,
    description: 'Silk-blend evening wear with grosgrain detailing.',
    longDescription: 'Part of our Atelier series. This evening trouser is crafted from a heavy silk and wool blend, featuring a traditional grosgrain side stripe and a high-rise waist designed for use with braces.',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['Custom'],
    colors: [{ name: 'Deep Black', hex: '#000000' }],
    stock: 2
  },
  {
    id: '5',
    slug: 'florence-calf-belt',
    title: 'Florence Calfskin Belt',
    category: 'Accessories',
    price: 125.00,
    description: 'Hand-stitched Italian leather with solid brass.',
    longDescription: 'A belt designed to last a lifetime. Sourced from a family-owned tannery in Florence, this full-grain leather develops a rich patina over time. Finished with a solid brass buckle and hand-painted edges.',
    images: [
      'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['32', '34', '36', '38'],
    colors: [
      { name: 'Tan', hex: '#A0522D' },
      { name: 'Black', hex: '#000000' }
    ],
    stock: 20
  },
  {
    id: '6',
    slug: 'heritage-chino-sale',
    title: 'Archive Heritage Chino',
    category: 'Chino Pant',
    price: 95.00,
    description: 'Heavyweight cotton drill from our AW23 archive.',
    longDescription: 'An opportunity to own a piece of ISA history. This archive chino is made from a rugged 12oz cotton drill, perfect for cooler weather. Classic straight-leg fit.',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['34', '36'],
    colors: [{ name: 'Tobacco', hex: '#8B4513' }],
    stock: 4
  }
];

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
