import mongoose from "mongoose";
import Destination from "./models/Destination.js";
import dotenv from "dotenv";
import destinations from "./data/destinations.js";
import dns from "dns";

dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sharmaharshit2424:FRBeGd6fxQayX3Jt@cluster0.vlldhpe.mongodb.net/?appName=Cluster0");
    console.log("✅ MongoDB connected for seeding");

    await Destination.deleteMany();

    await Destination.insertMany(destinations);

    console.log("✅ Data inserted successfully");
    process.exit();

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

connectDB();