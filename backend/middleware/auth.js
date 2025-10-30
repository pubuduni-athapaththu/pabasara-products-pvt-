const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: 'No token' })
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload // { id, role, iat, exp }
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

function requireManager(req, res, next) {
  if (req.user && (req.user.role === 'manager' || req.user.role === 'admin')) return next()
  return res.status(403).json({ message: 'Requires manager role' })
}

module.exports = { auth, requireManager }
