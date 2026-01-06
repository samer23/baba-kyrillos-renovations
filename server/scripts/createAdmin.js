import dotenv from "dotenv"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import Admin from "../models/Admin.js"

// Initialize the environment file
dotenv.config()

mongoose.connect(process.env.MONGO_URI)

(async () => {
  const hashedPassword = await bcrypt.hash("StrongAdminPassword123!", 10)

  await Admin.create({
    email: "admin@babakyrillos.com",
    password: hashedPassword,
  })

  console.log("Admin created")
  process.exit()
})()