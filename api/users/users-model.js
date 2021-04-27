const db = require('../data/db-config')

function find() {
  return db('users')
}

function findById(id) {
  return db('users')
    .select('user_id', 'username', 'password', 'phoneNumber')
    .where('user_id', id)
    .first()
}

function findBy(filter) {
  return db('users')
    .select('user_id', 'username', 'password', 'phoneNumber')
    .where(filter)
}

async function add(user) {
  const [id] = await db('users').insert(user, 'user_id')
  return findById(id)
}

async function update(id, changes) {
  await db('users')
    .select('user_id', 'username', 'password', 'phoneNumber')
    .where('user_id', id)
    .update(changes)

  return findById(id)
}

module.exports = {
  find,
  findById,
  add,
  findBy,
  update,
}
