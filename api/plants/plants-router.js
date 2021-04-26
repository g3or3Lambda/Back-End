const router = require('express').Router();
const Plants = require('./plants-model');

router.get('/', (req, res, next) => {
    Plants.find()
        .then(plants => {
            res.status(200).json(plants)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Plants.findById(id)
        .then(plant => {
            res.status(200).json(plant);
        })
        .catch(next)
})

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

router.use((err, req, res, next) => {// eslint-disable-line
    res.status(req.status || 500).json({
        message: "Something went terribly wrong.",
        error: err.message,
        stack: err.stack,
        err: err
    })
})

module.exports = router;