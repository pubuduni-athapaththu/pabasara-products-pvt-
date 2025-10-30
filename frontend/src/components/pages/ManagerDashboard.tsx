import React from 'react'
import { Package, TrendingUp, Users, AlertTriangle, Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import * as Tabs from '@radix-ui/react-tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import type { Product, Order, InventoryStats } from '../../types'

interface ManagerDashboardProps {
  products: Product[]
  orders: Order[]
  onAddProduct: () => void
  onEditProduct: (product: Product) => void
  onDeleteProduct: (productId: string) => void
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void
}

export function ManagerDashboard({
  products,
  orders,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
}: ManagerDashboardProps) {
  const formatPrice = (price: number) => `LKR ${price.toFixed(2)}`
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  const stats: InventoryStats = {
    totalProducts: products.length,
    lowStock: products.filter((p) => p.stock <= 10 && p.stock > 0).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === 'pending').length,
    totalRevenue: orders
      .filter((o) => o.status === 'completed')
      .reduce((sum, order) => sum + order.total, 0),
  }

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

  const getStockStatusColor = (stock: number) => {
    if (stock === 0) return 'bg-red-100 text-red-800'
    if (stock <= 10) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return 'Out of Stock'
    if (stock <= 10) return 'Low Stock'
    return 'In Stock'
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl mb-2">Manager Dashboard</h1>
            <p className="text-muted-foreground">
              Manage products, inventory, and orders for Pabasara Products.
            </p>
          </div>
          <Button onClick={onAddProduct} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-semibold">{stats.totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-semibold text-yellow-600">{stats.lowStock}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-semibold text-red-600">{stats.outOfStock}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-semibold">{stats.totalOrders}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-semibold text-yellow-600">{stats.pendingOrders}</p>
              </div>
              <Package className="h-8 w-8 text-yellow-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-semibold">{formatPrice(stats.totalRevenue)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs.Root defaultValue="inventory" className="space-y-6">
          <Tabs.List className="grid w-full grid-cols-3">
            <Tabs.Trigger value="inventory">Inventory Management</Tabs.Trigger>
            <Tabs.Trigger value="orders">Order Management</Tabs.Trigger>
            <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
          </Tabs.List>

          {/* Inventory Management */}
          <Tabs.Content value="inventory" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Inventory Management</h2>
              <Button onClick={onAddProduct}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{product.category}</TableCell>
                        <TableCell>{formatPrice(product.price)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge className={getStockStatusColor(product.stock)}>
                            {getStockStatus(product.stock)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onEditProduct(product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onDeleteProduct(product.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Tabs.Content>

          {/* Order Management */}
          <Tabs.Content value="orders" className="space-y-6">
            <h2 className="text-2xl">Order Management</h2>
            {/* Render orders table here, same as your original code */}
          </Tabs.Content>

          {/* Analytics */}
          <Tabs.Content value="analytics" className="space-y-6">
            <h2 className="text-2xl">Analytics & Reports</h2>
            {/* Render analytics cards here, same as your original code */}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}
