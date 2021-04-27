//authenticated users must be able to update their own phone number and password
const router = require('express').Router()
const Users = require('./users-model')
const restricted = require('../auth/auth-middleware')

router.put('/:id', restricted, (req, res) => {
  const { id } = req.params
  const changes = req.body
  Users.update(id, changes)
    .then((updated) => {
      res.status(200).json(updated)
    })
    .catch((err) => {
      res.status(500).json({ message: err.message })
    })
})

module.exports = router
