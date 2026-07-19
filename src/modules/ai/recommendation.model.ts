import { Schema, model } from "mongoose";
import { IRecommendation } from "./recommendation.interface";

const recommendationSchema = new Schema<IRecommendation>(
  {
    user:    { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    careerProfile: {
      skills:           { type: [String], default: [] },
      interests:        { type: [String], default: [] },
      experienceLevel:  { type: String, default: "" },
      education:        { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export const Recommendation = model<IRecommendation>(
  "Recommendation",
  recommendationSchema
);
