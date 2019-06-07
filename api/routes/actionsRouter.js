const express = require('express')

const actionsModel = require('../models/actionsModel.js')

const router = express.Router()

router.use(express.json())

router.get('/', async (req, res) => {
    try {
        const actions = await actionsModel.find()
        res.status(200).json(actions)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id',  validateActionId, async (req, res) => {
    try {
        const action = await actionsModel.findById(req.action.id)
        res.status(200).json(action)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.get('/:id/contexts',  validateActionId, async (req, res) => {
    try {
        const action = await actionsModel.findById(req.action.id)
        const actionsContext = await actionsModel.findContextsById(req.action.id)
        const actionWithContexts = {
            ...action,
            contexts: actionsContext
        }
        console.log(actionsContext)
        res.status(200).json(actionWithContexts)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/', validateAction, async (req, res) => {
    try {
        const newAction = await actionsModel.add(req.actionValid)
        res.status(201).json(newAction)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/:id/contexts', validateActionId, validateContextId, async (req, res) => {
    try {
        const actionContextValid = {
            action_id: req.action.id,
            context_id: req.context.id
        }
        const newActionContext = await actionsModel.addActionContext(actionContextValid)
        res.status(201).json(newActionContext)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.put('/:id', validateActionId, validateAction, async (req, res) => {
    try {
        const updatedAction = await actionsModel.update(req.action.id, req.actionValid)
        const numberUpdated = updatedAction
        res.status(200).json({ message: `Number of action(s): ${numberUpdated}` })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.delete('/:id', validateActionId, async (req, res) => {
    try {
        const deleted = await actionsModel.remove(req.params.id)
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


//this is not returning the proper req into the function of removeActionsContext. 

router.delete('/:id/contexts', validateActionId, validateActionsContextId, async (req, res) => {
    try {
        console.log(req.actions_context.id)
        const deletedContext = await actionsModel.removeActionsContext(req.actions_context.id)
        res.status(200).json(deletedContext)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.use(express.json())

async function validateActionId(req, res, next) {
    const action = await actionsModel.findById(req.params.id)
    if (action) {
        req.action = action
        next()
    } else {
        res.status(404).json({
            error: "Could not find a action by that ID"
        })
    }
}

async function validateContextId(req, res, next) {
    if (!isEmpty(req.body)) {
        const context = await actionsModel.findContextById(req.body.context_id)
        if (context) {
            req.context = context
            next()
        } else {
            res.status(404).json({
                error: "Could not find a context by that ID"
            })
        }
    } else {
        res.status(400).json({
            errorMessage: 'Missing required context_id.'
        })
    }
}

async function validateActionsContextId(req, res, next) {
    if (!isEmpty(req.body)) {
        const actions_context = await actionsModel.findActionsContextById(req.body.actions_context_id)
        if (actions_context) {
            req.actions_context = actions_context
            next()
        } else {
            res.status(404).json({
                error: "Could not find an actions_context by that ID"
            })
        }
    } else {
        res.status(400).json({
            errorMessage: 'Missing required context_id.'
        })
    }
}

function validateAction(req, res, next) {
    if (!isEmpty(req.body)) {
        if (req.body.name && req.body.description && req.body.project_id) {
            req.actionValid = {
                name: req.body.name,
                description: req.body.description,
                project_id: req.body.project_id
            }
            next()
        } else {
            res.status(400).json({
                errorMessage: 'Missing required name, description and/or project_id. This schema requires all. Please do not submit any other key:values in this post request!'
            })
        }
    } else {
        res.status(400).json({
            errorMessage: 'Missing action data.'
        })
    }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key)
        )
            return false
    }
    return true
}

module.exports = router