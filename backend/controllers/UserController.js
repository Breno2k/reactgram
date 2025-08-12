const User = require("../models/User")

const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET

// generate user token
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "7d",
    })
}

// register user and sign in
const register = async (req, res) => {
    res.send("Registro");
};

module.exports = {
    register,
}