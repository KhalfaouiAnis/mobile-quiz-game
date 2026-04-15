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

export const loginSchema = z.object({
  identifier: z.string("حقل مطلوب").min(3, "حقل مطلوب"),
  password: z.string("حقل مطلوب").min(6, "حقل مطلوب"),
});

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "يجب أن يتكون اسم المستخدم من 3 أحرف على الأقل")
    .max(50, "يجب أن يحتوي اسم المستخدم على 50 حرف كحد أقصى")
    .regex(/^[a-zA-Z0-9_\u0600-\u06FF]+$/, "لا يجوز أن يحتوي اسم المستخدم إلا على أحرف إنجليزية أو عربية وأرقام وشرطات سفلية"),
  email: EmailSchema.shape.email,
  password: PasswordSchema.shape.password,
  phone: z
    .string()
    .min(8, "يجب أن يتكون رقم الهاتف من 8 أرقام بالضبط")
    .max(8, "يجب أن يتكون رقم الهاتف من 8 أرقام بالضبط")
    .optional()
    .or(z.literal(""))
});

export const forgotPasswordEmailSchema = z.object({
  email: EmailSchema.shape.email,
});

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .length(6, "يجب أن يتكون رمز OTP من 6 أرقام")
    .regex(/^\d+$/, "Digits only"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: PasswordSchema.shape.password,
    confirmPassword: PasswordSchema.shape.password,
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

export const UpdateProileSchema = z
  .object({
    email: EmailSchema.shape.email.optional(),
    newPassword: PasswordSchema.optional(),
    confirmPassword: PasswordSchema.optional(),
    avatarUrl: z.string().optional(),
  })
  .refine(
    ({ confirmPassword, newPassword }) => confirmPassword === newPassword,
    {
      message: "كلمتا المرور غير متطابقتين",
      path: ["confirmPassword"],
    },
  );

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileInterface = z.infer<typeof UpdateProileSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordEmailSchema>;
