
import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { SAMPLE_PRODUCTS } from '../constants';

interface ProductDetailProps {
  slug: string;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ slug, onAddToCart }) => {
  const product = SAMPLE_PRODUCTS.find(p => p.slug === slug);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0].name || '');
  const [activeImage, setActiveImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) return <div className="p-20 text-center">Product not found</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    setIsAdding(true);
    onAddToCart({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: 1
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images Grid */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-slate-100 rounded-sm overflow-hidden">
            <img 
              src={product.images[activeImage]} 
              alt={product.title} 
              className="w-full h-full object-cover transition-opacity duration-500" 
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`aspect-square bg-slate-100 rounded-sm overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-[#2C3468]' : 'border-transparent'}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Content */}
        <div className="flex flex-col">
          <div className="border-b border-slate-100 pb-8">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-slate-400 mb-2">{product.category}</p>
            <h1 className="text-4xl font-serif text-slate-900">{product.title}</h1>
            <p className="text-2xl font-bold text-[#2C3468] mt-4">${product.price.toFixed(2)}</p>
          </div>

          <div className="py-8 space-y-10">
            {/* Color Selection */}
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-slate-500">Color: {selectedColor}</span>
              <div className="flex gap-4">
                {product.colors.map(color => (
                  <button 
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${selectedColor === color.name ? 'border-[#2C3468]' : 'border-slate-200'}`}
                  >
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase font-bold tracking-widest text-slate-500">Select Size (Waist)</span>
                <button className="text-[10px] uppercase font-bold text-[#2C3468] underline underline-offset-2">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border text-sm transition-all ${selectedSize === size ? 'bg-[#2C3468] text-white border-[#2C3468]' : 'hover:border-[#2C3468] border-slate-200 text-slate-600'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-5 font-bold uppercase tracking-widest transition-all transform flex items-center justify-center gap-3 shadow-xl ${isAdding ? 'bg-green-600 text-white' : 'bg-[#2C3468] text-white hover:bg-opacity-90 active:scale-[0.98]'}`}
            >
              {isAdding ? (
                <>
                  <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  Added!
                </>
              ) : (
                'Add to Shopping Bag'
              )}
            </button>
          </div>

          {/* Collapsible Details */}
          <div className="mt-8 border-t border-slate-100 pt-8 space-y-6">
            <div>
              <h3 className="text-xs uppercase font-bold tracking-widest text-slate-900 mb-2">Description</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{product.longDescription}</p>
            </div>
            <div>
                <h3 className="text-xs uppercase font-bold tracking-widest text-slate-900 mb-2">Details & Care</h3>
                <ul className="text-slate-600 text-sm list-disc pl-5 space-y-1 font-light">
                    <li>Dry clean only to maintain crispness</li>
                    <li>Premium double-stitched seams</li>
                    <li>Hidden security pocket in right pocket</li>
                    <li>Custom ISA engraved buttons</li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
