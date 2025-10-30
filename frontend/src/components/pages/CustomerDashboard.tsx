import { useEffect, useState } from 'react'
import { ShoppingBag, Clock, User, Package } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Badge } from '../ui/badge'
import { ProductCard } from '../ProductCard'
import API from '../../api/api'
import type { User as UserType, Product, Order } from '../../types'

export function CustomerDashboard() {
  const [user, setUser] = useState<UserType | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) Get user + token from localStorage (set at login)
        const token = localStorage.getItem('auth_token') || localStorage.getItem('token') || ''
        const userJson = localStorage.getItem('current_user')

        if (!token || !userJson) {
          setError('⚠️ Please login to view your dashboard.')
          setLoading(false)
          return
        }

        API.defaults.headers.common.Authorization = `Bearer ${token}`
        const parsedUser = JSON.parse(userJson) as UserType
        setUser(parsedUser)

        // 2) Try to fetch orders (ignore 404 gracefully)
        try {
          const ordersRes = await API.get('/orders/my-orders') // adjust if your backend differs
          const list = Array.isArray(ordersRes.data) ? ordersRes.data : ordersRes.data?.orders ?? []
          setOrders(list)
        } catch (e: any) {
          if (e?.response?.status === 404) {
            // orders endpoint not available yet — just show empty state
            setOrders([])
          } else if (e?.response?.status === 401 || e?.response?.status === 403) {
            setError('You are not authorized to view orders.')
            setLoading(false)
            return
          } else {
            // other errors: keep dashboard usable
            setOrders([])
          }
        }

        // 3) Fetch products (recommendations)
        try {
          const productsRes = await API.get('/products')
          const list = Array.isArray(productsRes.data)
            ? productsRes.data
            : productsRes.data?.products ?? []
          setRecommendedProducts(list)
        } catch {
          setRecommendedProducts([])
        }
      } catch (err) {
        console.error('❌ Failed to load dashboard:', err)
        setError('Unable to load dashboard. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatPrice = (price: number) => `LKR ${price.toFixed(2)}`
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) return <p className="p-6 text-center">Loading dashboard...</p>
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>
  if (!user) return <p className="p-6 text-center">No user data available.</p>

  const customerStats = {
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, o) => sum + (o.total || 0), 0),
    pendingOrders: orders.filter((o) => o.status === 'pending').length,
    completedOrders: orders.filter((o) => o.status === 'completed').length,
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">
            Manage your orders and discover new products from Pabasara Products.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-semibold">{customerStats.totalOrders}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-semibold">{formatPrice(customerStats.totalSpent)}</p>
                </div>
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Orders</p>
                  <p className="text-2xl font-semibold">{customerStats.pendingOrders}</p>
                </div>
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-semibold">{customerStats.completedOrders}</p>
                </div>
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="recommendations">Recommended for You</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Order History</h2>
              <Button onClick={() => console.log('Navigate: products')}>Browse Products</Button>
            </div>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">Order #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            Placed on {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between items-center">
                            <span className="text-sm">
                              {item.product.name} × {item.quantity}
                            </span>
                            <span className="text-sm">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div>
                          <p className="text-sm text-muted-foreground">Delivery Address:</p>
                          <p className="text-sm">{order.address}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total:</p>
                          <p className="font-semibold">{formatPrice(order.total)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start shopping to see your order history here.
                  </p>
                  <Button onClick={() => console.log('Navigate: products')}>Browse Products</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div>
              <h2 className="text-2xl mb-4">Recommended for You</h2>
              <p className="text-muted-foreground mb-6">
                Based on your previous purchases and popular items.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => console.log('Add to cart:', product)}
                  onViewDetails={() => console.log('View product:', product)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl mb-6">Profile Information</h2>

            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Name</label>
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Account Type</label>
                    <p className="capitalize">{user.role}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Member Since</label>
                    <p>January 2024</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p>Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about orders and promotions
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p>Delivery Preferences</p>
                    <p className="text-sm text-muted-foreground">
                      Set default delivery address and time slots
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
