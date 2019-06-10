const express = require('express')

const contextsModel = require('../models/contextsModel.js')

const router = express.Router()

router.use(express.json())

router.get('/', async (req, res) => {
    try {
        const contexts = await contextsModel.find()
        res.status(200).json(contexts)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id',  validateContextId, async (req, res) => {
    try {
        const context = await contextsModel.findById(req.context.id)
        res.status(200).json(context)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/', validateContext, async (req, res) => {
    try {
        const newContext = await contextsModel.add(req.contextValid)
        res.status(201).json(newContext)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.put('/:id', validateContextId, validateContext, async (req, res) => {
    try {
        const updatedContext = await contextsModel.update(req.context.id, req.contextValid)
        const numberUpdated = updatedContext
        res.status(200).json({ message: `Number of context(s): ${numberUpdated}` })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.delete('/:id', validateContextId, async (req, res) => {
    try {
        const deleted = await contextsModel.remove(req.params.id)
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.use(express.json())

async function validateContextId(req, res, next) {
    const context = await contextsModel.findById(req.params.id)
    if (context) {
        req.context = context
        next()
    } else {
        res.status(404).json({
            error: "Could not find a context by that ID"
        })
    }
}

function validateContext(req, res, next) {
    if (!isEmpty(req.body)) {
        if (req.body.name) {
            req.contextValid = {
                name: req.body.name
            }
            next()
        } else {
            res.status(400).json({
                errorMessage: 'Missing required name. Please do not submit any other key:values in this post request!'
            })
        }
    } else {
        res.status(400).json({
            errorMessage: 'Missing context data.'
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