import express from 'express'

// Import the project model
import Project from '../models/Project.js'

// Define the router
const projectsRouter = express.Router()

projectsRouter.get("/get-projects", async (req, res) => {
    try {
        const projects = await Project.find()
        res.json({ projects: projects, message: "Projects fetched successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default projectsRouter