import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Star, Shield, Truck } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { ProductCard } from '../ProductCard'
import type { Product } from '../../types'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import API from '../../api/api'

interface HomePageProps {
  featuredProducts?: Product[]
  onAddToCart: (product: Product) => void
  onViewProduct: (product: Product) => void
  onNavigate: (page: string) => void
}

export function HomePage({
  featuredProducts = [],
  onAddToCart,
  onViewProduct,
  onNavigate,
}: HomePageProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [allProducts, setAllProducts] = useState<Product[]>([])

  // Fetch products only if the incoming prop is empty
  useEffect(() => {
    const shouldFetch = !featuredProducts || featuredProducts.length === 0 // fetch when nothing passed
    if (!shouldFetch) return

    const run = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await API.get('/products')
        const list: Product[] = Array.isArray(res.data) ? res.data : res.data?.products ?? []
        setAllProducts(list)
      } catch (e) {
        console.error('Home fetch /products failed:', e)
        setError('Unable to load products.')
        setAllProducts([])
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [featuredProducts])

  // Choose what to show:
  // 1) Use prop if provided; else use fetched list
  // 2) Prefer items explicitly marked featured
  // 3) Only show in-stock items
  // 4) Limit to 3 cards
  const computedFeatured = useMemo(() => {
    const base = featuredProducts && featuredProducts.length > 0 ? featuredProducts : allProducts

    // explicit featured first
    const featuredFromBase = base.filter((p: any) => p?.featured === true)

    // if none marked featured, fall back to latest
    const pool =
      featuredFromBase.length > 0
        ? featuredFromBase
        : [...base].sort((a: any, b: any) => {
            const ad = a?.createdAt ? new Date(a.createdAt).getTime() : 0
            const bd = b?.createdAt ? new Date(b.createdAt).getTime() : 0
            return bd - ad
          })

    // only in-stock, top 3
    return pool.filter((p: any) => (p?.stock ?? 0) > 0).slice(0, 3)
  }, [featuredProducts, allProducts])

  const features = [
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Made with the finest ingredients and traditional recipes',
    },
    {
      icon: Shield,
      title: 'Authentic Taste',
      description: 'Preserving traditional flavors with modern hygiene standards',
    },
    {
      icon: Truck,
      title: 'Island-wide Delivery',
      description: 'Fresh products delivered to your doorstep across Sri Lanka',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-primary/5 to-primary/10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl mb-6">
                Premium quality
                <span className="text-primary block"> sweet products</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                With over 20 years of excellence, Pabasara Products stands as a trusted name in
                traditional Sri Lankan sweets. Blending authentic recipes with unmatched quality, we
                continue to share the taste of tradition that generations love.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => onNavigate('products')}>
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => onNavigate('about')}>
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://i.pinimg.com/1200x/7d/f6/d1/7df6d119c421d7e06364bb975bab9df0.jpg"
                alt="Pabasara Products Manufacturing"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Why Choose Pabasara Products?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are committed to delivering the highest quality traditional sweets and snacks,
              maintaining the authentic flavors that have been passed down through generations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured / Latest (max 3, in-stock only) */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl mb-2">
                {computedFeatured.length ? 'Featured Products' : 'Latest Products'}
              </h2>
              <p className="text-muted-foreground">
                Discover our most popular traditional sweets and snacks
              </p>
            </div>
            <Button variant="outline" onClick={() => onNavigate('products')}>
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {loading ? (
            <div className="p-6 text-center">Loading…</div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">{error}</div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
              {computedFeatured.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewProduct}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-4">Ready to Taste Tradition?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of satisfied customers who trust Pabasara Products for authentic Sri
            Lankan sweets and snacks.
          </p>
        </div>
      </section>
    </div>
  )
}
