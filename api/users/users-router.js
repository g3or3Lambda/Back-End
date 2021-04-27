//authenticated users must be able to update their own phone number and password
const router = require('express').Router()
const Users = require('./users-model')
const restricted = require('../auth/auth-middleware')
const { checkUserId } = require('./users-middleware')

router.put('/:id', restricted, checkUserId, (req, res) => {
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

router.get('/', restricted, (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      res.status(500).json({ message: err.message })
    })
})

router.get('/:id', restricted, checkUserId, (req, res) => {
  const { id } = req.params
  Users.findById(id)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      res.status(500).json({ message: err.message })
    })
})

module.exports = router
