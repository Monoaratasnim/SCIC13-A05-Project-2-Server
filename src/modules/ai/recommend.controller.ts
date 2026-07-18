import { Request, Response } from "express";
import { generateCareerRecommendation } from "./recommend.service";

export const getCareerRecommendation = async (
  req: Request,
  res: Response
) => {
  try {
    const recommendation = await generateCareerRecommendation(req.body);

    res.status(200).json({
      success: true,
      message: "Career recommendation generated successfully",
      data: recommendation,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to generate career recommendation",
      error: error.message,
    });
  }
};