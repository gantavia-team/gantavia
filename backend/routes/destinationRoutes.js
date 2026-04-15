import express from "express";
import {
  getDestinations,
  getFeaturedDestinations,
  getDestinationById,
  addDestination,
  updateDestination,
  deleteDestination,
  toggleFeatured,
} from "../controllers/destinationController.js";

import { protect } from "../middleware/authMiddleware.js"; // ✅ correct case

const router = express.Router();

/* =========================
   PUBLIC ROUTES
========================= */
router.get("/", getDestinations);
router.get("/featured", getFeaturedDestinations);
router.get("/:id", getDestinationById);

/* =========================
   PROTECTED ROUTES
========================= */
router.post("/", protect, addDestination);
router.put("/:id", protect, updateDestination);
router.patch("/:id/featured", protect, toggleFeatured);
router.delete("/:id", protect, deleteDestination);

export default router;