const db = require('../data/db-config');

function find() {
    return db('plants')
}

const findById = (plant_id) => {
    return db('plants')
        .where("plant_id", plant_id)
        .first()
}


module.exports = {
    find,
    findById,
}