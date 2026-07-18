import { Router } from "express";
import {
  registerController,
  loginController,
} from "./auth.controller";

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


export default router;