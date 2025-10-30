import { useEffect, useState } from 'react'
import API from '../api/api'
import  type { Product } from '../types'
import { ProductCard } from './ProductCard'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    API.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err))
  }, [])

  const handleAddToCart = (product: Product) => {
    console.log('Add to Cart:', product)
  }

  const handleViewDetails = (product: Product) => {
    console.log('View details:', product)
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
        />
      ))}
    </div>
  )
}
