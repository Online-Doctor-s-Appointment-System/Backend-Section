const jwt = require("jsonwebtoken");
const { JWT_EXPIRES_IN, JWT_SECRET } = require("./env");

const generateToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
  };

  const secret = JWT_SECRET;
  const options = {
    expiresIn: JWT_EXPIRES_IN,
  };

  return jwt.sign(payload, secret, options);
};

module.exports = { generateToken };
