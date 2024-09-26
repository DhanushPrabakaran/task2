const express = require("express");
const { allProducts } = require("../controllers/productController");
const router = express.Router();

router.get("/allproducts", allProducts);

module.exports = router;
