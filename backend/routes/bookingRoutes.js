import express from "express";
import Booking from "../models/Booking.js";
import { protect } from "../middleware/authMiddleware.js"; // ✅ correct case

const router = express.Router();

/* =========================
   GET BOOKINGS (User Only)
========================= */
router.get("/", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({
      email: req.user.email,
    }).sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* =========================
   CREATE BOOKING
========================= */
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;