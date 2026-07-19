import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  googleLoginUser,
} from "./auth.service";


// PROFILE CONTROLLER
export const profileController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getProfile(req.user!.id);

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: result,
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// REGISTER CONTROLLER
export const registerController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



// LOGIN CONTROLLER
export const loginController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



// GOOGLE LOGIN CONTROLLER
export const googleLoginController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await googleLoginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Google login successful",
      data: result,
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};