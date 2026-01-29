// db.js
const { Pool } = require("pg");
const config = require("./env");

const db = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: Number(config.DB_PORT) || 5432,
});

db.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

db.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = db;
