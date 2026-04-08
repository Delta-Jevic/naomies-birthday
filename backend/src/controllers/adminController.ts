import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../db/postgres";
import { sendAdminOtpEmail } from "../services/emailService";

// Admin signup
export const adminSignup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  try {
    const existingAdmin = await pool.query(
      "SELECT id FROM admins WHERE email = $1",
      [email]
    );

    if (existingAdmin.rows.length > 0) {
      return res.status(409).json({
        message: "Admin account already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO admins (email, password_hash)
      VALUES ($1, $2)
      RETURNING id, email, created_at
      `,
      [email, passwordHash]
    );

    return res.status(201).json({
      message: "Admin account created successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Admin signup error:", error);

    return res.status(500).json({
      message: "Failed to create admin account.",
    });
  }
};

// Admin login: email + password, then send OTP
export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  try {
    const adminResult = await pool.query(
      "SELECT * FROM admins WHERE email = $1",
      [email]
    );

    if (adminResult.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    const admin = adminResult.rows[0];

    const passwordMatches = await bcrypt.compare(password, admin.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Remove older OTPs for this admin first
    await pool.query(
      `
      DELETE FROM admin_otps
      WHERE admin_email = $1
      `,
      [email]
    );

    await pool.query(
      `
      INSERT INTO admin_otps (admin_email, code, expires_at)
      VALUES ($1, $2, $3)
      `,
      [email, code, expiresAt]
    );

    await sendAdminOtpEmail(email, code);

    return res.status(200).json({
      message: "Verification code sent successfully.",
      email,
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      message: "Failed to process admin login.",
    });
  }
};

// Verify OTP
export const verifyAdminOtp = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({
      message: "Email and code are required.",
    });
  }

  try {
    const otpResult = await pool.query(
      `
      SELECT * FROM admin_otps
      WHERE admin_email = $1 AND code = $2
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [email, code]
    );

    if (otpResult.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid code.",
      });
    }

    const otpRecord = otpResult.rows[0];
    const now = new Date();
    const expiresAt = new Date(otpRecord.expires_at);

    if (now > expiresAt) {
      return res.status(401).json({
        message: "Code has expired.",
      });
    }

    // Delete used OTP after success
    await pool.query(
      `
      DELETE FROM admin_otps
      WHERE admin_email = $1
      `,
      [email]
    );

    return res.status(200).json({
      message: "Admin verified successfully.",
      isAuthenticated: true,
      email,
    });
  } catch (error) {
    console.error("OTP verification error:", error);

    return res.status(500).json({
      message: "Failed to verify code.",
    });
  }
};