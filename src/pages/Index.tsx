
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Cart from "@/components/Cart";
import AdminPanel from "@/components/AdminPanel";
import { Product, CartItem } from "@/types/store";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Producto de Ejemplo",
      price: 25.99,
      image: "/placeholder.svg",
      description: "Este es un producto de ejemplo para mostrar cómo funciona la tienda.",
      category: "Electrónicos"
    }
  ]);
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<'store' | 'admin' | 'cart'>('store');

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    // También remover del carrito si existe
    removeFromCart(productId);
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartItemsCount={cartItemsCount}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'store' && (
          <ProductGrid 
            products={products}
            onAddToCart={addToCart}
          />
        )}
        
        {currentView === 'admin' && (
          <AdminPanel 
            products={products}
            onAddProduct={addProduct}
            onDeleteProduct={deleteProduct}
          />
        )}
        
        {currentView === 'cart' && (
          <Cart 
            cartItems={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
          />
        )}
      </main>
      
      <Toaster />
    </div>
  );
};

export default Index;
