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
// exports.allProductsWithSolrSearch = async (req, res) => {
//   const { limit = 20, offset = 0, search = "" } = req.query;

//   try {
//     // Build the query for Solr
//     const query = solrClient
//       .createQuery()
//       .q(search ? `${search}*` : "*:*") // Search by product name or fetch all if search is empty
//       .qop("OR") // Use OR between words (default in edismax)
//       .defType("edismax") // Use edismax parser
//       .qf({
//         product_name: 2.0,
//         category: 1.8,
//         current_price: 1.4,
//         discount_price: 1.5,
//         description: 1.9,
//       })
//       .start(offset) // Use the offset for pagination
//       .rows(limit); // Use the limit for pagination size
//     console.log(query);
//     // Execute the Solr search
//     solrClient.search(query, (err, result) => {
//       if (err) {
//         console.error(err);
//         return res
//           .status(500)
//           .json({ error: "Solr query error", details: err });
//       }

//       const products = result.response.docs; // Extract products from Solr response
//       const totalProducts = result.response.numFound; // Get total number of products

//       // Send response with products and total count
//       res.status(200).json({
//         data: products,
//         total: totalProducts,
//       });
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("server error in getting all products with Solr");
//   }
// };
exports.allProductsWithSolrSearch = async (req, res) => {
  let { limit = 20, offset = 0, search = "" } = req.query;

  try {
    // Initialize price range variables
    let priceRange = {
      min: null,
      max: null,
    };

    // Extract price filters from the query string
    const underMatch = search.match(/under\s*(\d+)/); // Check for "under" keyword
    if (underMatch) {
      priceRange.max = parseFloat(underMatch[1]); // Set the max price
      search = search.replace(underMatch[0], "").trim(); // Remove "under" filter from the query
    }

    const aboveMatch = search.match(/above\s*(\d+)/); // Check for "above" keyword
    if (aboveMatch) {
      priceRange.min = parseFloat(aboveMatch[1]); // Set the min price
      search = search.replace(aboveMatch[0], "").trim(); // Remove "above" filter from the query
    }

    // Clean up any leftover irrelevant spaces or words in the search query
    search = search.trim();

    // Build the Solr query
    const query = solrClient
      .createQuery()
      .q(search ? `${search}` : "*:*") // Perform search only if there's a valid search string
      .qop("OR")
      .defType("edismax")
      .qf({
        product_name: 2.0, // Higher weight for product name (users often search by name)
        category: 1.0, // Medium importance for category
        description: 0.2, // Description has a lower priority
      })
      .start(offset)
      .rows(limit);

    // Apply price range filters if specified
    if (priceRange.min !== null) {
      query.parameters.push(
        `fq=${encodeURIComponent(`discount_price:[${priceRange.min} TO *]`)}`
      );
    }
    if (priceRange.max !== null) {
      query.parameters.push(
        `fq=${encodeURIComponent(`discount_price:[* TO ${priceRange.max}]`)}`
      );
    }

    // Ensure filter queries are added properly to the query
    // if (filterQueries.length > 0) {
    //   filterQueries.forEach((fq) => query.set("fq", fq)); // Add each filter query
    // }

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
    console.error(err);
    res.status(500).send("Server error in getting all products with Solr");
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
