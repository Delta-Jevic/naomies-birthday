import bcrypt from "bcrypt";
import { pool } from "./postgres";

export async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.log("Admin seed skipped: missing ADMIN_EMAIL or ADMIN_PASSWORD");
    return;
  }

  try {
    const existingAdmin = await pool.query(
      "SELECT * FROM admins WHERE email = $1",
      [adminEmail]
    );

    if (existingAdmin.rows.length > 0) {
      console.log("Admin already exists");
      return;
    }

    const passwordHash = await bcrypt.hash(adminPassword, 10);

    await pool.query(
      `
      INSERT INTO admins (email, password_hash)
      VALUES ($1, $2)
      `,
      [adminEmail, passwordHash]
    );

    console.log("Admin account created");
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
}