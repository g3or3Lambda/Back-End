const router = require('express').Router();
const Plants = require('./plants-model');

router.get('/', (req, res) => {
    Plants.find()
        .then(plants => {
            res.status(200).json(plants)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.get('/:id', (req, res) => {

})

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router;