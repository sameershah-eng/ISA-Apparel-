
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
          
          return {
            id: p.id,
            slug: p.slug || `p-${p.id}`,
            title: p.title || 'Untitled',
            category: categoryName,
            price: p.price ? parseFloat(p.price.toString()) : 0,
            description: p.description || '',
            longDescription: p.long_description || '',
            images: Array.isArray(p.product_images)
              ? p.product_images.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)).map((img: any) => img.url)
              : [],
            sizes: Array.isArray(p.product_variants)
              ? Array.from(new Set(p.product_variants.map((v: any) => v.size))).filter(Boolean) as string[]
              : [],
            colors: Array.isArray(p.product_variants)
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

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  const renderView = () => {
    const path = currentRoute.split('?')[0]; 
    if (isLoading && products.length === 0) return <div className="h-screen" />;

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
    <div className={`min-h-screen flex flex-col ${isCartOpen ? 'cart-drawer-open' : ''}`}>
      <Header 
        onCartClick={() => setIsCartOpen(true)} 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        products={products}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <main className="flex-1 pt-[80px] md:pt-44">
        {fetchError ? (
          <div className="max-w-xl mx-auto mt-20 p-8 text-center animate-fadeIn">
            <h3 className="text-xl font-serif italic text-slate-800 mb-2">Service Offline</h3>
            <p className="text-slate-500 text-sm mb-8 font-light">{fetchError}</p>
            <button onClick={() => window.location.reload()} className="px-8 py-3 bg-[#2C3468] text-white text-[10px] uppercase font-bold tracking-widest shadow-xl">Retry</button>
          </div>
        ) : isLoading && products.length === 0 ? (
          <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-t-2 border-[#2C3468] rounded-full animate-spin"></div>
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
    </div>
  );
};

export default App;
