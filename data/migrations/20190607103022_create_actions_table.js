
exports.up = function(knex, Promise) {
  return knex.schema
        .createTable('actions', table => {
            table.increments()

            table
                .string('name', 64)
                .notNullable()

            table
                .string('description', 512)
                .notNullable()

            table
                .integer('completed')
                .notNullable()
                .defaultTo(0)
            
            table
                .integer('project_id')
                .unsigned()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')

            table
                .string('notes')
      })
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('actions')
};
