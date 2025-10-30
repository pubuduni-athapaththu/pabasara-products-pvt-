export interface User {
  id: string
  email: string
  name: string
  role: 'customer' | 'manager'
  managerId?: string // Optional field for managers only
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'sesame' | 'peanut' | 'semolina'
  stock: number
  featured?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  items: CartItem[]
  total: number
  status: 'pending' | 'completed' | 'cancelled'
  address: string
  createdAt: string
}

export interface InventoryStats {
  totalProducts: number
  lowStock: number
  outOfStock: number
  totalOrders: number
  pendingOrders: number
  totalRevenue: number
}
