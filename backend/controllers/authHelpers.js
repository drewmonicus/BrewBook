/*
Function: 
Controller for router.post('/api/auth/verify')

USE: 
 */

const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ success: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ success: false });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        return res.json({
          success: true,
          username: user.username,
          _id: user._id,
        });
      } else {
        return res.json({ success: false });
      }
    }
  });
};

module.exports = userVerification;
