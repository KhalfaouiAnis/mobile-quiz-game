import { z } from "zod";

export const ExistingAvatarSchema = z.object({
  id: z.string().optional(),
  public_id: z.string(),
  original_url: z.string(),
  media_type: z.string(),
  transformed_url: z.string().optional(),
});

export const UpdateProfileSchema = z
  .object({
    email: z.email(),
    password: z.string({ message: "Password is required" }).min(6),
    confirmPassword: z.string({ message: "Password is required" }).min(6),
  })
  .refine((schema) => schema.confirmPassword === schema.password, {
    path: ["confirmPassword"],
    error: "Passwords don't match"
  });

export type UpdateProfileInterface = z.infer<typeof UpdateProfileSchema>;
export type ExistingAvatarType = z.infer<typeof ExistingAvatarSchema>;
