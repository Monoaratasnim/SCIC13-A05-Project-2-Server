import { Request, Response } from "express";
import {
  generateCareerRoadmap,
  saveRoadmap,
  getLatestRoadmap,
} from "./ai.service";

export const generateCareerRoadmapController = async (
  req: Request,
  res: Response
) => {
  const startTime = Date.now();
  const userId = req.user?.id;

  try {
    console.log(`[Roadmap] Generation started for user: ${userId}`);

    const result = await generateCareerRoadmap(req.body);
    console.log(`[Roadmap] Groq completed in ${Date.now() - startTime}ms, content length: ${result.length}`);

    const saved = await saveRoadmap(userId!, result, req.body.careerGoal);
    console.log(`[Roadmap] Saved to DB in ${Date.now() - startTime}ms total`);

    res.status(200).json({
      success: true,
      message: "Career roadmap generated successfully",
      data: saved,
    });
  } catch (error: any) {
    const elapsed = Date.now() - startTime;
    console.error(`[Roadmap] FAILED after ${elapsed}ms`);
    console.error(`[Roadmap] Error type: ${error.constructor?.name}`);
    console.error(`[Roadmap] Error message: ${error.message}`);
    if (error.status) console.error(`[Roadmap] Groq status: ${error.status}`);
    if (error.headers) console.error(`[Roadmap] Groq headers: ${JSON.stringify(error.headers)}`);
    console.error(`[Roadmap] Full error:`, error);

    res.status(500).json({
      success: false,
      message: "Failed to generate career roadmap",
    });
  }
};

export const getMyRoadmapController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const roadmap = await getLatestRoadmap(userId!);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "No roadmap found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Roadmap retrieved successfully",
      data: roadmap,
    });
  } catch (error: any) {
    console.error(`[Roadmap] getMy failed: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve roadmap",
    });
  }
};
