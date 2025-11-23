const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const { auth, requireManager } = require('../middleware/auth')

// ===============================
// PUBLIC: GET ALL PRODUCTS
// ===============================
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()

    // Map MongoDB product → frontend product structure
    const mapped = products.map((p) => ({
      id: p._id.toString(),
      name: p.title, // backend uses title → UI uses name
      description: p.description,
      price: p.price,
      image: p.images?.[0] || '', // take first image
      category: p.category,
      stock: p.stock,
      featured: p.featured || false,
    }))

    res.json(mapped)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ===============================
// PUBLIC: GET PRODUCT BY ID
// ===============================
router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id)
    if (!p) return res.status(404).json({ message: 'Not found' })

    res.json({
      id: p._id.toString(),
      name: p.title,
      description: p.description,
      price: p.price,
      image: p.images?.[0] || '',
      category: p.category,
      stock: p.stock,
      featured: p.featured || false,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ===============================
// MANAGER: CREATE PRODUCT
// ===============================
router.post('/', async (req, res) => {
  try {
    const { title, name, description, price, images, image, stock, category } = req.body

    const product = new Product({
      title: title || name, // frontend sends name → db expects title
      description,
      price,
      images: images || (image ? [image] : []), // always array
      stock,
      category,
    })

    const saved = await product.save()
    res.json(saved)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ===============================
// MANAGER: UPDATE PRODUCT
// ===============================
router.put('/:id', auth, requireManager, async (req, res) => {
  try {
    const { title, name, description, price, images, image, stock, category } = req.body

    const updateFields = {
      title: title || name,
      description,
      price,
      images: images || (image ? [image] : []),
      stock,
      category,
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateFields, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ===============================
// MANAGER: DELETE PRODUCT
// ===============================
router.delete('/:id', auth, requireManager, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
