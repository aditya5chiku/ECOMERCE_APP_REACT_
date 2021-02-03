
/**
 * @importing :Files from npm 
 */
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const { success, error } = require("consola");
const Product = require('./routes/product')

/**
  * @import  in the database object
  */
const { DB, PORT } = require('./config');
const app = express();
require("dotenv").config();
const User = require('./routes/user')
const ProductCategory = require('./routes/product_category')
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

const applicationStart = async () => {
  try {
    await mongoose.connect(DB, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    success({ message: `Database Connected Successfully\n${DB}` })
    app.listen(PORT, () => success({ message: `Server started on PORT ${PORT}` }))

  } catch (error) {
    error({ message: `Something went wrong during connectivity at ${PORT} error is ${error}` })
  }
}

// middlewares

// routes middleware
app.use("/api", User);
app.use("/api", ProductCategory);
app.use("/api", Product)

applicationStart();