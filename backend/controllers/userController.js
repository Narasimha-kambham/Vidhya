const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

// Generate JWT Token
const JWT_SECRET = process.env.JWT_SECRET;
const generateToken = (id) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined!");
  }
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
};

// Register User
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(hashedPassword, "        hashed password");

    // Create user
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    // Generate JWT Token
    const token = generateToken(newUser._id);

    // Respond with token
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: `Failed to register user (from the backend API end point): ${error.message}`,
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);

    const testHash = await bcrypt.hash(password, salt);
    console.log("Test Hash:", testHash);

    const testCompare = await bcrypt.compare(password, testHash);
    console.log("Test Compare:", testCompare); // Should be true

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }
    console.log(testHash, "                 ", user.password);
    console.log(testHash === user.password);
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid  password" });
    }

    // Generate token and respond
    res.status(200).json({
      message: "login success full",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
        profilePicture: user.profilePicture,
      },
    });
    // _id: user._id,
    //   userName: user.userName,
    //   email: user.email,
    //   token: generateToken(user._id),
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
