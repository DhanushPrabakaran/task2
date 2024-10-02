const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const authmiddleware = require("./middlewares/authmiddleware");
// Create an Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(async (req, res, next) => {
  const date = await new Date();
  console.log({ TimeStamp: date });
  next();
});

// Routes
app.use("/api/auth", authRoutes);
//

// authmiddleware
app.use("/api/products", authmiddleware, productRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
