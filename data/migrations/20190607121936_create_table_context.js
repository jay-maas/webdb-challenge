
exports.up = function(knex, Promise) {
  return knex.schema
      .createTable('context', table => {
          table.increments()
  
          table
              .string('name', 64)
              .notNullable()
      })
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('context')
};
