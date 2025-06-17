/* 
Function: Middleware for routes that needs to be verified. 
USE: Set req.user.id
USED IN: recicipeRoutes.js

EXAMPLE FLOW:
1. CreateRecipe.jsx makes a post request to "/api/recipes"
2. The post route handler uses this verifyUser middleware
3. Checks if the request has cookies
  - Yes? Verifies token, decodes it to payload {id: ___ , iat: ____, exp : ____}, which has the id, and sets it to req.user
*/

const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyUser;
