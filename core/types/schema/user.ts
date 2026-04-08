import { z } from "zod";

export const UpdateProfileSchema = z.object({
  email: z.email().optional(),
  username: z.string().min(6).optional(),
  avatar_url: z.string().optional(),
});

export const UpdatePasswordSchema = z
  .object({
    email: z.email().min(6),
    currentPassword: z.string({ message: "CurrentPassword is required" }).min(6),
    newPassword: z.string({ message: "Password is required" }).min(6),
  })

export type UpdateProfileInterface = z.infer<typeof UpdateProfileSchema>;
export type UpdatePasswordInterface = z.infer<typeof UpdatePasswordSchema>;
