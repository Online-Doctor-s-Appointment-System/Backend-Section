const db = require("../config/db");
const { hashPassword, comparePassword } = require("../utils/password");

const signup = async (userData) => {
  const { name, email, Password, phone } = userData;

  const hashedPassword = await hashPassword(Password);

  const query = `
    INSERT INTO users (name, email, password_hash, phone, role)
    VALUES ($1, $2, $3, $4, 'patient')
    RETURNING id, name, email, role, phone;
  `;

  const result = await db.query(query, [name, email, hashedPassword, phone]);

  return result.rows[0];
};

const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const query = `
    SELECT id, name, email, password_hash, role, phone
    FROM users
    WHERE email = $1
    LIMIT 1
  `;

  const result = await db.query(query, [email]);
  const user = result.rows[0];

  if (!user || !user.password_hash) return null;

  const isMatch = await comparePassword(password, user.password_hash);
  if (!isMatch) return null;

  delete user.password_hash;
  return user;
};

module.exports = { signup, login };
