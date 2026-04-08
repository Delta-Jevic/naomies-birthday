import { Request, Response } from "express";
import { pool } from "../db/postgres";
import { sendRsvpConfirmationEmail } from "../services/emailService";

// Create a new RSVP and save it into PostgreSQL
export const createRsvp = async (req: Request, res: Response) => {
  const { name, phone, email } = req.body;

  // Basic validation
  if (!name || !phone || !email) {
    return res.status(400).json({
      message: "Name, phone, and email are required.",
    });
  }

  try {
    const insertQuery = `
      INSERT INTO rsvps (name, phone, email)
      VALUES ($1, $2, $3)
      RETURNING id, name, phone, email, created_at;
    `;

    const values = [name, phone, email];
    const result = await pool.query(insertQuery, values);

    const savedRsvp = result.rows[0];

    /*
    Send confirmation email after saving RSVP.
    We do this after the database insert so we only email real saved RSVPs.
    */
    try {
      await sendRsvpConfirmationEmail(name, email);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);

      // We do not fail the whole RSVP if email fails.
      // The RSVP is already saved in the database.
    }

    return res.status(201).json({
      message: "RSVP saved to database successfully.",
      data: savedRsvp,
    });
  } catch (error) {
    console.error("Error saving RSVP:", error);

    return res.status(500).json({
      message: "Failed to save RSVP.",
    });
  }
};

// Get all RSVPs from PostgreSQL
export const getAllRsvps = async (req: Request, res: Response) => {
  try {
    const selectQuery = `
      SELECT id, name, phone, email, created_at
      FROM rsvps
      ORDER BY id DESC;
    `;

    const result = await pool.query(selectQuery);

    return res.status(200).json({
      message: "RSVP list fetched successfully.",
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching RSVPs:", error);

    return res.status(500).json({
      message: "Failed to fetch RSVPs.",
    });
  }
};