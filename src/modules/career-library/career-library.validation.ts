import { z } from "zod";

const salarySchema = z.object({
  bangladesh: z.string().optional().default(""),
  international: z.string().optional().default(""),
});

export const createCareerLibrarySchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters"),

  image: z.string().optional(),

  industry: z
    .string()
    .min(2, "Industry must be at least 2 characters"),

  experienceLevel: z
    .enum(["Beginner", "Intermediate", "Advanced"])
    .default("Beginner"),

  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters"),

  salary: salarySchema.optional(),

  rating: z
    .number()
    .min(0)
    .max(5)
    .optional(),

  skills: z
    .array(z.string())
    .min(1, "At least one skill is required"),

  responsibilities: z
    .array(z.string())
    .min(1, "At least one responsibility is required"),

  jobOutlook: z.string().optional(),
});

export const updateCareerLibrarySchema = z.object({
  title: z
    .string()
    .min(2)
    .optional(),

  image: z.string().optional(),

  industry: z
    .string()
    .min(2)
    .optional(),

  experienceLevel: z
    .enum(["Beginner", "Intermediate", "Advanced"])
    .optional(),

  shortDescription: z
    .string()
    .min(10)
    .optional(),

  description: z
    .string()
    .min(20)
    .optional(),

  salary: salarySchema.optional(),

  rating: z
    .number()
    .min(0)
    .max(5)
    .optional(),

  skills: z.array(z.string()).optional(),

  responsibilities: z.array(z.string()).optional(),

  jobOutlook: z.string().optional(),
});
