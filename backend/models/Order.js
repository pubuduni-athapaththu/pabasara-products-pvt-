const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        title: String,
        qty: Number,
        price: Number,
      },
    ],
    total: Number,
    status: { type: String, default: 'pending' },
    address: String,
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
