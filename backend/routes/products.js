const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const { auth, requireManager } = require('../middleware/auth')

// public: get products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    const mapped = products.map((p) => ({
      id: p._id.toString(),
      name: p.title, // map title -> name
      description: p.description,
      price: p.price,
      image: p.images?.[0] || '', // take first image
      category: p.category,
      stock: p.stock,
      featured: false, // default for now
    }))
    res.json(mapped)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// public: get product by id
router.get('/:id', async (req, res) => {
  const p = await Product.findById(req.params.id)
  if (!p) return res.status(404).json({ message: 'Not found' })
  res.json(p)
})

// manager: create
router.post('/', async (req, res) => {
  try {
    const { name, price, description, image, stock } = req.body
    const product = new Product({ name, price, description, image, stock })
    await product.save()
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// manager: update
router.put('/:id', auth, requireManager, async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(p)
})

// manager: delete
router.delete('/:id', auth, requireManager, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.json({ success: true })
})

module.exports = router
