import { Request, Response } from "express";
import { generateCareerRoadmap } from "./ai.service";

export const generateCareerRoadmapController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await generateCareerRoadmap(req.body);

    res.status(200).json({
      success: true,
      message: "Career roadmap generated successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate career roadmap",
      error: error.message,
    });
  }
};