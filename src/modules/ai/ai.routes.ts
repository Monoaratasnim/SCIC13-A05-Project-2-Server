import { Router } from "express";
import { generateCareerRoadmapController } from "./ai.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post(
  "/roadmap",
  authMiddleware,
  generateCareerRoadmapController
);

export default router;