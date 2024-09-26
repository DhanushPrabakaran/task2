const db = require("../config/db");
class Products {
  static async allProducts() {
    return new Promise((resolve, reject) => {
      const query = "SELECT  * FROM products LIMIT 20";

      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Products;
