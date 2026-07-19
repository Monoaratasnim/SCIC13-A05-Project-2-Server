import { Types } from "mongoose";

export interface IRoadmap {
  user: Types.ObjectId;
  content: string;
  careerGoal: string;
  createdAt?: Date;
  updatedAt?: Date;
}
