const express = require("express");
const router = express.Router();
const User = require('../models/user');
const { userById } = require('../controllers/user');
const auth = require('../middleware/index')
const { userRegister, userLogin } =
    require("../controllers/user");

router.post('/reg', userRegister);
router.post('/log', userLogin);

router.get('/user', auth, async (req, res) => {

    try {
        let user = await User.findById(req.user._id).select('-password');
        res.status(200).json({
            user: user
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
})


module.exports = router