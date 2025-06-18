
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentView: 'store' | 'admin' | 'cart';
  setCurrentView: (view: 'store' | 'admin' | 'cart') => void;
  cartItemsCount: number;
}

const Header = ({ currentView, setCurrentView, cartItemsCount }: HeaderProps) => {
  return (
    <header className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 
              className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
              onClick={() => setCurrentView('store')}
            >
              Mi Tienda Online
            </h1>
          </div>
          
          <nav className="flex items-center space-x-4">
            <Button
              variant={currentView === 'store' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('store')}
              className="hover:bg-blue-50"
            >
              Tienda
            </Button>
            
            <Button
              variant={currentView === 'admin' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('admin')}
              className="hover:bg-blue-50"
            >
              Administrar
            </Button>
            
            <Button
              variant={currentView === 'cart' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('cart')}
              className="relative hover:bg-blue-50"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Carrito
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
