const Products = require("../models/Products");
const solrClient = require("../config/solr");

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
    res.status(500).send("server error in getting all products");
  }
};
exports.allProductsWithSolrSearch = async (req, res) => {
  const { limit = 20, offset = 0, search = "" } = req.query;

  try {
    // Build the query for Solr
    const query = solrClient
      .createQuery()
      .q(search ? `*${search}*` : "*:*") // Search by product name or fetch all if search is empty
      .qop("OR") // Use OR between words (default in edismax)
      .defType("edismax") // Use edismax parser
      .qf({
        product_name: 0.2,
        category: 0.3,
        stock: 0.4,
        current_price: 0.5,
        discount_price: 1.1,
        description: 1.2,
      })
      .start(offset) // Use the offset for pagination
      .rows(limit); // Use the limit for pagination size
    console.log(query);
    // Execute the Solr search
    solrClient.search(query, (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Solr query error", details: err });
      }

      const products = result.response.docs; // Extract products from Solr response
      const totalProducts = result.response.numFound; // Get total number of products

      // Send response with products and total count
      res.status(200).json({
        data: products,
        total: totalProducts,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error in getting all products with Solr");
  }
};

exports.allProductsWithoutLimit = async (req, res) => {
  try {
    const allProducts = await Products.allProductsWithoutLimit();
    const totalProducts = await Products.getTotalProductCount("");

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
    res.status(500).send("server error in getting all products");
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
