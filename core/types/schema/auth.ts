import { z } from "zod";
import { UserRole } from "..";

export const EmailSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export const PasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginSchema = z.object({
  phone: z
    .string()
    .min(6, "Please enter a valid phone number")
    .max(15, "Please enter a valid phone number"),
  password: z.string().min(6, "Password is required"),
});

export const SignupSchema = z.object({
  fullname: z.string().min(3, "Name must be at least 3 characters"),
  phone: z
  .string()
  .min(6, "Please enter a valid phone number")
  .max(15, "Please enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Please enter a valid email").optional(),
  role: z.optional(z.nativeEnum(UserRole)),
});

export const RequestResetPasswordSchema = z.object({
  email: z.optional(EmailSchema.shape.email),
  phone: z.optional(SignupSchema.shape.phone),
});

export const ResetPasswordSchema = z
  .object({
    phone: z.string().optional(),
    password: z.string({ message: "Password is required" }).min(6),
    confirmPassword: z.string({ message: "Password is required" }).min(6),
  })
  .refine((formData) => formData.confirmPassword === formData.password, {
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
