import express from "express";
import {
  getUser,
  register,
  logout,
  login,
  forgotPassword,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getUser);
router.post("/logout", isAuthenticated, logout);
router.post("/password/forgot", forgotPassword);

export default router;
