import express from 'express'
import fs from 'fs'

// Import the project model
import Project from '../models/Project.js'

// Import the auth middleware
import authMiddleware from '../middleware/authMiddleware.js'

// Define the router
const adminRouter = express.Router()

adminRouter.get("/get-projects", authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find()
        res.json(projects)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post("/add-project", authMiddleware, async (req, res) => {
    try {
        // Get the project data from the request body
        const { progress, title, location, description } = req.body

        const project = new Project({ progress, title, location, description })

        await project.save()
        res.status(201).json(project)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.put("/update-project", authMiddleware, async (req, res) => {
    try {
        const { _id, progress, title, location, description } = req.body
        await Project.findByIdAndUpdate(_id, { progress, title, location, description })
        res.json({ message: "Project updated successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.delete("/remove-project", authMiddleware, async (req, res) => {
    // Get the _id of the project to be deleted from the request body
    const { _id } = req.body

    // Delete the project from the database
    await Project.findByIdAndDelete(_id)
    res.json({ message: "Project deleted" })
})

export default adminRouter