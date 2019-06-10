const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('context')
}

function findById(id) {
    return db('context')
        .where({ id })
        .first()
}

// function findContextsById(actionId) {
//     return db('actions_context')
//         .join('context', 'actions_context.context_id', 'context.id')
//         .select('context.name')
//         .where({ action_id: actionId })
// }

async function add(context) {
    const [id] = await db('context').insert(context)

    return findById(id)
}

function update(id, changes) {
    return db('context')
        .where({ id })
        .update(changes, '*')
}

function remove(id) {
    return db('context')
        .where({ id })
        .del()
}