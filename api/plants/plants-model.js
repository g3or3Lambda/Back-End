const db = require('../data/db-config');

function find() {
    return db('plants')
}

const findById = (plant_id) => {
    return db('plants')
        .where("plant_id", plant_id)
        .first()
}

const add = async (newPlant) => {
    const [plant_id] = await db('plants').insert(newPlant, "plant_id");
    console.log(plant_id)
    return findById(plant_id)
}

const update = async (id, updatedPlant) => {
    await db('plants').update(updatedPlant).where("plant_id", id);
    return findById(id);
}

const remove = async (id) => {
    return db('plants').where("plant_id", id).del();
}


module.exports = {
    find,
    findById,
    add,
    update,
    remove
}