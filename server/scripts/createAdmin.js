import dotenv from "dotenv"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import Admin from "../models/Admin.js"

// Initialize the environment file
dotenv.config()

async  function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI)
  const hashedPassword = await bcrypt.hash("abc123", 10)
  await Admin.create({ email: "samerharten@yahoo.ca", password: hashedPassword })

  console.log("Admin created")
  process.exit()
}

await createAdmin()