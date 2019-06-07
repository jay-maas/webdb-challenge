const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findById,
    findContextById,
    findActionsContextById,
    findContextsById,
    addActionContext,
    add,
    update,
    remove,
    removeActionsContext
}

function find() {
    return db('actions')
}

function findById(id) {
    return db('actions')
        .where({ id })
        .first()
}

function findContextById(id) {
    return db('context')
        .where({ id })
        .first()
}

function findActionsContextById(id) {
    return db('actions_context')
        .where({ id })
        .first()
}

function findContextsById(actionId) {
    return db('actions_context')
        .join('context', 'actions_context.context_id', 'context.id')
        .select('context.name', 'actions_context.id')
        .where({ action_id: actionId })
}

async function add(action) {
    const [id] = await db('actions').insert(action)

    return findById(id)
}

async function addActionContext(actionContext) {
    const [id] = await db('actions_context').insert(actionContext)

    return findContextsById(id)
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

function removeActionsContext(id) {
    return db('actions_context')
        .where({ id })
        .del()
}