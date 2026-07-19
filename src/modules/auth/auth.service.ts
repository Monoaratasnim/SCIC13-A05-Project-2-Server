import { OAuth2Client } from "google-auth-library";
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



// GOOGLE LOGIN USER
interface GoogleLoginPayload {
  credential: string;
}

export const googleLoginUser = async (
  payload: GoogleLoginPayload
) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: payload.credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload_ = ticket.getPayload();

  if (!payload_ || !payload_.email) {
    throw new Error("Invalid Google token");
  }

  const { email, name, picture } = payload_;

  let user = await User.findOne({ email });

  if (!user) {
    const randomPassword = await hashPassword(
      Math.random().toString(36).slice(-16)
    );

    user = await User.create({
      fullName: name || email.split("@")[0],
      email,
      password: randomPassword,
      photo: picture || "",
    });
  }

  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  const { password: _, ...userWithoutPassword } =
    user.toObject();

  return {
    user: userWithoutPassword,
    token,
  };
};




// GET PROFILE
export const getProfile = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
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