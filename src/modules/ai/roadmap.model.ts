import { Schema, model } from "mongoose";
import { IRoadmap } from "./roadmap.interface";

const roadmapSchema = new Schema<IRoadmap>(
  {
    user:       { type: Schema.Types.ObjectId, ref: "User", required: true },
    content:    { type: String, required: true },
    careerGoal: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Roadmap = model<IRoadmap>("Roadmap", roadmapSchema);
