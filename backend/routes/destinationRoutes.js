import express from "express";
const router = express.Router();

import {
  getDestinations,
  getDestinationById,
  addDestination,
  updateDestination,
  deleteDestination,
} from "../controllers/destinationController.js";

import { protect } from "../middleware/authMiddleware.js";

// Public routes
router.get("/", getDestinations);
router.get("/:id", getDestinationById);

// Protected routes
router.post("/", protect, addDestination);
router.put("/:id", protect, updateDestination);
router.delete("/:id", protect, deleteDestination);

export default router;  