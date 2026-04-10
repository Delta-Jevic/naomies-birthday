import { Request, Response } from "express";
import { pool } from "../db/postgres";

// Create a new RSVP and save it into PostgreSQL
export const createRsvp = async (req: Request, res: Response) => {
  const { name, phone, email } = req.body;

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

    return res.status(201).json({
      message: "RSVP saved to database successfully.",
      data: result.rows[0],
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