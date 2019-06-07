
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        { 
          name: 'Hello World', 
          description: 'This project will teach us how to initialize a new project, and render the message "Hello World" in the terminal and the browser.' 
        }
      ]);
    });
};
