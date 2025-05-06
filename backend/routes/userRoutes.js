// routes/userRoutes.js

import express from "express";
import multer from "multer";
import {
  getAllUsers,
  getSingleUser,
  createNewUser,
  loginUser,
  updateSingleUser,
  deleteSingleUser,
  verifyToken,
} from "../controllers/userController.js";
import { auth } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  validateUserRegistration,
  validateUserLogin,
} from "../middlewares/users-validators.js";

const router = express.Router();
const upload = multer();

router.get("/", auth, isAdmin, getAllUsers);
router.get("/:id", auth, isAdmin, getSingleUser);
router.post(
  "/signup",
  upload.single("profile_image"),
  validateUserRegistration,
  createNewUser
);
router.post("/login", validateUserLogin, loginUser);
router.put("/:id", auth, isAdmin, updateSingleUser);
router.delete("/:id", auth, isAdmin, deleteSingleUser);
router.get("/verifytoken", auth, verifyToken);

export default router;
