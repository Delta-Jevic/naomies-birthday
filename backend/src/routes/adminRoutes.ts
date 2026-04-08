import express from "express";
import {
  adminSignup,
  adminLogin,
  verifyAdminOtp,
} from "../controllers/adminController";

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/verify-otp", verifyAdminOtp);

export default router;