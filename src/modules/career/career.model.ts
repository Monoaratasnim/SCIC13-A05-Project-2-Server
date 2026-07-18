import { Schema, model } from "mongoose";
import { ICareer } from "./career.interface";


const careerSchema = new Schema<ICareer>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    careerGoal: {
      type: String,
      required: true,
      trim: true,
    },

    currentRole: {
      type: String,
      default: "",
      trim: true,
    },

    education: {
      type: String,
      default: "",
      trim: true,
    },

    experienceLevel: {
      type: String,
      enum: [
        "Beginner",
        "Intermediate",
        "Advanced",
      ],
      default: "Beginner",
    },

    skills: {
      type: [String],
      default: [],
    },

    interests: {
      type: [String],
      default: [],
    },

    preferredIndustry: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


export const Career = model<ICareer>(
  "Career",
  careerSchema
);