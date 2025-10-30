require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const fs = require('fs')
const helmet = require('helmet')

// Import routes
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')
const orderRoutes = require('./routes/orders')
const uploadRoutes = require('./routes/uploads')

const app = express()

// ----------------------------
// Ensure uploads folder exists
// ----------------------------
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir)
  console.log('Created uploads folder')
}

// ----------------------------
// Middleware
// ----------------------------
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.use(helmet()) // adds common security headers automatically

// Serve static files from uploads/ with caching (1 year)
app.use(
  '/uploads',
  express.static(uploadsDir, {
    setHeaders: (res, filePath) => {
      res.setHeader('Cache-Control', 'public, max-age=31536000')
      res.setHeader('X-Content-Type-Options', 'nosniff') // fixes warning
    },
  })
)

// ----------------------------
// CORS setup
// ----------------------------
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3003', 'http://localhost:5173']

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true) // allow Postman, curl, mobile apps
      if (allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error('Not allowed by CORS: ' + origin))
    },
    credentials: true,
  })
)

// ----------------------------
// Routes
// ----------------------------
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// ----------------------------
// Connect to MongoDB and start server
// ----------------------------
const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.error('MongoDB connection error:', err.message))
