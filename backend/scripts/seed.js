const mongoose = require('mongoose')
require('dotenv').config()
const Product = require('../models/Product')

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany({})
  const products = [
    {
      title: 'Sesame Toffee',
      description: '...',
      price: 250,
      images: [],
      stock: 50,
      category: 'sesame',
    },
    {
      title: 'Roasted Peanuts',
      description: '...',
      price: 180,
      images: [],
      stock: 60,
      category: 'peanut',
    },
  ]
  await Product.insertMany(products)
  console.log('Seeded!')
  process.exit()
})
