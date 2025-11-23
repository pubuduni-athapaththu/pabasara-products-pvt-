import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { HomePage } from './components/pages/HomePage'
import { ProductsPage } from './components/pages/ProductsPage'
import { AboutPage } from './components/pages/AboutPage'
import { ContactPage } from './components/pages/ContactPage'
import { LoginPage } from './components/pages/LoginPage'
import { ManagerLoginPage } from './components/pages/ManagerLoginPage'
import { ManagerCreateAccountPage } from './components/pages/ManagerCreateAccountPage'
import { ProductDetailPage } from './components/pages/ProductDetailPage'
import { CartPage } from './components/pages/CartPage'
import { CheckoutPage } from './components/pages/CheckoutPage'
import { CustomerDashboard } from './components/pages/CustomerDashboard'
import { ManagerDashboard } from './components/pages/ManagerDashboard'
import { AddEditProductPage } from './components/pages/AddEditProductPage'
import { Toaster } from './components/ui/sonner'
import { mockOrders } from './data/mockData'
import type { User, Product, CartItem, Order } from './types'
import { toast } from 'sonner'
import API from './api/api'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load products from backend
  useEffect(() => {
    API.get('/products')
      .then((res) => setProducts(res.data))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false))
  }, [])

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    setSelectedProduct(null)
    setEditingProduct(null)
  }

  const handleLogin = (user: User) => {
    setCurrentUser(user)
    setCurrentPage(user.role === 'customer' ? 'customer-dashboard' : 'manager-dashboard')
    toast.success(`Welcome back, ${user.name}!`)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCartItems([])
    setCurrentPage('home')
    toast.success('Logged out successfully')
  }

  // ------------------------
  // CART MANAGEMENT
  // ------------------------
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    if (!currentUser) {
      toast.error('Please login to add items to cart')
      setCurrentPage('login')
      return
    }
    if (currentUser.role !== 'customer') {
      toast.error('Only customers can add items to cart')
      return
    }
    if (product.stock < quantity) {
      toast.error('Not enough stock available')
      return
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id)
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity
        if (newQuantity > product.stock) {
          toast.error('Cannot add more items than available stock')
          return prevItems
        }
        toast.success(`Updated ${product.name} quantity`)
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      } else {
        toast.success(`Added ${product.name} to cart`)
        return [...prevItems, { product, quantity }]
      }
    })
  }

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId)
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    )
  }

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
    toast.success('Item removed from cart')
  }

  // ------------------------
  // PRODUCT MANAGEMENT
  // ------------------------

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setCurrentPage('product-detail')
  }

  // ⭐ UPDATED WITH BACKEND (POST + PUT)
  const handleSaveProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      if (editingProduct) {
        const updatePayload = {
          title: productData.name,
          description: productData.description,
          price: productData.price,
          images: productData.image ? [productData.image] : [],
          stock: productData.stock,
          category: productData.category,
        }

        const res = await API.put(`/products/${editingProduct.id}`, updatePayload)

        setProducts((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id
              ? {
                  ...p,
                  id: res.data._id,
                  name: res.data.title,
                  description: res.data.description,
                  price: res.data.price,
                  image: res.data.images?.[0] || '',
                  stock: res.data.stock,
                  category: res.data.category,
                }
              : p
          )
        )

        toast.success('Product updated successfully')
      } else {
        const createPayload = {
          title: productData.name,
          description: productData.description,
          price: productData.price,
          images: productData.image ? [productData.image] : [],
          stock: productData.stock,
          category: productData.category,
        }

        const res = await API.post('/products', createPayload)
        const saved = res.data

        const newProduct: Product = {
          id: saved._id,
          name: saved.title,
          description: saved.description,
          price: saved.price,
          image: saved.images?.[0] || '',
          stock: saved.stock,
          category: saved.category,
        }

        setProducts((prev) => [...prev, newProduct])
        toast.success('Product added successfully')
      }

      setEditingProduct(null)
      setCurrentPage('manager-dashboard')
    } catch (err) {
      console.error(err)
      toast.error('Failed to save product')
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setCurrentPage('add-edit-product')
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId))
    toast.success('Product deleted successfully')
  }

  // ------------------------
  // ORDER MANAGEMENT
  // ------------------------
  const handlePlaceOrder = (orderData: any) => {
    if (!currentUser) return
    const newOrder: Order = {
      id: `ORD${String(Date.now()).slice(-6)}`,
      customerId: currentUser.id,
      customerName: orderData.customer.name,
      items: orderData.items,
      total: orderData.total,
      status: 'pending',
      address: orderData.address,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setOrders((prev) => [...prev, newOrder])
    setCartItems([])
    setCurrentPage('customer-dashboard')
    toast.success('Order placed successfully!')
  }

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
    toast.success(`Order ${orderId} ${status}`)
  }

  const userOrders = currentUser ? orders.filter((o) => o.customerId === currentUser.id) : []
  const featuredProducts = products.filter((p) => p.featured)
  const recommendedProducts = products.slice(0, 6)

  if (loading) return <div className="text-center mt-10">Loading products...</div>
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            featuredProducts={
              featuredProducts.length
                ? featuredProducts
                : [
                    {
                      id: '1',
                      name: 'Sample Product',
                      price: 99,
                      featured: true,
                      stock: 10,
                      image: 'https://via.placeholder.com/150',
                      description: 'Fallback product',
                      category: 'sesame',
                    },
                  ]
            }
            onAddToCart={handleAddToCart}
            onViewProduct={handleViewProduct}
            onNavigate={handleNavigate}
          />
        )

      case 'products':
        return (
          <ProductsPage
            products={products}
            onAddToCart={handleAddToCart}
            onViewProduct={handleViewProduct}
          />
        )

      case 'about':
        return <AboutPage />

      case 'contact':
        return <ContactPage />

      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onNavigateToManager={() => setCurrentPage('manager-login')}
          />
        )

      case 'manager-login':
        return (
          <ManagerLoginPage
            onLogin={handleLogin}
            onGoBack={() => setCurrentPage('login')}
            onNavigateToManagerRegister={() => setCurrentPage('manager-register')}
          />
        )

      case 'manager-register':
        return (
          <ManagerCreateAccountPage
            onLogin={handleLogin}
            onGoBack={() => setCurrentPage('manager-login')}
          />
        )

      case 'product-detail':
        return selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onGoBack={() => setCurrentPage('products')}
          />
        ) : (
          <div className="text-center mt-10">No product selected</div>
        )

      case 'cart':
        return (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onGoBack={() => setCurrentPage('products')}
            onProceedToCheckout={() => setCurrentPage('checkout')}
          />
        )

      case 'checkout':
        return (
          <CheckoutPage
            cartItems={cartItems}
            onPlaceOrder={handlePlaceOrder}
            onGoBack={() => setCurrentPage('cart')}
          />
        )

      case 'customer-dashboard':
        if (!currentUser || currentUser.role !== 'customer') {
          return <div className="text-center mt-10 text-red-500">Please login as a customer.</div>
        }
        return <CustomerDashboard />

      case 'manager-dashboard':
        if (!currentUser || currentUser.role !== 'manager') {
          return <div className="text-center mt-10 text-red-500">Unauthorized</div>
        }
        return (
          <ManagerDashboard
            products={products}
            orders={orders}
            onAddProduct={() => {
              setEditingProduct(null)
              setCurrentPage('add-edit-product')
            }}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )

      case 'add-edit-product':
        if (!currentUser || currentUser.role !== 'manager') {
          return <div className="text-center mt-10 text-red-500">Unauthorized</div>
        }
        return (
          <AddEditProductPage
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => setCurrentPage('manager-dashboard')}
          />
        )

      default:
        return <div className="text-center mt-10">Page not found</div>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentUser={currentUser}
        currentPage={currentPage}
        cartItems={cartItems}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      {renderCurrentPage()}
      <Toaster />
    </div>
  )
}
