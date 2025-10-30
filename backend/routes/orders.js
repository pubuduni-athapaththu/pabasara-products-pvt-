const express = require('express')
const Order = require('../models/Order')
const { auth } = require('../middleware/auth')
const router = express.Router()

router.post('/', auth, async (req, res) => {
  const { items, total, address } = req.body
  const order = await Order.create({ user: req.user.id, items, total, address })
  res.json(order)
})

router.get('/', auth, async (req, res) => {
  // managers/admins could get all orders; users only get their own
  const user = req.user
  if (user.role === 'manager' || user.role === 'admin') {
    const orders = await Order.find().populate('user').sort({ createdAt: -1 })
    return res.json(orders)
  }
  const orders = await Order.find({ user: user.id }).sort({ createdAt: -1 })
  res.json(orders)
})

module.exports = router
