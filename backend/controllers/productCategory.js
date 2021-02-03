const ProductCategory = require('../models/productCategorySchema');


exports.createProductCategory = async (req, res) => {
    try {

        const category = new ProductCategory(req.body);
        const new_category = await category.save()
        res.status(200).json({ new_category })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server issue" })
    }

}


exports.totalProductCategory = (req, res) => {
    ProductCategory.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
};

exports.read = (req, res) => {
    return res.json(req.category);
};


exports.productCategoryById = (req, res, next, id) => {
    ProductCategory.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category does not exist"
            });
        }
        req.category = category;
        next();
    });
};


