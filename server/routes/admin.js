import express from 'express'
import fs from "fs"
import path from "path"
import multer from "multer"
import convert from "heic-convert";

// Import the project model
import Project from '../models/Project.js'

// Import the auth middleware
import authMiddleware from '../middleware/authMiddleware.js'

// Define the router
const adminRouter = express.Router()

const uploadDir = path.join(process.cwd(), "uploads")

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

// Define the allowed extebsnsions for image uploads
const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"]

async function convertHeicToJpg(filePath) {
  try {
    // convert
    const inputBuffer = fs.readFileSync(filePath);

    const outputBuffer = await convert({
      buffer: inputBuffer,
      format: "JPEG",
      quality: 0.9,
    });

    const newPath = filePath.replace(/\.(heic|heif)$/i, ".jpg");

    fs.writeFileSync(newPath, outputBuffer);
    fs.unlinkSync(filePath); // delete original HEIC

    return path.basename(newPath); // return filename only
  } catch (err) {
    console.error("Conversion failed:", err);
  }
}

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (file.mimetype.startsWith("image/") || allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB
})

function deleteImageFile(imagePath) {
  const filePath = path.join(process.cwd(), "uploads", imagePath)
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting image file:", err)
      } else {
        console.log("Image file deleted:", filePath)
      }
    })
  }
}

adminRouter.get("/get-projects", authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find()
        res.json({ projects: projects, message: "Projects fetched successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

adminRouter.post("/add-project", authMiddleware, (req, res, next) => upload.single("image")(req, res, next), async (req, res) => {
    try {
      const { progress, title, location, description } = req.body

      if (!req.file || !progress || !title || !location || !description) {
        return res.status(400).json({ message: "Missing required fields" })
      }

      let imagePath = req.file.filename

      // convert if heic/heif
      const ext = path.extname(req.file.filename).toLowerCase()
      if (ext === ".heic" || ext === ".heif") {
        const fullPath = path.join(process.cwd(), "uploads", req.file.filename)
        try {
          imagePath = await convertHeicToJpg(fullPath)
        } catch (err) {
          console.error("HEIC conversion failed:", err)
        }
      }

      const project = new Project({ progress, title, location, description, imagePath })

      await project.save()

      res.status(201).json({ message: "Project added successfully" })
    } catch (error) {
      console.error("ADD PROJECT ERROR:", error)
      res.status(500).json({ message: error.message })
    }
  }
)

adminRouter.put("/update-project", authMiddleware, upload.single("image"), async (req, res) => {
    try {
        const { _id, progress, title, location, description } = req.body

        if (!progress || !title || !location || !description) {
          return res.status(400).json({ message: "Missing required fields" })
        }

        // Remove the old image file from the uploads directory
        const project = await Project.findById(_id)
        if (!project) {
          return res.status(404).json({ message: "Project not found" })
        }

        // Update the project details in the database
        if (req.file) { 
          // New image uploaded, update imagePath
          deleteImageFile(project.imagePath);

          let imagePath = req.file.filename;

          const ext = path.extname(req.file.filename).toLowerCase();
          if (ext === ".heic" || ext === ".heif") {
            const fullPath = path.join(process.cwd(), "uploads", req.file.filename);
            imagePath = await convertHeicToJpg(fullPath);
          }

          await Project.findByIdAndUpdate(_id, { progress, title, location, description, imagePath });
        } else {
          await Project.findByIdAndUpdate(_id, { progress, title, location, description })
        }
        
        res.json({ message: "Project updated successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

adminRouter.delete("/remove-project/:_id", authMiddleware, async (req, res) => {
  try {
    // Get the _id of the project to be deleted from the request body
    const { _id } = req.params

    // Get the project from the database
    const project = await Project.findById(_id)
    if (!project) {
        return res.status(404).json({ message: "Project not found" })
    }

    // Delete the image file from the uploads directory
    deleteImageFile(project.imagePath)

    // Delete the project from the database
    await Project.findByIdAndDelete(_id)

    // Return response
    res.json({ message: "Project deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default adminRouter