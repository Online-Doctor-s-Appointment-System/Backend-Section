// src/services/oauth.service.js
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { GOOGLE } = require("../config/oauth");

const oauthLogin = async ({ provider, providerId, email, name, phone }) => {
  // 1. Check if user exists by google_id
  let { rows } = await db.query(
    "SELECT id, name, email, role FROM users WHERE google_id = $1 LIMIT 1",
    [providerId]
  );
  let user = rows[0];

  // 2. If not found by google_id, check by email (to link accounts)
  if (!user) {
    const { rows: emailRows } = await db.query(
      "SELECT id, name, email, role FROM users WHERE email = $1 LIMIT 1",
      [email]
    );
    user = emailRows[0];

    if (user) {
      // Link account: Update google_id for existing user
      await db.query("UPDATE users SET google_id = $1 WHERE id = $2", [
        providerId,
        user.id,
      ]);
    } else {
      // 3. Create new user if doesn't exist at all
      const result = await db.query(
        "INSERT INTO users (name, email, google_id, role, phone) VALUES ($1, $2, $3, 'patient', $4) RETURNING id, name, email, role, phone",
        [name, email, providerId, phone]
      );
      user = result.rows[0];
    }
  }

  // 4. Return user (token generation moved to controller)
  return { user };
};

module.exports = {
  oauthLogin,
};
