const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require("../models/user")

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        console.log("hi")
        if (!authorization) {
            return res.status(401).json({ error: "you must be logged in" })
        }
        const token = req.header('authorization').replace('Bearer ', '')
        console.log("hii", token)
        const decoded = await jwt.verify(token, process.env.APP_SECRET)
        console.log("D", decoded)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log(user)
        if (!user) {
            return res.status(401).json({
                error: "unauthorised Access"
            })
        }

        req.token = token
        req.user = user
        next()
    } catch (err) {
        // console.log("AuthMiddleare ",error)
        res.status(500).json({ errors: [{ msg: err.message }] });
    }
}


