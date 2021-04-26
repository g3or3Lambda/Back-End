exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (tbl) => {
      tbl.increments('user_id')
      tbl.string('username', 200).notNullable().unique()
      tbl.string('password', 200).notNullable()
      tbl.string('phoneNumber', 320).notNullable()
      tbl.timestamps(false, true)
    })
  await knex.schema
    .createTable('plants', (tbl => {
      tbl.increments('plant_id')
      tbl.string('nickname')
      tbl.string('species').notNullable()
      tbl.string('h2oFrequency').notNullable()
      tbl.integer('user_id')
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
    }))
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('plants')
  await knex.schema.dropTableIfExists('users')
}
