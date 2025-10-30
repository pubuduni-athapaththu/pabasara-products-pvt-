import { ShoppingCart, User, LogOut, Package, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { User as UserType, CartItem } from '../types';

interface HeaderProps {
  currentUser: UserType | null;
  currentPage: string;
  cartItems: CartItem[];
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Header({ currentUser, currentPage, cartItems, onNavigate, onLogout }: HeaderProps) {
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-primary cursor-pointer"
            >
              Pabasara Products
            </button>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 text-sm ${currentPage === 'home' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('products')}
              className={`px-3 py-2 text-sm ${currentPage === 'products' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              Products
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className={`px-3 py-2 text-sm ${currentPage === 'about' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              About
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className={`px-3 py-2 text-sm ${currentPage === 'contact' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                {currentUser.role === 'customer' && (
                  <button
                    onClick={() => onNavigate('cart')}
                    className="relative p-2 text-muted-foreground hover:text-primary"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {cartItemCount}
                      </Badge>
                    )}
                  </button>
                )}

                {currentUser.role === 'manager' && (
                  <button
                    onClick={() => onNavigate('manager-dashboard')}
                    className="flex items-center space-x-2 p-2 text-muted-foreground hover:text-primary"
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </button>
                )}

                <button
                  onClick={() => onNavigate(currentUser.role === 'customer' ? 'customer-dashboard' : 'manager-dashboard')}
                  className="flex items-center space-x-2 p-2 text-muted-foreground hover:text-primary"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{currentUser.name}</span>
                </button>

                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <Button onClick={() => onNavigate('login')}>Login</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}