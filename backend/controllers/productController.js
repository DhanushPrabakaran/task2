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
      .q(search ? `product_name:*${search}*` : "*:*") // Search by product name or fetch all if search is empty
      .start(offset) // Use the offset for pagination
      .rows(limit); // Use the limit for pagination size

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

// exports.allProductsWithSolrSearch = async (req, res) => {
//    const { limit = 20, offset = 0, search = "" } = req.query;
//   try {
//     const query = solrClient
//       .createQuery()
//       .q("*:*") // Default query if not provided
//       .start(0)
//       .rows(10);

//     solrClient.search(query, (err, result) => {
//       if (err) {
//         console.error(err);
//         return res
//           .status(500)
//           .json({ error: "Solr query error", details: err });
//       }

//       res.json(result.response);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("server error in getting all products");
//   }
// };
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
