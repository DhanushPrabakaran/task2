const db = require("../config/db");
// Model: Products.js
const solr = require("solr-client");

// Create Solr client
const client = solr.createClient({
  host: "localhost",
  port: "8983",
  core: "products",
  path: "/solr",
});

class Products {
  static async allProductsWithoutLimit() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM products`;
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static async allProducts(limit, offset, search) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM products 
        WHERE product_name LIKE ? 
        LIMIT ? OFFSET ?`;
      db.query(
        query,
        [`%${search}%`, parseInt(limit), parseInt(offset)],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static async categoryProducts(category, limit, offset, search) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM products 
        WHERE category = ? AND product_name LIKE ? 
        LIMIT ? OFFSET ?`;
      db.query(
        query,
        [category, `%${search}%`, parseInt(limit), parseInt(offset)],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static async getTotalProductCount(search) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT COUNT(*) AS total FROM products WHERE product_name LIKE ?";
      db.query(query, [`%${search}%`], (err, result) => {
        if (err) reject(err);
        resolve(result[0].total);
      });
    });
  }

  static async getTotalProductCountByCategory(category, search) {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT COUNT(*) AS total FROM products WHERE category = ? AND product_name LIKE ?";
      db.query(query, [category, `%${search}%`], (err, result) => {
        if (err) reject(err);
        resolve(result[0].total);
      });
    });
  }
  // static async categoryProducts(category, limit, offset) {
  //   return new Promise((resolve, reject) => {
  //     const query = `SELECT * FROM products WHERE category = ? LIMIT ? OFFSET ?`;
  //     db.query(query, [category, limit, offset], (err, results) => {
  //       if (err) reject(err);
  //       resolve(results);
  //     });
  //   });
  // }
  static async categoryProducts(category, limit, offset, search) {
    return new Promise((resolve, reject) => {
      // Search query with optional search term
      const query = `SELECT * FROM products 
                     WHERE category = ? AND product_name LIKE ? 
                     LIMIT ? OFFSET ?`;
      const searchTerm = `%${search}%`; // Search term for SQL LIKE query

      db.query(
        query,
        [category, searchTerm, parseInt(limit), parseInt(offset)],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static async getTotalProductCountByCategory(category, search) {
    return new Promise((resolve, reject) => {
      // Count query for total products matching the search
      const query = `SELECT COUNT(*) as count FROM products 
                     WHERE category = ? AND product_name LIKE ?`;
      const searchTerm = `%${search}%`;

      db.query(query, [category, searchTerm], (err, results) => {
        if (err) reject(err);
        resolve(results[0].count); // Return the total product count
      });
    });
  }

  static async countCategoryProducts(category) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) as count FROM products WHERE category = ?`;
      db.query(query, [category], (err, results) => {
        if (err) reject(err);
        resolve(results[0].count); // Return total number of products
      });
    });
  }
}

module.exports = Products;
