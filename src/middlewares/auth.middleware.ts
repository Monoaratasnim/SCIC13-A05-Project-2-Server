import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}


export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const authHeader = req.headers.authorization;


    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
    }


    if (!authHeader.startsWith("Bearer ")) {
  return res.status(401).json({
    success: false,
    message: "Invalid authorization format",
  });
}

const token = authHeader.split(" ")[1];


    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      id: string;
      email: string;
      role: string;
    };


    req.user = decoded;


    next();


  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });

  }
};