// frontend/src/components/pages/ProductsPage.tsx
import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import { ProductCard } from '../ProductCard'
import { ProductFilters } from '../ProductFilters'
import type { Product } from '../../types'

interface ProductsPageProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  onViewProduct: (product: Product) => void
}

export function ProductsPage({
  products = [] as Product[],
  onAddToCart,
  onViewProduct,
}: ProductsPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  const filteredProducts = useMemo(() => {
    const safeArr = Array.isArray(products) ? products : []
    const safeStr = (v?: string | null) => (typeof v === 'string' ? v : '')
    const toPrice = (v: unknown) => (typeof v === 'number' && !Number.isNaN(v) ? v : 0)

    const maxPrice = priceRange?.[1]
    const maxBound = maxPrice === Infinity || typeof maxPrice === 'undefined' ? Infinity : maxPrice

    const search = safeStr(searchTerm).toLowerCase()

    return safeArr.filter((product) => {
      const name = safeStr(product?.name).toLowerCase()
      const desc = safeStr(product?.description).toLowerCase()
      const category = safeStr(product?.category)

      const matchesSearch = (name && name.includes(search)) || (desc && desc.includes(search))

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(category)

      const price = toPrice((product as any)?.price)
      const min = priceRange?.[0] ?? 0
      const max = maxBound
      const matchesPrice = price >= min && price <= max

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [products, searchTerm, selectedCategories, priceRange])

  const handleClearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 1000])
    setSearchTerm('')
  }

  // Helper for stable keys in case id/_id differs
  const getProductKey = (p: any, idx: number) => p?.id ?? p?._id ?? idx

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl mb-4">Our Products</h1>
          <p className="text-muted-foreground mb-6">
            Discover our complete range of traditional Sri Lankan sweets and snacks
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              products={Array.isArray(products) ? products : []}
              selectedCategories={selectedCategories}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategories}
              onPriceRangeChange={setPriceRange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} of {Array.isArray(products) ? products.length : 0}{' '}
                products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={getProductKey(product, idx)}
                    product={product}
                    onAddToCart={onAddToCart}
                    onViewDetails={onViewProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No products found matching your criteria.
                </p>
                <button onClick={handleClearFilters} className="text-primary hover:underline">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
