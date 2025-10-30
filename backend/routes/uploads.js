const express = require('express')
const multer = require('multer')
const path = require('path')

const router = express.Router()

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')) // save in /uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) // unique name
  },
})

// File filter (accept only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only images are allowed!'), false)
  }
}

const upload = multer({ storage, fileFilter })

// POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
  })
})

module.exports = router
