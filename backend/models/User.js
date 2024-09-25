const db = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
  static async createUser(email, password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users (email, password) VALUES (?, ?)";
      db.query(query, [email, hashedPassword], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ?";
      db.query(query, [email], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }
}

module.exports = User;
