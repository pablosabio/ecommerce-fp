import express from "express";
import * as ctrl from "../controllers/userController.js";
import { verifyToken } from "../controllers/userController.js";
const router = express.Router();

router.get("/", verifyToken, ctrl.getAllUsers);
router.get("/:id", verifyToken, ctrl.getSingleUser);
router.post("/signup", ctrl.createNewUser);
router.post("/login", ctrl.loginUser);
router.put("/:id", verifyToken, ctrl.updateSingleUser);
router.delete("/:id", verifyToken, ctrl.deleteSingleUser);

export default router;
