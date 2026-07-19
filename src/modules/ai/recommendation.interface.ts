import { Types } from "mongoose";

export interface IRecommendation {
  user: Types.ObjectId;
  content: string;
  careerProfile: {
    skills: string[];
    interests: string[];
    experienceLevel: string;
    education: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
