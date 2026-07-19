import { Router } from "express";
import { authMiddleware, requireRole } from "../../middlewares/auth.middleware";
import { getAdminStatsController } from "./admin.controller";

const router = Router();

router.get(
  "/stats",
  authMiddleware,
  requireRole("admin"),
  getAdminStatsController
);

export default router;
