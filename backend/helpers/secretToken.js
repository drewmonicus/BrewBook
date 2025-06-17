/* 
Function: Creates a token
USED IN: authController.js (for Registering and Logging In)
CALLED FROM: Login.jsx / Register.jsx -> authController.js -> secretToken.js

Notes: 
jwt.sign(payload, secret, options)
returns a token like : iu1h4i21nkjankjdf
This token, when verified and decrypted late, gives back the original payload, which is id
*/

const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

module.exports = createSecretToken;
