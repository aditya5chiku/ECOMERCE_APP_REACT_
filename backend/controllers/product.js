const Product = require('../models/product');
const AWS = require('aws-sdk');
const fs = require('fs');
require("dotenv").config();
//s3 configure
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.API_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

exports.productAdd = async (req, res) => {

    try {
        let params = {
            Bucket: 'test',
            Key: `product/${req.file.originalname}`,
            Body: fs.createReadStream(req.file.path),
            ACL: 'public-read',
        }
        s3.upload(params, async (err, data) => {
            if (err) {
                res.status(400).json({ errors: [{ msg: err.message }] });
            }

            if (data) {
                fs.unlinkSync(req.file.path);
                let locationUrl = data.Location;
                let addProduct = new Product({ ...req.body, image: locationUrl });
                let response = await addProduct.save()
                res.status(200).json({
                    message: "Product created successfully",
                    response
                })
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


