
exports.up = function(knex, Promise) {
  return knex.schema
      .createTable('actions_context', table => {
          table.increments()
  
            table
                .integer('action_id')
                .unsigned()
                .references('id')
                .inTable('actions')
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')

            table
                .integer('context_id')
                .unsigned()
                .references('id')
                .inTable('context')
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')
            
  
      })
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('actions_context')
};
