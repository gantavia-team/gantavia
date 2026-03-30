import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();

/* =========================
   Middleware
========================= */
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("👉 Incoming:", req.method, req.url);
  next();
});

/* =========================
   Debug (Check ENV)
========================= */
console.log("MONGO_URI:", process.env.MONGO_URI);

/* =========================
   Schema & Model
========================= */
const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: String,
    price: Number,
    image: String,
  },
  { timestamps: true }
);

const Place = mongoose.model("Place", placeSchema);

/* =========================
   Routes
========================= */

// Test route
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

// GET all places
app.get("/api/places", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single place
app.get("/api/places/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.json(place);
  } catch (error) {
    res.status(404).json({ message: "Invalid ID" });
  }
});

// ADD new place
app.post("/api/places", async (req, res) => {
  try {
    const newPlace = new Place(req.body);
    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE place
app.delete("/api/places/:id", async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.json({ message: "Place deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   Start Server AFTER DB Connect
========================= */
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  } catch (error) {
    console.error("MongoDB Connection Failed ❌", error);
  }
};

startServer();