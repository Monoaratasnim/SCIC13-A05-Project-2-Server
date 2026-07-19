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
  try {
    const userId = req.user?.id;

    const result = await generateCareerRoadmap(req.body);
    const saved = await saveRoadmap(userId!, result, req.body.careerGoal);

    res.status(200).json({
      success: true,
      message: "Career roadmap generated successfully",
      data: saved,
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
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve roadmap",
      error: error.message,
    });
  }
};
