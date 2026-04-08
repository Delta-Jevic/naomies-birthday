import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import rsvpRoutes from "./routes/rsvpRoutes";
import { pool } from "./db/postgres";
import { initDb } from "./db/initDb";
import { startReminderJob } from "./jobs/reminderJob";
import { seedAdmin } from "./db/seedAdmin";
import adminRoutes from "./routes/adminRoutes";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

// Allow frontend to connect
app.use(cors());

// Allow backend to read JSON
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the birthday backend API");
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    message: "Backend server is running 🚀",
  });
});

// RSVP routes
app.use("/api/rsvps", rsvpRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Database connection successful",
      time: result.rows[0],
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

async function startServer() {
  try {
    await initDb();
    await seedAdmin();
    startReminderJob();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();