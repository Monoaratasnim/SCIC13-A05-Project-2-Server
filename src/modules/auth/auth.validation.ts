import { z } from "zod";

export const registerValidationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters"),

  email: z
    .string()
    .email("Please provide a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  skills: z
    .array(z.string())
    .optional(),

  interests: z
    .array(z.string())
    .optional(),

  experienceLevel: z
    .string()
    .optional(),
});


export const loginValidationSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});