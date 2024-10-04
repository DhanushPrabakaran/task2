const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Signup controller
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10); // Generate salt with a cost factor of 10
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with hashed password
    await User.createUser(name, email, hashedPassword);

    // Create JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Signup controller
// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findByEmail(email);
//     if (existingUser) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     // Create new user
//     await User.createUser(name, email, password);

//     // Create JWT token
//     const token = jwt.sign({ email }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(201).json({ token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// Login controller
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findByEmail(email);
//     if (!user) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     // Create JWT token
//     const token = jwt.sign({ email }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({ token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };
// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(res.body);
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check if the password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
