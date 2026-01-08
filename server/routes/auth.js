import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// Import the admin model
import Admin from '../models/Admin.js'

// Define the router
const loginRouter = express.Router()

// Login route
loginRouter.post('/login', async (req, res) => {
    
    // Get the email and password from the request body
    const { email, password } = req.body

    // Check if the email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' })
    }

    // Find the admin by email
    const admin = await Admin.findOne({ email }).select("+password")
    if (!admin) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    // Sign the JWT token
    const token = jwt.sign(
        { id: admin._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,        // true in production (HTTPS)
        sameSite: "lax",
        maxAge: 12 * 60 * 60 * 1000,
    })

    res.json({ message: "Login successful" })
})

// Logout route
loginRouter.post('/logout', (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    })
    res.json({ message: "Logged out" })
})

export default loginRouter