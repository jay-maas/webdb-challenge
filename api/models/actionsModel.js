const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('actions')
}

function findById(id) {
    return db('actions')
        .where({ id })
        .first()
}

// function findStudentsById(cohortId) {
//     return db('students')
//         .join('actions', 'students.cohort_id', 'actions.id')
//         .select('students.id', 'students.name', 'actions.id as cohortId', 'actions.name as action')
//         .where({ cohort_id: cohortId })
// }

async function add(action) {
    const [id] = await db('actions').insert(action)

    return findById(id)
}

function update(id, changes) {
    return db('actions')
        .where({ id })
        .update(changes, '*')
}

function remove(id) {
    return db('actions')
        .where({ id })
        .del()
}