import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import  type { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  showAddToCart?: boolean;
}

export function ProductCard({ product, onAddToCart, onViewDetails, showAddToCart = true }: ProductCardProps) {
  const formatPrice = (price: number) => `LKR ${price.toFixed(2)}`;

  const categoryColors = {
    sesame: 'bg-amber-100 text-amber-800',
    peanut: 'bg-orange-100 text-orange-800',
    semolina: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
          <Badge className={`absolute top-2 right-2 ${categoryColors[product.category]}`}>
            {product.category}
          </Badge>
          {product.stock <= 10 && product.stock > 0 && (
            <Badge variant="destructive" className="absolute bottom-2 left-2">
              Low Stock: {product.stock}
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="destructive" className="absolute bottom-2 left-2">
              Out of Stock
            </Badge>
          )}
        </div>
        <div className="p-4">
          <h3 className="mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="text-lg font-semibold text-primary">
            {formatPrice(product.price)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onViewDetails(product)}
        >
          <Eye className="w-4 h-4 mr-2" />
          Details
        </Button>
        {showAddToCart && (
          <Button
            className="flex-1"
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}