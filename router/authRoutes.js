import express from "express";
import {
  getUser,
  register,
  logout,
  login,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/logout", logout);
router.post("/me", getUser);

export default router;
