
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('context').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('context').insert([
        { name: "Home" },
        { name: "Work" },
        { name: "School" },
        { name: "Online" }
      ]);
    });
};
