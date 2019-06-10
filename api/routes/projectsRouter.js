const express = require('express')

const projectsModel = require('../models/projectsModel.js')

const router = express.Router()

router.use(express.json())

router.get('/', async (req, res) => {
    try {
        const projects = await projectsModel.find()
        res.status(200).json(projects)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id',  validateProjectId, async (req, res) => {
    try {
        const project = await projectsModel.findById(req.project.id)
        res.status(200).json(project)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.get('/:id/actions',  validateProjectId, async (req, res) => {
    try {
        const project = await projectsModel.findById(req.project.id)
        const projectActions = await projectsModel.findActionsById(req.project.id)
        const projectWithActions = {
            ...project,
            actions: projectActions
        }
        res.status(200).json(projectWithActions)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/', validateProject, async (req, res) => {
    try {
        const newProject = await projectsModel.add(req.projectValid)
        res.status(201).json(newProject)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.put('/:id', validateProjectId, validateProject, async (req, res) => {
    try {
        const updatedProject = await projectsModel.update(req.project.id, req.projectValid)
        const numberUpdated = updatedProject
        res.status(200).json({ message: `Number of project(s): ${numberUpdated}` })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.delete('/:id', validateProjectId, async (req, res) => {
    try {
        const deleted = await projectsModel.remove(req.params.id)
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.use(express.json())

async function validateProjectId(req, res, next) {
    const project = await projectsModel.findById(req.params.id)
    if (project) {
        req.project = project
        next()
    } else {
        res.status(404).json({
            error: "Could not find a project by that ID"
        })
    }
}

function validateProject(req, res, next) {
    if (!isEmpty(req.body)) {
        if (req.body.name && req.body.description) {
            req.projectValid = {
                name: req.body.name,
                description: req.body.description
            }
            next()
        } else {
            res.status(400).json({
                errorMessage: 'Missing required name and/or description. This schema requires both. Please do not submit any other key:values in this post request!'
            })
        }
    } else {
        res.status(400).json({
            errorMessage: 'Missing project data.'
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