import { z } from "zod";

export const EmailSchema = z.object({
  email: z.email("Please enter a valid email"),
});

export const PasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignupSchema = z.object({
  username: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-zA-Z0-9_]+$/)
    .optional(),
  email: EmailSchema.shape.email,
  password: PasswordSchema.shape.password,
  phone: z.string().optional(),
});

export const LoginSchema = z.object({
  username: z.string(),
  password: PasswordSchema.shape.password,
});

export const RequestResetPasswordSchema = z.object({
  email: EmailSchema.shape.email,
});

export const ResetPasswordSchema = z
  .object({
    email: z.email(),
    newPassword: z.string({ message: "Password is required" }).min(6),
    confirmPassword: z.string({ message: "Password is required" }).min(6),
  })
  .refine((formData) => formData.confirmPassword === formData.newPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupInterface = z.infer<typeof SignupSchema>;
export type LoginInterface = z.infer<typeof LoginSchema>;
export type ResetPasswordInterface = z.infer<typeof ResetPasswordSchema>;
export type RequestResetPasswordInterface = z.infer<
  typeof RequestResetPasswordSchema
>;
export type EmailType = z.infer<typeof EmailSchema>;
