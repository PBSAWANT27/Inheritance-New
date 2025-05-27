require("dotenv").config();
// Load environment variables from .env
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

// Initialize the Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // To parse JSON data from incoming requests
app.use(cors()); // Enable CORS for cross-origin requests

// MongoDB connection
console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Register route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists.");
    }

    // Create a new user
    const newUser = new User({ name, email, password});
    await newUser.save();

    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user.");
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid credentials.");

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send("Invalid credentials.");

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).send("Error logging in.");
  }
});

// Profile route (Protected)
app.get("/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) return res.status(401).send("Access denied.");

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(400).send("User not found.");

    res.json({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
