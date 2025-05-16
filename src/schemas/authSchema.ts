import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10).max(12),
});

export const loginSchema = z.object({
  phone: z.string().min(10).max(12),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
});
