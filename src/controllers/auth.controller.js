const authService = require("../services/auth.service");
const { generateToken } = require("../config/jwt");

exports.signup = async (req, res) => {
  try {
    // console.log(req.body);
    const user = await authService.signup(req.body);
    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, Password } = req.body;
    // console.log(req.body);
    const user = await authService.login(email, Password);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
