
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
    slug: 'pebbled-leather-belt',
    title: 'Heritage Leather Belt',
    category: 'Accessories',
    price: 85.00,
    description: 'Full-grain Italian calfskin with brass buckle.',
    longDescription: 'Hand-finished in our Florence workshop. This belt is designed to age beautifully, developing a unique patina over time.',
    images: [
      'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['32', '34', '36'],
    colors: [
      { name: 'Tan', hex: '#A0522D' },
      { name: 'Deep Black', hex: '#000000' }
    ],
    stock: 25
  },
  {
    id: '4',
    slug: 'bespoke-fitting-session',
    title: 'Signature Fitting Service',
    category: 'Bespoke',
    price: 450.00,
    description: 'Full personal measurement and pattern creation.',
    longDescription: 'A one-on-one session with our master tailor to create your unique digital pattern and select exclusive house fabrics.',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['N/A'],
    colors: [{ name: 'N/A', hex: '#FFFFFF' }],
    stock: 5
  },
  {
    id: '5',
    slug: 'essential-chino',
    title: 'The Signature Chino',
    category: 'Chino Pant',
    price: 165.00,
    description: 'Double-brushed cotton for a soft hand-feel.',
    longDescription: 'Our signature chino is garment-dyed to achieve a deep, consistent color that ages beautifully.',
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
    id: '6',
    slug: 'silk-pocket-square',
    title: 'Hand-Rolled Silk Square',
    category: 'Accessories',
    price: 45.00,
    description: '100% Silk with hand-rolled edges.',
    longDescription: 'A subtle touch of luxury for your blazer. Available in our signature house colors.',
    images: [
      'https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['ONE SIZE'],
    colors: [{ name: 'Navy', hex: '#2C3468' }],
    stock: 50
  },
  {
    id: '7',
    slug: 'summer-linen-trouser',
    title: 'Riviera Linen Trouser',
    category: 'Cotton Pant',
    price: 135.00,
    description: 'Breathable linen-cotton blend for summer.',
    longDescription: 'The Riviera is our lightest trouser yet. Perfect for coastal events or summer weddings.',
    images: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: [{ name: 'Cream', hex: '#FFFDD0' }],
    stock: 15
  },
  {
    id: '8',
    slug: 'limited-edition-cashmere',
    title: 'Cashmere Blend Chino',
    category: 'Chino Pant',
    price: 295.00,
    description: 'Premium cotton infused with 15% cashmere.',
    longDescription: 'Unparalleled softness meets the rugged utility of a chino. A limited seasonal release.',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['32', '34', '36'],
    colors: [{ name: 'Charcoal', hex: '#36454F' }],
    stock: 3
  },
  {
    id: '9',
    slug: 'archived-wool-pant',
    title: 'Archive Grey Wool',
    category: 'Dress Pant',
    price: 120.00,
    description: 'Archive stock from previous season.',
    longDescription: 'Classic fit wool trousers from the AW23 collection. Exceptional value for high-end tailoring.',
    images: [
      'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['34', '36'],
    colors: [{ name: 'Grey Heather', hex: '#BEBEBE' }],
    stock: 8
  },
  {
    id: '10',
    slug: 'leather-card-holder',
    title: 'Minimalist Card Holder',
    category: 'Accessories',
    price: 65.00,
    description: 'Slim leather wallet for 4-6 cards.',
    longDescription: 'The perfect companion for your ISA trousers. Slim enough to fit comfortably in front or back pockets without creating a bulge.',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['N/A'],
    colors: [{ name: 'Saddle', hex: '#8B4513' }],
    stock: 40
  },
  {
    id: '11',
    slug: 'merino-wool-socks',
    title: 'Luxury Ribbed Socks',
    category: 'Accessories',
    price: 25.00,
    description: 'Over-the-calf merino wool dress socks.',
    longDescription: 'Reinforced heel and toe for durability. Stays up all day without restriction.',
    images: [
      'https://images.unsplash.com/photo-1582966298438-641ff1f70a2d?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['ONE SIZE'],
    colors: [{ name: 'Navy', hex: '#2C3468' }],
    stock: 100
  },
  {
    id: '12',
    slug: 'bespoke-overcoat-service',
    title: 'Atelier Overcoat Service',
    category: 'Bespoke',
    price: 1200.00,
    description: 'Fully custom made-to-measure outerwear.',
    longDescription: 'A complete custom experience. Choose from over 500 premium fabrics for a coat that will last a lifetime.',
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['N/A'],
    colors: [{ name: 'Custom', hex: '#FFFFFF' }],
    stock: 2
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
