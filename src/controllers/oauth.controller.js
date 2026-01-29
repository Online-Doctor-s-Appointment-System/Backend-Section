const { generateToken } = require("../config/jwt");
const { CLIENT_URL } = require("../config/env");

const googleCallback = async (req, res, next) => {
  try {
    // Passport middleware has already authenticated the user and attached it to req.user
    const user = req.user;

    // Generate JWT
    const token = generateToken(user);

    // Redirect to frontend
    res.redirect(`${CLIENT_URL}/oauth-success?token=${token}`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  googleCallback,
};
