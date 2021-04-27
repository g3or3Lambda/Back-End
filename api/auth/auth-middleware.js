const jwt = require('jsonwebtoken')
const { secret } = require('../data/config/secrets')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    res.status(401).json({ message: 'Token required' })
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Token invalid' })
      } else {
        req.decoded = decoded
        next()
      }
    })
  }
}
