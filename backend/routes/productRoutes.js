const express = require("express");
const {
  allProducts,
  CategoryProducts,
  allProductsWithoutLimit,
} = require("../controllers/productController");
const router = express.Router();
router.get("/allprdouctsWithoutLimit", allProductsWithoutLimit);
router.get("/allproducts", allProducts);
router.get("/category/:category", CategoryProducts);
module.exports = router;
