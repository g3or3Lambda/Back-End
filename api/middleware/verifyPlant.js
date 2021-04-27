const Plants = require("../plants/plants-model")


module.exports = (req, res, next) => {
    const { id } = req.params;
    const user_id = req.decoded.subject;
    Plants.findById(id)
        .then(plant => {
            if (plant.user_id == user_id) {
                req.plant = plant
                next()
            } else {
                res.status(400).json({ message: "Stop right there this is not your plant" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err })
        })
};