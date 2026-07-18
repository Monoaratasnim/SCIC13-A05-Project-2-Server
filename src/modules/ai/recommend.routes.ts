import { Router } from "express";
import { getCareerRecommendation } from "./recommend.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/recommend", authMiddleware, getCareerRecommendation);

export default router;