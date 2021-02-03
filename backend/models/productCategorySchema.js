const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("productCategory", productCategorySchema);
