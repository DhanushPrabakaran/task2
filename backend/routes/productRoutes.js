const express = require("express");
const {
  allProducts,
  CategoryProducts,
} = require("../controllers/productController");
const router = express.Router();

router.get("/allproducts", allProducts);
router.get("/category/:category", CategoryProducts);
module.exports = router;
