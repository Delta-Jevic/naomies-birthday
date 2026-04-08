import express from "express";
import { createRsvp, getAllRsvps } from "../controllers/rsvpController";

const router = express.Router();

// GET /api/rsvps
router.get("/", getAllRsvps);

// POST /api/rsvps
router.post("/", createRsvp);

export default router;