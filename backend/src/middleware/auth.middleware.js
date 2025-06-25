import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "Unauthorized - Token missing." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(400).json({ message: "Unauthorized - Invalid token." });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ message: "Unauthorized - User not found." });
    }
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
