const db = require('../data/db-config');

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
    const [id] = await db('users').insert(user);
    return findById(id);
}

function update(id, changes) {
    return db('users')
        .select('user_id', 'username', 'password', 'phoneNumber')
        .where('user_id', id)
        .update(changes)
}

module.exports = {
    findById,
    add,
    findBy,
    update
}