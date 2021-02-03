const User = require("../models/user");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

exports.userRegister = async (req, res) => {
    let { name, password, role, email } = req.body;
    try {
        // check the user exists
        let auth = await User.findOne({ email });
        if (auth) {
            return res.status(400).json({ errors: [{ msg: 'User Already Exists' }] });
        }
        let user = new User({ name, email, password, role })
        let userCreated = await user.save();
        res.send(userCreated)

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ errors: [{ msg: err.message }] });
    }
}

exports.userLogin = async (req, res) => {
    let { email, password } = req.body;
    try {
        // check the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: "Email or password invalid"
            });
        }
        const isMatch = await user.matchPassword(password);

        const token = await user.generateAuthToken()
        if (!isMatch) {
            return res.status(400).json({
                error: "Email or password invalid"
            });
        }

        res.status(200).json({
            message: 'Login sucessfull',
            token: token
        });


    }
    catch (err) {
        console.error(err);
        res.status(500).json({ errors: [{ msg: err.message }] });
    }
}



exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};


exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resourse! Access denied"
        });
    }
    next();
};

