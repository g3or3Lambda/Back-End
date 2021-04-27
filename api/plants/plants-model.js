const db = require('../data/db-config')

function find() {
  return db('plants')
}

function findByUserId(user_id) {
  return db('plants').where('user_id', user_id)
}

const findById = (plant_id) => {
  return db('plants').where('plant_id', plant_id).first()
}

const add = async (newPlant) => {
  const [plant_id] = await db('plants').insert(newPlant, 'plant_id')
  console.log(plant_id)
  return findById(plant_id)
}

const update = async (plant_id, updatedPlant) => {
  await db('plants').update(updatedPlant).where('plant_id', plant_id)
  return findById(plant_id)
}

const remove = async (id) => {
  return db('plants').where('plant_id', id).del()
}

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  findByUserId
}
