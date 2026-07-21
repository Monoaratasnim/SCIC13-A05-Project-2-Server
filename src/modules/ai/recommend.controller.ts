import { Request, Response } from "express";
import {
  generateCareerRecommendation,
  saveRecommendation,
  getLatestRecommendation,
} from "./recommend.service";

export const getCareerRecommendation = async (
  req: Request,
  res: Response
) => {
  const startTime = Date.now();
  const userId = req.user?.id;

  try {
    console.log(`[Recommendation] Generation started for user: ${userId}`);

    const result = await generateCareerRecommendation(req.body);
    console.log(`[Recommendation] Groq completed in ${Date.now() - startTime}ms, content length: ${result.length}`);

    const saved = await saveRecommendation(userId!, result, req.body);
    console.log(`[Recommendation] Saved to DB in ${Date.now() - startTime}ms total`);

    res.status(200).json({
      success: true,
      message: "Career recommendation generated successfully",
      data: saved,
    });
  } catch (error: any) {
    const elapsed = Date.now() - startTime;
    console.error(`[Recommendation] FAILED after ${elapsed}ms`);
    console.error(`[Recommendation] Error type: ${error.constructor?.name}`);
    console.error(`[Recommendation] Error message: ${error.message}`);
    if (error.status) console.error(`[Recommendation] Groq status: ${error.status}`);
    if (error.headers) console.error(`[Recommendation] Groq headers: ${JSON.stringify(error.headers)}`);
    console.error(`[Recommendation] Full error:`, error);

    res.status(500).json({
      success: false,
      message: "Failed to generate career recommendation",
    });
  }
};

export const getMyRecommendationController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const recommendation = await getLatestRecommendation(userId!);

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "No recommendation found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recommendation retrieved successfully",
      data: recommendation,
    });
  } catch (error: any) {
    console.error(`[Recommendation] getMy failed: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve recommendation",
    });
  }
};
