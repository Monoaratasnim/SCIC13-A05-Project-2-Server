import { User } from "../user/user.model";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "./auth.utils";


interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  skills?: string[];
  interests?: string[];
  experienceLevel?: string;
}


interface LoginPayload {
  email: string;
  password: string;
}


// REGISTER USER
export const registerUser = async (
  payload: RegisterPayload
) => {

  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }


  const hashedPassword = await hashPassword(
    payload.password
  );


  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });


  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });


  // Remove password before sending response
  const { password, ...userWithoutPassword } =
    user.toObject();


  return {
    user: userWithoutPassword,
    token,
  };
};




// LOGIN USER
export const loginUser = async (
  payload: LoginPayload
) => {

  const user = await User.findOne({
    email: payload.email,
  }).select("+password");


  if (!user) {
    throw new Error("Invalid email or password");
  }


  const isPasswordMatched =
    await comparePassword(
      payload.password,
      user.password
    );


  if (!isPasswordMatched) {
    throw new Error("Invalid email or password");
  }


  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });


  // Remove password before sending response
  const { password, ...userWithoutPassword } =
    user.toObject();


  return {
    user: userWithoutPassword,
    token,
  };
};