import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

// ✅ Connect Database
connectDB();

const app = express();

/* =========================
   MIDDLEWARE
========================= */

// ✅ CORS FIX (IMPORTANT)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-netlify-app.netlify.app"
    ],
    credentials: true,
  })
);

// JSON parser
app.use(express.json());

// Logging
app.use(morgan("dev"));

/* =========================
   STATIC FILES
========================= */
app.use("/images", express.static("public/images"));

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/bookings", bookingRoutes);

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("🚀 Tourist Companion API is running...");
});

/* =========================
   ERROR HANDLING
========================= */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found ❌" });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({
    message: "Something went wrong on server",
  });
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});