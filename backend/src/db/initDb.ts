import { pool } from "./postgres";

export async function initDb() {
  const createRsvpTableQuery = `
    CREATE TABLE IF NOT EXISTS rsvps (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createAdminTableQuery = `
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createAdminOtpTableQuery = `
    CREATE TABLE IF NOT EXISTS admin_otps (
      id SERIAL PRIMARY KEY,
      admin_email VARCHAR(255) NOT NULL,
      code VARCHAR(10) NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createRsvpTableQuery);
    await pool.query(createAdminTableQuery);
    await pool.query(createAdminOtpTableQuery);
    console.log("Database tables are ready");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}