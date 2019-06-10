const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findById,
    findActionsById,
    add,
    update,
    remove
}

function find() {
    return db('projects')
}

function findById(id) {
    return db('projects')
        .where({ id })
        .first()
}

function findActionsById(projectId) {
    return db('actions')
        .join('projects', 'actions.project_id', 'projects.id')
        .select('actions.id', 'actions.name')
        .where({ project_id: projectId })
}

async function add(project) {
    const [id] = await db('projects').insert(project)

    return findById(id)
}

function update(id, changes) {
    return db('projects')
        .where({ id })
        .update(changes, '*')
}

function remove(id) {
    return db('projects')
        .where({ id })
        .del()
}