import { Router } from "express";
import {
  registerController,
  loginController,
  profileController,
  googleLoginController,
} from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();


// Register route
router.post(
  "/register",
  registerController
);


// Login route
router.post(
  "/login",
  loginController
);


// Google login route
router.post(
  "/google",
  googleLoginController
);


// Profile route (protected)
router.get(
  "/profile",
  authMiddleware,
  profileController
);


export default router;