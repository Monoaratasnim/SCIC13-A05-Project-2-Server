import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import careerRoutes from "./modules/career/career.routes";
import aiRoutes from "./modules/ai/ai.routes";
import recommendRoutes from "./modules/ai/recommend.routes";
import careerLibraryRoutes from "./modules/career-library/career-library.routes";
import adminRoutes from "./modules/admin/admin.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/ai", recommendRoutes);
app.use("/api/career-library", careerLibraryRoutes);
app.use("/api/admin", adminRoutes);

// Root Route
app.get("/", (_req, res) => {
  res.send("🚀 NextStep AI Server is running...");
});

export default app;