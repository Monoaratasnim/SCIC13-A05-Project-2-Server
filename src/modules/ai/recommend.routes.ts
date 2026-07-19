import { Router } from "express";
import {
  getCareerRecommendation,
  getMyRecommendationController,
} from "./recommend.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/recommend", authMiddleware, getCareerRecommendation);
router.get("/recommend/me", authMiddleware, getMyRecommendationController);

export default router;
