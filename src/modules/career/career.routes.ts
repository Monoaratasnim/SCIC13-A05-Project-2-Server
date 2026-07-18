import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createCareerController,
  getMyCareerController,
  updateCareerController,
} from "./career.controller";


const router = Router();


// Create career profile
router.post(
  "/",
  authMiddleware,
  createCareerController
);


// Get logged-in user's career profile
router.get(
  "/me",
  authMiddleware,
  getMyCareerController
);


// Update career profile
router.patch(
  "/",
  authMiddleware,
  updateCareerController
);


export default router;