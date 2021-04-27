const router = require('express').Router();
const verifyPlant = require('../middleware/verifyPlant');
const Plants = require('./plants-model');

router.get('/', (req, res, next) => {
  let user_id = req.decoded.subject;
  Plants.findByUserId(user_id)
    .then((plants) => {
      res.status(200).json(plants)
    })
    .catch(next)
})

router.get('/:id', verifyPlant, (req, res) => {
  const plant = req.plant
  res.status(200).json(plant)
})

router.post('/', (req, res, next) => {
  const body = req.body
  const decoded = req.decoded;
  const plantToAdd = { ...body, user_id: decoded.user_id };
  Plants.add(plantToAdd)
    .then((newPlant) => {
      res.status(201).json(newPlant)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  const body = req.body
  const { id } = req.params
  const decoded = req.decoded;
  const plantToUpdate = { ...body, user_id: decoded.user_id };
  Plants.update(id, plantToUpdate)
    .then((newPlant) => {
      res.status(200).json(newPlant)
    })
    .catch(next)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  Plants.remove(id).then((response) => {
    res.status(200).json(response)
  })
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(req.status || 500).json({
    message: 'Something went terribly wrong.',
    error: err.message,
    stack: err.stack,
    err: err,
  })
})

module.exports = router
