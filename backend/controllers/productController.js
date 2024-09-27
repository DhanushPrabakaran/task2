const Products = require("../models/Products");

exports.allProducts = async (req, res) => {
  const { limit = 20, offset = 0, search = "" } = req.query;

  try {
    const allProducts = await Products.allProducts(limit, offset, search);
    const totalProducts = await Products.getTotalProductCount(search);

    if (allProducts) {
      return res.status(200).send(
        JSON.stringify({
          data: allProducts,
          total: totalProducts,
        })
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server error in getting all producs");
  }
};

exports.CategoryProducts = async (req, res) => {
  const { category } = req.params;
  const { limit = 10, offset = 0, search = "" } = req.query;
  try {
    const categoryProducts = await Products.categoryProducts(
      category,
      limit,
      offset,
      search
    );
    const totalProducts = await Products.getTotalProductCountByCategory(
      category,
      search
    );
    if (categoryProducts) {
      return res.status(200).send({
        data: categoryProducts,
        totalCount: totalProducts, // Make sure this key is named `totalCount`
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server error in getting products");
  }
};
