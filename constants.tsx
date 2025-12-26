
import React from 'react';
import { Product } from './types';

export const BRAND_COLORS = {
  primary: '#2C3468', // The Navy from the logo
  secondary: '#F9F9F9',
  accent: '#B8860B', // Gold touch for luxury feel
};

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'executive-dress-pant',
    title: 'The Executive Dress Pant',
    category: 'Dress Pant',
    price: 185.00,
    description: 'Precision-tailored wool blend for the modern leader.',
    longDescription: 'Our Executive Dress Pant is crafted from a premium Super 120s wool blend. Featuring a sharp crease, hidden clasp closure, and a modern slim-straight fit, these are designed for the boardroom and beyond.',
    images: ['https://picsum.photos/seed/pants1/800/1000', 'https://picsum.photos/seed/pants1-2/800/1000'],
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { name: 'Midnight Navy', hex: '#2C3468' },
      { name: 'Charcoal', hex: '#36454F' }
    ],
    stock: 15
  },
  {
    id: '2',
    slug: 'performance-active-waist',
    title: 'Active Waist Dress Pant',
    category: 'Active Waist Dress Pant',
    price: 165.00,
    description: 'Unmatched comfort with a formal silhouette.',
    longDescription: 'The Active Waist Dress Pant features a hidden elasticized waistband that provides up to 2 inches of extra room without sacrificing the clean, tailored look of a traditional trouser.',
    images: ['https://picsum.photos/seed/pants2/800/1000', 'https://picsum.photos/seed/pants2-2/800/1000'],
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Slate Gray', hex: '#708090' }
    ],
    stock: 8
  },
  {
    id: '3',
    slug: 'luxury-cotton-pant',
    title: 'Premium Cotton Pant',
    category: 'Cotton Pant',
    price: 145.00,
    description: 'Italian cotton twill for weekend elegance.',
    longDescription: 'Garment-dyed for a rich, deep color and pre-shrunk for the perfect fit. Our Cotton Pant offers a soft hand-feel with enough structure for a semi-formal dinner or a casual afternoon.',
    images: ['https://picsum.photos/seed/pants3/800/1000'],
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Olive', hex: '#556B2F' },
      { name: 'Khaki', hex: '#C3B091' }
    ],
    stock: 20
  },
  {
    id: '4',
    slug: 'classic-chino-pant',
    title: 'The Essential Chino',
    category: 'Chino Pant',
    price: 125.00,
    description: 'The cornerstone of a versatile wardrobe.',
    longDescription: 'Our Essential Chino is built from mid-weight stretch cotton. It is the most versatile pant in our collection, bridging the gap between casual denim and formal trousers.',
    images: ['https://picsum.photos/seed/pants4/800/1000'],
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Tan', hex: '#D2B48C' },
      { name: 'Navy', hex: '#2C3468' }
    ],
    stock: 12
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
    <span className="text-2xl text-[#2C3468]">ISA</span>
  </div>
);
