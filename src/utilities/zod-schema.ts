import { z } from "zod";

export const loginSchema = z.object({
  emailAddress: z.string().trim().email(),
  password: z.string().trim().min(6),
});

export const registerSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  emailAddress: z.string().trim().email(),
  password: z.string().trim().min(6),
  phoneNumber: z.string().optional(),
  companyType: z.string(),
});
