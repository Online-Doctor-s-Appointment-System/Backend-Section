const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  // console.log("yes", password);
  if (!password) {
    throw new Error("Password is required for hashing");
  }
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hash) => {
  if (!password || !hash) {
    throw new Error("Both password and hash are required for comparison");
  }
  return await bcrypt.compare(password, hash);
};

module.exports = { hashPassword, comparePassword };
