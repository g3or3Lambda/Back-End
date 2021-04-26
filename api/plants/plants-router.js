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

router.post('/', (req, res, next) => {
    const body = req.body;
    Plants.add(body)
        .then(newPlant => {
            res.status(200).json(newPlant);
        })
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    const body = req.body;
    const { id } = req.params;
    Plants.update(id, body)
        .then(newPlant => {
            res.status(200).json(newPlant);
        })
        .catch(next)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Plants.remove(id).then(response => {
        res.status(200).json(response);
    })
});

router.use((err, req, res, next) => {// eslint-disable-line
    res.status(req.status || 500).json({
        message: "Something went terribly wrong.",
        error: err.message,
        stack: err.stack,
        err: err
    })
})

module.exports = router;