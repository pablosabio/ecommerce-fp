// src/controllers/userController.js

import UsersModel from "../models/userSchema.js";        // your Mongoose user model
import bcrypt from "bcrypt";                            // password hashing
import jwt from "jsonwebtoken";                         // JWT issuance & verification
import ImageModel from "../models/imageSchema.js";      // optional avatar uploads

// ─── 1. GET ALL USERS ─────────────────────────────────────────────────────────
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UsersModel.find().select("-password"); 
    // omit passwords from output for security
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

// ─── 2. GET SINGLE USER BY ID (with orders populated) ────────────────────────
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await UsersModel
      .findById(req.params.id)
      .select("-password")
      .populate({
        path: "orders",
        populate: { path: "products", model: "Product" }
      });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// ─── 3. CREATE (SIGNUP) NEW USER ─────────────────────────────────────────────
export const createNewUser = async (req, res, next) => {
  try {
    // 1) Hash password
    const hashed = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashed;

    // 2) If an avatar file was uploaded, save it and set URL
    if (req.file) {
      const img = await ImageModel.create({
        filename: `${Date.now()}_${req.file.originalname}`,
        data: req.file.buffer
      });
      req.body.profile_avatar = `/images/${img.filename}`;
    }

    // 3) Create user document
    const user = await UsersModel.create(req.body);
    user.password = undefined;            // hide password in response
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// ─── 4. LOGIN (AUTHENTICATE) USER ────────────────────────────────────────────
export const loginUser = async (req, res, next) => {
  try {
    const user = await UsersModel.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const ok = await bcrypt.compare(req.body.password, user.password);
    if (!ok) return res.status(401).json({ success: false, message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "8h" }
    );

    // Optionally set cookie or session
    res.cookie("token", token, { httpOnly: true });
    user.password = undefined;
    res.json({ success: true, data: user, token });
  } catch (err) {
    next(err);
  }
};

// ─── 5. UPDATE USER ───────────────────────────────────────────────────────────
export const updateSingleUser = async (req, res, next) => {
  try {
    const updated = await UsersModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");
    if (!updated) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

// ─── 6. DELETE USER ───────────────────────────────────────────────────────────
export const deleteSingleUser = async (req, res, next) => {
  try {
    const removed = await UsersModel.findByIdAndDelete(req.params.id).select("-password");
    if (!removed) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: removed });
  } catch (err) {
    next(err);
  }
};

// ─── 7. VERIFY JWT MIDDLEWARE ─────────────────────────────────────────────────
export const verifyToken = async (req, res, next) => {
  try {
    // 1) Read token from header or cookie
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    // 2) Verify & decode
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    // 3) Attach user to req for downstream handlers
    req.user = await UsersModel.findById(payload._id).select("-password");
    if (!req.user) return res.status(401).json({ success: false, message: "Invalid token" });

    next();
  } catch (err) {
    next(err);
  }
};
