import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Plus, Minus, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import type { Product } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';
//import React from 'react'

interface ProductDetailPageProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onGoBack: () => void;
}

export function ProductDetailPage({ product, onAddToCart, onGoBack }: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) => `LKR ${price.toFixed(2)}`;

  const categoryColors = {
    sesame: 'bg-amber-100 text-amber-800',
    peanut: 'bg-orange-100 text-orange-800',
    semolina: 'bg-yellow-100 text-yellow-800'
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onGoBack}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
              <Badge className={`absolute top-4 right-4 ${categoryColors[product.category]}`}>
                {product.category}
              </Badge>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-2xl text-primary">
                  {formatPrice(product.price)}
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">(24 reviews)</span>
                </div>
              </div>
              
              {/* Stock Status */}
              <div className="mb-4">
                {product.stock > 10 ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    In Stock ({product.stock} available)
                  </Badge>
                ) : product.stock > 0 ? (
                  <Badge variant="destructive" className="bg-yellow-100 text-yellow-800">
                    Low Stock ({product.stock} remaining)
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Product Features */}
            <div>
              <h3 className="mb-3">Product Features</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Made with premium local ingredients</li>
                <li>• Traditional Sri Lankan recipe</li>
                <li>• No artificial preservatives</li>
                <li>• Freshly prepared in small batches</li>
                <li>• Perfect for special occasions or daily snacking</li>
              </ul>
            </div>

            <Separator />

            {/* Quantity and Add to Cart */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Quantity</Label>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    className="flex-1"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart - {formatPrice(product.price * quantity)}
                  </Button>
                </div>
              </div>
            )}

            {/* Additional Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <p className="capitalize">{product.category}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Weight:</span>
                    <p>250g</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Shelf Life:</span>
                    <p>3-4 weeks</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Storage:</span>
                    <p>Cool, dry place</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}