const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

const authGuard = (req, res, next) => {

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    // Check if header has a token
    if (!token) return res.status(401).json({ errors: ["Acesso negado!"] })

    // Check token is valid
    try {

        const verified = jwt.verify(token, jwtSecret)

        req.user = User.findById(verified.id).selected("-password")

        next()

    } catch (error) {
        res.status(401).json({ errors: ["Token inválido."] })
    }

}