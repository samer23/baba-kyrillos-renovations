import express from 'express'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage })

// Import the project model
import Project from '../models/Project.js'

// Import the auth middleware
import authMiddleware from '../middleware/authMiddleware.js'

// Define the router
const adminRouter = express.Router()

adminRouter.get("/get-projects", authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find()
        res.json({ projects: projects, message: "Projects fetched successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

adminRouter.post("/add-project", authMiddleware, upload.array("images", 10), async (req, res) => {
    try {
      const { progress, title, location, description } = req.body
      const project = new Project({
        progress,
        title,
        location,
        description,
        images: req.files
      })

      await project.save()

      res.status(201).json({ message: "Project added successfully" })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
)

adminRouter.put("/update-project", authMiddleware, upload.array("images", 10), async (req, res) => {
    try {
        console.log('req.body:', req.body)
        const { _id, progress, title, location, description } = req.body
        await Project.findByIdAndUpdate(_id, { progress, title, location, description })
        res.json({ message: "Project updated successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

adminRouter.delete("/remove-project/:_id", authMiddleware, async (req, res) => {
    // Get the _id of the project to be deleted from the request body
    const { _id } = req.params

    // Delete the project from the database
    await Project.findByIdAndDelete(_id)
    res.json({ message: "Project deleted" })
})

export default adminRouter