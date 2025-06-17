const User = require("../models/userModel");
const createSecretToken = require("../helpers/secretToken");
const bcrypt = require("bcrypt");

const Register = async (req, res) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists", success: false });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res
      .cookie("token", token, {
        withCredentials: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 6,
      })
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  } catch (error) {
    console.error(error);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "Incorrect password or email",
        success: false,
      });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res
      .cookie("token", token, {
        withCredentials: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 6,
      })
      .status(201)
      .json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { Login, Register };
