import { Router } from "express";
import {
  generateCareerRoadmapController,
  getMyRoadmapController,
} from "./ai.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/roadmap", authMiddleware, generateCareerRoadmapController);
router.get("/roadmap/me", authMiddleware, getMyRoadmapController);

export default router;
