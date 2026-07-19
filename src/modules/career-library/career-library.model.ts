import { Schema, model } from "mongoose";
import { ICareerLibrary } from "./career-library.interface";

const careerLibrarySchema = new Schema<ICareerLibrary>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },

    industry: {
      type: String,
      required: true,
      trim: true,
    },

    experienceLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: {
        bangladesh: { type: String, default: "", trim: true },
        international: { type: String, default: "", trim: true },
      },
      default: { bangladesh: "", international: "" },
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    skills: {
      type: [String],
      default: [],
    },

    responsibilities: {
      type: [String],
      default: [],
    },

    jobOutlook: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CareerLibrary = model<ICareerLibrary>(
  "CareerLibrary",
  careerLibrarySchema
);
