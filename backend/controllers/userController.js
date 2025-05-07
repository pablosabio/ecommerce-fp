// controllers/userController.js

import UsersModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ImageModel from "../models/imageSchema.js";

// GET all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UsersModel.find().select("-password");
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

// GET single user by ID
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await UsersModel.findById(req.params.id)
      .select("-password")
      .populate({
        path: "orders",
        populate: { path: "products", model: "Product" },
      });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// CREATE new user (signup)
export const createNewUser = async (req, res, next) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashed;

    if (req.file) {
      const img = await ImageModel.create({
        filename: `${Date.now()}_${req.file.originalname}`,
        data: req.file.buffer,
      });
      req.body.profile_avatar = `/images/${img.filename}`;
    }

    const user = await UsersModel.create(req.body);
    user.password = undefined;
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// LOGIN user
export const loginUser = async (req, res, next) => {
  try {
    const user = await UsersModel.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const ok = await bcrypt.compare(req.body.password, user.password);
    if (!ok)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "8h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    user.password = undefined;
    res.json({ success: true, data: user, token });
  } catch (err) {
    next(err);
  }
};

// UPDATE user
export const updateSingleUser = async (req, res, next) => {
  try {
    const updated = await UsersModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

// DELETE user
export const deleteSingleUser = async (req, res, next) => {
  try {
    const removed = await UsersModel.findByIdAndDelete(req.params.id).select(
      "-password"
    );
    if (!removed)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, data: removed });
  } catch (err) {
    next(err);
  }
};

// VERIFY token
export const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });

    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await UsersModel.findById(payload._id).select("-password");
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid token" });

    next();
  } catch (err) {
    next(err);
  }
};
