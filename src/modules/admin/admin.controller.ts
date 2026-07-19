import { Request, Response } from "express";
import { getAdminStats } from "./admin.service";

export const getAdminStatsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const result = await getAdminStats();

    res.status(200).json({
      success: true,
      message: "Admin stats fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
