const express = require("express");
const {
  allProducts,
  CategoryProducts,
  allProductsWithoutLimit,
  allProductsWithSolrSearch,
} = require("../controllers/productController");
const router = express.Router();

router.get("/allproductsolr", allProductsWithSolrSearch);
router.get("/allprdouctsWithoutLimit", allProductsWithoutLimit);
router.get("/allproducts", allProducts);
router.get("/category/:category", CategoryProducts);
module.exports = router;
