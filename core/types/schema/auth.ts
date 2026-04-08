import { z } from "zod";

export const EmailSchema = z.object({
  email: z.email("يرجى إدخال بريد إلكتروني صالح"),
});

export const PasswordSchema = z.object({
  password: z
    .string()
    .min(
      6,
      "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل، أحرف كبيرة وصغيرة وحرف خاص واحد على الأقل",
    ),
});

export const SignupSchema = z
  .object({
    username: z
      .string()
      .min(3, "يجب أن يتكون اسم المستخدم من 3 أحرف على الأقل")
      .max(50, "يجب أن يحتوي اسم المستخدم على 50 أحرف كحد أقصى")
      .regex(/^[a-zA-Z0-9_]+$/),
    email: EmailSchema.shape.email,
    password: PasswordSchema.shape.password,
    phone: z
      .string()
      .min(8, "يجب أن يتكون رقم الهاتف من 8 أرقام بالضبط")
      .max(8, "يجب أن يتكون رقم الهاتف من 8 أرقام بالضبط")
      .optional(),
  })
  .superRefine((schema) => {
    schema;
  });

export const LoginSchema = z.object({
  username: z.string("حقل مطلوب").min(3, "حقل مطلوب"),
  password: z.string("حقل مطلوب").min(6, "حقل مطلوب"),
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
