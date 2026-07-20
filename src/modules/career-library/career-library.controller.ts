import { Request, Response } from "express";
import {
  getAllCareers,
  getCareersPaginated,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
  getPublicStats,
  getIndustryDistribution,
} from "./career-library.service";


// GET ALL CAREERS (Admin — unpaginated)
export const getAllCareersController = async (
  _req: Request,
  res: Response
) => {
  try {
    const result = await getAllCareers();

    res.status(200).json({
      success: true,
      message: "Careers fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET CAREERS PAGINATED (Public)
export const getCareersPaginatedController = async (
  req: Request,
  res: Response
) => {
  try {
    const { search, industry, experienceLevel, sort, page, limit } =
      req.query;

    const result = await getCareersPaginated({
      search: search as string | undefined,
      industry: industry as string | undefined,
      experienceLevel: experienceLevel as string | undefined,
      sort: sort as string | undefined,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 12,
    });

    res.status(200).json({
      success: true,
      message: "Careers fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET SINGLE CAREER
export const getCareerByIdController = async (
  req: Request,
  res: Response
) => {
  try {
const result = await getCareerById(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Career fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};


// CREATE CAREER (Admin)
export const createCareerController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await createCareer(req.body);

    res.status(201).json({
      success: true,
      message: "Career created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// UPDATE CAREER (Admin)
export const updateCareerController = async (
  req: Request,
  res: Response
) => {
  try {
   const result = await updateCareer(
  req.params.id as string,
  req.body
);

    res.status(200).json({
      success: true,
      message: "Career updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE CAREER (Admin)
export const deleteCareerController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteCareer(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Career deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// PUBLIC STATS
export const getPublicStatsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const result = await getPublicStats();

    res.status(200).json({
      success: true,
      message: "Public stats fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// INDUSTRY DISTRIBUTION
export const getIndustryDistributionController = async (
  _req: Request,
  res: Response
) => {
  try {
    const result = await getIndustryDistribution();

    res.status(200).json({
      success: true,
      message: "Industry distribution fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
