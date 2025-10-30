import type { Product, Order, User } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Traditional Sesame Balls',
    description: 'Crispy golden sesame balls filled with sweet coconut. A traditional favorite made with authentic recipes.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1685075811420-457c3d2f186b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXNhbWUlMjBiYWxscyUyMHN3ZWV0JTIwdHJlYXRzfGVufDF8fHx8MTc1ODQ3MTM4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'sesame',
    stock: 50,
    featured: true
  },
  {
    id: '2',
    name: 'Crunchy Peanut Brittle',
    description: 'Handcrafted peanut brittle with the perfect balance of sweetness and crunch. Made from premium roasted peanuts.',
    price: 380,
    image: 'https://images.unsplash.com/photo-1730822578580-999d591a1147?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFudXQlMjBicml0dGxlJTIwc25hY2tzfGVufDF8fHx8MTc1ODQ3MTM4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'peanut',
    stock: 35,
    featured: true
  },
  {
    id: '3',
    name: 'Semolina Sweets Delight',
    description: 'Rich and creamy semolina-based sweets infused with cardamom and garnished with pistachios.',
    price: 520,
    image: 'https://images.unsplash.com/photo-1724072013765-bb4773d63d6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1vbGluYSUyMHN3ZWV0cyUyMGRlc3NlcnRzfGVufDF8fHx8MTc1ODQ3MTM4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'semolina',
    stock: 25,
    featured: true
  },
  {
    id: '4',
    name: 'Sesame Seed Bars',
    description: 'Nutritious sesame seed bars packed with energy. Perfect for a healthy snack any time of day.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1617894814622-244a5a817c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXNhbWUlMjBiYWxscyUyMHN3ZWV0JTIwdHJlYXRzfGVufDF8fHx8MTc1ODQ3MTM4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'sesame',
    stock: 60
  },
  {
    id: '5',
    name: 'Honey Roasted Peanuts',
    description: 'Premium peanuts roasted to perfection and glazed with natural honey. A classic snack favorite.',
    price: 290,
    image: 'https://images.unsplash.com/photo-1730822578580-999d591a1147?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFudXQlMjBicml0dGxlJTIwc25hY2tzfGVufDF8fHx8MTc1ODQ3MTM4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'peanut',
    stock: 40
  },
  {
    id: '6',
    name: 'Semolina Halwa Mix',
    description: 'Easy-to-prepare semolina halwa mix. Just add milk and enjoy the authentic taste of homemade halwa.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1724072013765-bb4773d63d6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1vbGluYSUyMHN3ZWV0cyUyMGRlc3NlcnRzfGVufDF8fHx8MTc1ODQ3MTM4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'semolina',
    stock: 15
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customerId: 'customer1',
    customerName: 'John Silva',
    items: [
      { product: mockProducts[0], quantity: 2 },
      { product: mockProducts[1], quantity: 1 }
    ],
    total: 1280,
    status: 'pending',
    address: '123 Main Street, Colombo 03',
    createdAt: '2024-01-15'
  },
  {
    id: 'ORD002',
    customerId: 'customer2',
    customerName: 'Mary Fernando',
    items: [
      { product: mockProducts[2], quantity: 1 }
    ],
    total: 520,
    status: 'completed',
    address: '456 Galle Road, Dehiwala',
    createdAt: '2024-01-14'
  },
  {
    id: 'ORD003',
    customerId: 'customer3',
    customerName: 'David Perera',
    items: [
      { product: mockProducts[3], quantity: 3 },
      { product: mockProducts[4], quantity: 2 }
    ],
    total: 1540,
    status: 'pending',
    address: '789 Kandy Road, Maharagama',
    createdAt: '2024-01-13'
  }
];

export const mockUsers: User[] = [
  {
    id: 'customer1',
    email: 'customer@example.com',
    name: 'John Silva',
    role: 'customer'
  },
  {
    id: 'manager1',
    email: 'manager@pabasara.com',
    name: 'Admin Manager',
    role: 'manager'
  }
];