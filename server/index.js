import express from "express"
import env from "dotenv"
import cors from "cors"

// Import routes
import authRouter from "./routes/auth.js"
import adminRouter from "./routes/admin.js"
import projectsRouter from "./routes/projects.js"

// Import DB connection
import connectDB from "./config/db.js"

// Initialize the environment file
env.config()

// Connect to the database
connectDB()

const app = express()

// CORS setup
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
)

// Middleware
app.use(express.json())

// Connect the routes
app.use("/uploads", express.static("uploads"))
app.use("/auth", authRouter)
app.use("/admin", adminRouter)
app.use("/projects", projectsRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    // Server running message
    console.log(`Server running on http://localhost:${PORT}`)
})