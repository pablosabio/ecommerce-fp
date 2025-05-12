// File: middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const header = req.headers.authorization;
        const cookieToken = req.cookies?.token;
        const token = header?.startsWith("Bearer ")
        ? header.split(" ")[1]
        : cookieToken;

        if(!token) {
            return res.status(401).json({ success: false, message: "Token required" });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload._id).select("-password");

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token expired" });
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        next(err);
    }
};