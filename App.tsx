
import React, { useState, useEffect, useMemo } from 'react';
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

  // Cart Feedback Notification
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Global Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);

        const { data: dbProducts, error } = await supabase
          .from('products')
          .select(`
            *,
            categories:category_id (name),
            product_images (url, sort_order),
            product_variants (size, color_name, color_hex, stock)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const transformed: Product[] = (dbProducts || []).map(p => {
          let categoryName = 'Uncategorized';
          if (p.categories) {
            categoryName = Array.isArray(p.categories) 
              ? (p.categories[0]?.name || 'Uncategorized') 
              : (p.categories.name || 'Uncategorized');
          }
          
          // CRITICAL: Stable slug generation ensures URL matches lookup
          const generatedSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + p.id.slice(0, 5);
          const slug = p.slug || generatedSlug;
          
          return {
            id: p.id,
            slug: slug,
            title: p.title || 'Untitled Article',
            category: categoryName,
            price: p.price ? parseFloat(p.price.toString()) : 0,
            description: p.description || '',
            longDescription: p.long_description || '',
            images: Array.isArray(p.product_images) && p.product_images.length > 0
              ? p.product_images.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)).map((img: any) => img.url)
              : ['https://images.unsplash.com/photo-1594932224030-9455144cced3?auto=format&fit=crop&w=800&q=80'],
            sizes: Array.isArray(p.product_variants)
              ? Array.from(new Set(p.product_variants.map((v: any) => v.size))).filter(Boolean) as string[]
              : ['32', '34', '36'],
            colors: Array.isArray(p.product_variants)
              ? p.product_variants.reduce((acc: any[], v: any) => {
                  if (v.color_name && !acc.find(c => c.name === v.color_name)) {
                    acc.push({ name: v.color_name, hex: v.color_hex || '#2C3468' });
                  }
                  return acc;
                }, [])
              : [{ name: 'Midnight', hex: '#2C3468' }],
            stock: p.stock || 0
          };
        });

        setProducts(transformed);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setFetchError(err.message || 'Failed to connect to database.');
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const addToCart = (newItemData: Omit<CartItem, 'id'>) => {
    const existingIndex = cartItems.findIndex(item => 
      item.productId === newItemData.productId && 
      item.size === newItemData.size && 
      item.color === newItemData.color
    );

    let finalItem: CartItem;

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      finalItem = updated[existingIndex];
      setCartItems(updated);
    } else {
      const newItem = { ...newItemData, id: Math.random().toString(36).substr(2, 9) };
      finalItem = newItem;
      setCartItems([...cartItems, newItem]);
    }

    setLastAddedItem(finalItem);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3500);
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
    if (isLoading && products.length === 0) return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-t-2 border-[#2C3468] rounded-full animate-spin"></div>
      </div>
    );

    switch (path) {
      case '#/':
      case '':
        return <Home products={products} />;
      case '#/shop':
        return (
          <Shop 
            products={products} 
            externalSearch={searchQuery} 
            onSearchChange={setSearchQuery}
            externalCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        );
      case '#/fabrics':
        return <Fabrics products={products} />;
      case '#/tailoring':
        return <Tailoring products={products} />;
      case '#/accessories':
        return <Accessories products={products} />;
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
    <div className="min-h-screen flex flex-col selection:bg-[#2C3468] selection:text-white">
      <Header 
        onCartClick={() => setIsCartOpen(true)} 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        products={products}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        isAddingToCart={showNotification}
      />
      
      <main className="flex-1 pt-[64px] md:pt-44">
        {fetchError ? (
          <div className="max-w-xl mx-auto mt-20 p-8 text-center">
            <h3 className="text-xl font-serif italic text-slate-800 mb-2">Service Offline</h3>
            <p className="text-slate-500 text-sm mb-8 font-light">{fetchError}</p>
            <button onClick={() => window.location.reload()} className="px-8 py-3 bg-[#2C3468] text-white text-[10px] uppercase font-bold tracking-widest shadow-xl">Retry</button>
          </div>
        ) : (
          <div key={currentRoute}>
            {renderView()}
          </div>
        )}
      </main>

      {/* Floating Success Notification */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:top-24 md:bottom-auto md:right-8 z-[110] w-[92%] md:w-80 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${showNotification ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#2C3468] text-white p-4 shadow-2xl rounded-sm flex gap-4 items-center backdrop-blur-lg">
          <div className="w-12 h-16 bg-white/10 flex-shrink-0">
             <img src={lastAddedItem?.image} className="w-full h-full object-cover rounded-sm" alt="" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[8px] uppercase tracking-widest font-black opacity-60 mb-1">Article Secured</p>
            <h4 className="text-[10px] font-bold uppercase truncate pr-4">{lastAddedItem?.title}</h4>
            <button onClick={() => { setIsCartOpen(true); setShowNotification(false); }} className="text-[9px] uppercase tracking-widest font-bold border-b border-white/20 hover:border-white mt-2 transition-all inline-block">View Bag</button>
          </div>
          <button onClick={() => setShowNotification(false)} className="p-2 opacity-40 hover:opacity-100 transition-opacity absolute top-1 right-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <Footer />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
      <ChatBot />
    </div>
  );
};

export default App;
