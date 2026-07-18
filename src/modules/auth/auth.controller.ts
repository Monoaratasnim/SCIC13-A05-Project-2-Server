import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
} from "./auth.service";


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