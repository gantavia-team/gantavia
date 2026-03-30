import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

/* =========================
   Middleware
========================= */
app.use(cors());
app.use(express.json());

// Logging middleware (from teammate)
app.use((req, res, next) => {
  console.log("👉 Incoming:", req.method, req.url);
  next();
});

// Serve images
app.use("/images", express.static("public/images"));

/* =========================
   Routes
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);

/* =========================
   Health Check
========================= */
app.get("/", (req, res) => {
  res.send("Tourist Companion API is running...");
});

/* =========================
   Start Server
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});