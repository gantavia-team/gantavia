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

// Middleware
app.use(express.json());
app.use(cors());

// Serve images (VERY IMPORTANT)
app.use("/images", express.static("public/images"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send(" Tourist Companion API is running...");
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});