export type UserRole = "user" | "admin";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  photo?: string;
  skills?: string[];
  interests?: string[];
  experienceLevel?: string;
  createdAt?: Date;
  updatedAt?: Date;
}