const express = require("express");
const router = express.Router();
const multer = require('multer')
const { productAdd } = require("../controllers/product")

const auth = require('../middleware/index')

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log("file", file);
        callback(null, "./upload/");
    },
    filename: function (req, file, callback) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        callback(null, fileName);
    }
});

let fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({
    storage: storage,
    limits: {
        fileFilter: fileFilter
    },
});

router.post("/product_add", upload.single('image'), auth, productAdd);
module.exports = router;