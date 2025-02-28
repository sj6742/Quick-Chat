import jwt from "jsonwebtoken";
import User from "../Models/userm.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; 

        console.log("Token received:", token); 

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded token:", decoded); 

        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        console.log("User found:", user);

        if (!user) {
            return res.status(404).json({ message: "User not found in database" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
