import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import type { Product } from '../types';

interface ProductFiltersProps {
  products: Product[];
  selectedCategories: string[];
  priceRange: [number, number];
  onCategoryChange: (categories: string[]) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
}

export function ProductFilters({
  products,
  selectedCategories,
  priceRange,
  onCategoryChange,
  onPriceRangeChange,
  onClearFilters
}: ProductFiltersProps) {
  const categories = ['sesame', 'peanut', 'semolina'];
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const priceRanges = [
    { label: 'Under LKR 200', min: 0, max: 200 },
    { label: 'LKR 200 - 400', min: 200, max: 400 },
    { label: 'LKR 400 - 600', min: 400, max: 600 },
    { label: 'Over LKR 600', min: 600, max: Infinity }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <Button variant="outline" size="sm" onClick={onClearFilters}>
          Clear All
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="mb-3 block">Categories</Label>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <Label htmlFor={category} className="capitalize cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="mb-3 block">Price Range</Label>
          <div className="space-y-2">
            {priceRanges.map((range, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`price-${index}`}
                  checked={priceRange[0] === range.min && priceRange[1] === range.max}
                  onCheckedChange={(checked: any) => {
                    if (checked) {
                      onPriceRangeChange([range.min, range.max]);
                    } else {
                      onPriceRangeChange([minPrice, maxPrice]);
                    }
                  }}
                />
                <Label htmlFor={`price-${index}`} className="cursor-pointer">
                  {range.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="mb-3 block">Availability</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="in-stock" defaultChecked />
              <Label htmlFor="in-stock" className="cursor-pointer">
                In Stock
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="featured" />
              <Label htmlFor="featured" className="cursor-pointer">
                Featured Only
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}