import { Request, Response } from "express";
import {
  createCareerProfile,
  getMyCareerProfile,
  updateCareerProfile,
} from "./career.service";


// CREATE CAREER PROFILE
export const createCareerController = async (
  req: Request,
  res: Response
) => {
  try {

    const userId = req.user?.id;

    const result = await createCareerProfile(
      userId!,
      req.body
    );


    res.status(201).json({
      success: true,
      message: "Career profile created successfully",
      data: result,
    });


  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};




// GET MY CAREER PROFILE
export const getMyCareerController = async (
  req: Request,
  res: Response
) => {

  try {

    const userId = req.user?.id;


    const result = await getMyCareerProfile(
      userId!
    );


    res.status(200).json({
      success: true,
      message: "Career profile fetched successfully",
      data: result,
    });


  } catch (error: any) {

    res.status(404).json({
      success: false,
      message: error.message,
    });

  }

};




// UPDATE CAREER PROFILE
export const updateCareerController = async (
  req: Request,
  res: Response
) => {

  try {

    const userId = req.user?.id;


    const result = await updateCareerProfile(
      userId!,
      req.body
    );


    res.status(200).json({
      success: true,
      message: "Career profile updated successfully",
      data: result,
    });


  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};