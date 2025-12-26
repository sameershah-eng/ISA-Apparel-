
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './views/Home';
import ProductDetail from './views/ProductDetail';
import Shop from './views/Shop';
import Fabrics from './views/Fabrics';
import Tailoring from './views/Tailoring';
import Accessories from './views/Accessories';
import Checkout from './views/Checkout';
import { CartItem, Product } from './types';
import ChatBot from './components/ChatBot';
import { supabase } from './lib/supabaseClient';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#/');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Core Data Sync Hook
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);
        
        console.log('ISA: Starting catalog fetch...');

        // Querying products with joined data
        const { data: dbProducts, error } = await supabase
          .from('products')
          .select(`
            *,
            categories:category_id (name),
            product_images (url, sort_order),
            product_variants (size, color_name, color_hex, stock)
          `)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase Query Error:', error.message);
          setFetchError(error.message);
          return;
        }

        if (!dbProducts || dbProducts.length === 0) {
          console.warn('ISA: Database returned 0 products. Check if RLS is enabled or if data exists.');
          setProducts([]);
          return;
        }

        console.log(`ISA: Successfully fetched ${dbProducts.length} items.`);

        const transformed: Product[] = dbProducts.map(p => {
          // Handle the nested category object - Supabase returns an object when joined on a single ID
          const categoryName = p.categories?.name || 'Uncategorized';
          
          return {
            id: p.id,
            slug: p.slug,
            title: p.title,
            category: categoryName,
            price: parseFloat(p.price),
            description: p.description || '',
            longDescription: p.long_description || '',
            images: p.product_images
              ? p.product_images
                  .sort((a: any, b: any) => a.sort_order - b.sort_order)
                  .map((img: any) => img.url)
              : [],
            sizes: p.product_variants 
              ? Array.from(new Set(p.product_variants.map((v: any) => v.size))).filter(Boolean) as string[]
              : [],
            colors: p.product_variants 
              ? p.product_variants.reduce((acc: any[], v: any) => {
                  if (v.color_name && !acc.find(c => c.name === v.color_name)) {
                    acc.push({ name: v.color_name, hex: v.color_hex });
                  }
                  return acc;
                }, [])
              : [],
            stock: p.stock || 0
          };
        });

        setProducts(transformed);
      } catch (err: any) {
        console.error('ISA: Unexpected fetch failure:', err);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash || '#/';
      setCurrentRoute(newHash);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const existingIndex = cartItems.findIndex(item => 
      item.productId === newItem.productId && 
      item.size === newItem.size && 
      item.color === newItem.color
    );
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...newItem, id: Math.random().toString(36).substr(2, 9) }]);
    }
    setTimeout(() => setIsCartOpen(true), 300);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const renderView = () => {
    const path = currentRoute.split('?')[0]; 
    
    if (isLoading && products.length === 0) return null;

    switch (path) {
      case '#/':
      case '':
        return <Home products={products} />;
      case '#/shop':
        return <Shop products={products} />;
      case '#/fabrics':
        return <Fabrics products={products} />;
      case '#/tailoring':
        return <Tailoring products={products} />;
      case '#/accessories':
        return <Accessories products={products} />;
      case '#/sale':
        return <Shop products={products} saleOnly heroTitle="The Archive" />;
      case '#/checkout':
        return <Checkout cartItems={cartItems} />;
      default:
        if (path.startsWith('#/product/')) {
          const slug = path.replace('#/product/', '');
          return <ProductDetail products={products} slug={slug} onAddToCart={addToCart} key={slug} />;
        }
        return <Home products={products} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isCartOpen ? 'cart-drawer-open' : ''}`}>
      <Header 
        onCartClick={() => setIsCartOpen(true)} 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
      />
      
      <main className="flex-1 pt-32 md:pt-44">
        {fetchError && (
          <div className="max-w-xl mx-auto mt-20 p-6 bg-red-50 border border-red-100 rounded-lg text-center">
            <h3 className="text-red-800 font-bold mb-2">Connection Error</h3>
            <p className="text-red-600 text-sm mb-4">{fetchError}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded"
            >
              Retry Connection
            </button>
          </div>
        )}

        {isLoading && products.length === 0 && !fetchError ? (
          <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-b-2 border-[#2C3468] rounded-full animate-spin mb-6"></div>
            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-[#2C3468]">Syncing ISA Catalog</p>
          </div>
        ) : (
          <div key={currentRoute} className="animate-fadeIn">
            {renderView()}
          </div>
        )}
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />

      <ChatBot />
      <div className="fixed bottom-8 left-8 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
        <a href="https://wa.me/923142278722" target="_blank" rel="noopener noreferrer">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.431 5.63 1.432h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.414" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default App;
