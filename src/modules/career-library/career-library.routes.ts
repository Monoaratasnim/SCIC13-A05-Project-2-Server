import { Router } from "express";
import { authMiddleware, requireRole } from "../../middlewares/auth.middleware";
import {
  getAllCareersController,
  getCareersPaginatedController,
  getCareerByIdController,
  createCareerController,
  updateCareerController,
  deleteCareerController,
  getPublicStatsController,
  getIndustryDistributionController,
} from "./career-library.controller";


const router = Router();


// Public routes
router.get("/search", getCareersPaginatedController);
router.get("/public-stats", getPublicStatsController);
router.get("/distribution", getIndustryDistributionController);
router.get("/", getAllCareersController);
router.get("/:id", getCareerByIdController);


// Admin routes
router.post(
  "/",
  authMiddleware,
  requireRole("admin"),
  createCareerController
);

router.patch(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  updateCareerController
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  deleteCareerController
);


export default router;
