const Products = require("../models/Products");

exports.allProducts = async (req, res) => {
  try {
    const allProducts = await Products.allProducts();
    if (allProducts) {
      return res.status(200).send(
        JSON.stringify({
          data: allProducts,
        })
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server error in getting all producs");
  }
};
// module.exports = allProducts;
