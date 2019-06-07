
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        { 
          name: 'Project Initialization-1', 
          description: 'In order to begin our project, we must first open our IDE. By typing into the command terminal npm init or yarn install, we can begin to create the necessary files to start a new project!',
          project_id: 1
        },
        { 
          name: 'Project Initialization-2', 
          description: 'Now that we have a package.json file, we can begin to add all of the dependencies needed for our project. this can be done by typing npm i sqlite3 in the command terminal, we would install the sqlite3 dependency. This would be saved in our package.json',
          notes: 'If you were not able to create a package.json file, it is vitally important to research this subject. There are many guides on how to properly initialize your project with the command nmp init',
          project_id: 1
        }
      ]);
    });
};
