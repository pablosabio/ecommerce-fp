import express from 'express';
import multer from 'multer';
import {
    getAllUsers,
    getSingleUser,
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getCurrentUser,
    logoutUser,
} from '../controllers/userController.js';

import { auth } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/isAdmin.js';
import {
    validateUserRegistration,
    validateUserLogin,
} from '../middleware/validators.js';

const router = express.Router();

// Multer setup for file uploads (profile picture)
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB limit
    }
});

// Public routes
router.post(
    "/register",
    upload.single("profile_image"),
    validateUserRegistration,
    registerUser
);

router.post("/login", validateUserLogin, loginUser);
router.post("/logout", logoutUser);

// Protected routes
router.get("/me", auth, getCurrentUser);
router.put("/me", auth, upload.single("profile_image"), updateUser);

// Admin routes
router.get("/", auth, isAdmin, getAllUsers);
router.get("/:id", auth, isAdmin, getSingleUser);
router.put("/:id", auth, isAdmin, upload.single("profile_image"), updateUser);
router.delete("/:id", auth, isAdmin, deleteUser);

export default router;
