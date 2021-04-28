//authenticated users must be able to update their own phone number and password
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('./users-model');
const restricted = require('../auth/auth-middleware');
const { checkUserId } = require('./users-middleware');

router.put('/', restricted, (req, res) => {
  const user_id = req.decoded.subject;

  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;

  Users.update(user_id, user)
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
