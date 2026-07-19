import { Types } from "mongoose";

export interface ICareerLibrary {
  title: string;
  image: string;
  industry: string;
  experienceLevel: "Beginner" | "Intermediate" | "Advanced";
  shortDescription: string;
  description: string;
  salary: {
    bangladesh: string;
    international: string;
  };
  rating: number;
  skills: string[];
  responsibilities: string[];
  jobOutlook: string;
  createdAt?: Date;
  updatedAt?: Date;
}
