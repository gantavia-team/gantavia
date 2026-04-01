import mongoose from "mongoose";
import dns from "dns";

// Fix for Node.js DNS resolving failing on certain ISPs (e.g. Jio Fibernet in India)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB now that IP is whitelisted...");
    const conn = await mongoose.connect("mongodb+srv://sharmaharshit2424:FRBeGd6fxQayX3Jt@cluster0.vlldhpe.mongodb.net/?appName=Cluster0");

    console.log(`MongoDB Connected ✅`);
    console.log(`Host: ${conn.connection.host}`);
    
  } catch (error) {
    console.error("MongoDB Connection Failed ❌", error);
    process.exit(1);
  }
};

export default connectDB;