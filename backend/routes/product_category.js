const express = require("express");
const router = express.Router();
const { createProductCategory, read, totalProductCategory, productCategoryById } = require('../controllers/productCategory');
const { userById, isAdmin } = require('../controllers/user');

const authentication = require('../middleware/index');

router.post("/category/create/:userId", createProductCategory);
router.get("/category/:categoryId", read);
router.get("/categories", totalProductCategory);

router.param("userId", userById);
router.param("categoryId", productCategoryById);

module.exports = router 