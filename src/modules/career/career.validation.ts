import { z } from "zod";


export const createCareerValidationSchema = z.object({

  careerGoal: z
    .string()
    .min(3, "Career goal must be at least 3 characters"),


  currentRole: z
    .string()
    .optional(),


  education: z
    .string()
    .optional(),


  experienceLevel: z
    .enum([
      "Beginner",
      "Intermediate",
      "Advanced",
    ])
    .default("Beginner"),


  skills: z
    .array(z.string())
    .min(1, "At least one skill is required"),


  interests: z
    .array(z.string())
    .min(1, "At least one interest is required"),


  preferredIndustry: z
    .string()
    .optional(),

});