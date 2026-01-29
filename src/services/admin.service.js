const db = require("../config/db");

// Create a specialization (Doctors need this first)
const createSpecialization = async (name, description) => {
  const query = `
    INSERT INTO specializations (name, description) 
    VALUES ($1, $2) RETURNING *`;
  const res = await db.query(query, [name, description]);
  return res.rows[0];
};

// Create a doctor
const createDoctor = async (doctorData) => {
  const { name, email, phone, license_number, specialization_id, bio } =
    doctorData;
  const query = `
    INSERT INTO doctors (name, email, phone, license_number, specialization_id, bio)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const res = await db.query(query, [
    name,
    email,
    phone,
    license_number,
    specialization_id,
    bio,
  ]);
  return res.rows[0];
};

module.exports = { createSpecialization, createDoctor };
