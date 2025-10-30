import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import type { CartItem } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';
//import React from 'react'

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onGoBack: () => void;
  onProceedToCheckout: () => void;
}

export function CartPage({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveFromCart, 
  onGoBack,
  onProceedToCheckout 
}: CartPageProps) {
  const formatPrice = (price: number) => `LKR ${price.toFixed(2)}`;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 200;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={onGoBack} className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
          
          <div className="text-center py-16">
            <h1 className="text-3xl mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button onClick={onGoBack}>
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" onClick={onGoBack} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Button>

        <h1 className="text-3xl mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1">{item.product.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {formatPrice(item.product.price)} each
                      </p>
                      <p className="text-muted-foreground text-xs capitalize">
                        Category: {item.product.category}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <div className="mb-2">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveFromCart(item.product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                
                {shipping === 0 && (
                  <p className="text-sm text-green-600">
                    🎉 Free shipping on orders over LKR 1,000
                  </p>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={onProceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
                
                <div className="text-xs text-muted-foreground text-center">
                  Secure checkout powered by SSL encryption
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}