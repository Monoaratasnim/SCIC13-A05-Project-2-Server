import { Types } from "mongoose";


export interface ICareer {
  user: Types.ObjectId;

  careerGoal: string;

  currentRole?: string;

  education?: string;

  experienceLevel:
    | "Beginner"
    | "Intermediate"
    | "Advanced";

  skills: string[];

  interests: string[];

  preferredIndustry?: string;

  createdAt?: Date;

  updatedAt?: Date;
}