exports.seed = function(knex) {
  const users = [
    {
      username: "jack",
      password: "123",
      phoneNumber: "867-5309"
    },
    {
      username: "diane",
      password: "456",
      phoneNumber: "555-1234"
    }
  ]

  const plants = [
    {
      nickname: "tulip",
      species: "Something Latin",
      h2oFrequency: "Every 2 days",
      user_id: 1
    },
    {
      nickname: "lily",
      species: "Something Latin",
      h2oFrequency: "Every 5 days",
      user_id: 1
    },
    {
      nickname: "orchid",
      species: "Something Latin",
      h2oFrequency: "Every 1 day",
      user_id: 2
    },
  ];

  return knex("users")
    .insert(users)
    .then(() => {
      return knex("plants")
        .insert(plants)
    })
}