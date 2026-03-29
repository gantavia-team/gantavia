import jwt from "jsonwebtoken";
import User from "../models/User.js";

//  Protect Routes Middleware
export const protect = async (req, res, next) => {
  let token;

  try {
    // Check if token exists in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } else {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};