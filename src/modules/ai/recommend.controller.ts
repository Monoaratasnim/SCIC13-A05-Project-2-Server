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
  try {
    const userId = req.user?.id;

    const result = await generateCareerRecommendation(req.body);
    const saved = await saveRecommendation(userId!, result, req.body);

    res.status(200).json({
      success: true,
      message: "Career recommendation generated successfully",
      data: saved,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to generate career recommendation",
      error: error.message,
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
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve recommendation",
      error: error.message,
    });
  }
};
