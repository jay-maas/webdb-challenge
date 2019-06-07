
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('projects', table => {
        table.increments()
        
        table
            .string('name', 64)
            .notNullable()
            .unique()

        table
            .string('description', 512) 
            .notNullable()

        table
            .integer('completed')
            .notNullable()
            .defaultTo(0)
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('projects')
};
