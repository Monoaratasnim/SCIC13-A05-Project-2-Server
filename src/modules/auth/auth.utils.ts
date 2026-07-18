import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";


// Hash password
export const hashPassword = async (
  password: string
): Promise<string> => {
  return await bcrypt.hash(password, 10);
};


// Compare password
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};


// Generate JWT token
export const generateToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET as string;

  const options: SignOptions = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, secret, options);
};