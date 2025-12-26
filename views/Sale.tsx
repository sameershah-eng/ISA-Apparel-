
import React from 'react';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS } from '../constants';

const Sale: React.FC = () => {
  const saleProducts = SAMPLE_PRODUCTS.filter(p => p.price < 150 || p.title.toLowerCase().includes('archive'));

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-red-50/50 py-32 text-center border-b border-red-100 flex flex-col items-center gap-6">
        <span className="text-[10px] uppercase font-black tracking-[0.6em] text-red-600 block">Seasonal Archive Event</span>
        <h1 className="text-6xl md:text-8xl font-serif italic text-[#2C3468]">ISA Archive</h1>
        <p className="text-slate-500 max-w-xl mx-auto font-light italic px-4 text-lg">
          "A final opportunity to acquire signature ISA silhouettes and heritage fabrics from previous seasons at exceptional value."
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24">
        {saleProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400 font-light italic">
            The archive is currently closed.
          </div>
        )}
      </div>
    </div>
  );
};

export default Sale;
