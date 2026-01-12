import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log("authHeader: ", authHeader)

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authenticated" })
  }

  const token = authHeader.split(" ")[1]
  console.log('token: ', token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("decoded: ", decoded)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }
}

export default authMiddleware