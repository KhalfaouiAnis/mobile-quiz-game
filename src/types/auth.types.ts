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
      .max(50, "يجب أن يحتوي اسم المستخدم على 50 حرف كحد أقصى")
      .regex(/^[a-zA-Z0-9_]+$/),
    email: EmailSchema.shape.email,
    password: PasswordSchema.shape.password,
    phone: z
      .string()
      .min(8, "يجب أن يتكون رقم الهاتف من 8 أرقام بالضبط")
      .max(8, "يجب أن يتكون رقم الهاتف من 8 أرقام بالضبط")
      .optional(),
  })

export const LoginSchema = z.object({
  username: z.string("حقل مطلوب").min(3, "حقل مطلوب"),
  password: z.string("حقل مطلوب").min(6, "حقل مطلوب"),
});

export const RequestResetPasswordSchema = z.object({
  email: EmailSchema.shape.email,
});

export const ResetPasswordSchema = z
  .object({
    email: EmailSchema.shape.email.optional(),
    newPassword: z.string({ message: "Password is required" }).min(6),
    confirmPassword: z.string({ message: "Password is required" }).min(6),
  })
  .refine((formData) => formData.confirmPassword === formData.newPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const VerifyOtpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "Digits only"),
});

export type SignupInterface = z.infer<typeof SignupSchema>;
export type LoginInterface = z.infer<typeof LoginSchema>;
export type ResetPasswordInterface = z.infer<typeof ResetPasswordSchema>;
export type RequestResetPasswordInterface = z.infer<
  typeof RequestResetPasswordSchema
>;
export type EmailType = z.infer<typeof EmailSchema>;
export type VerifyOtpFormData = z.infer<typeof VerifyOtpSchema>;

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
      message: "Passwords don't match",
      path: ["confirmPassword"],
    },
  );

export type UpdateProfileInterface = z.infer<typeof UpdateProileSchema>;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  games_played: number;
  total_score: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  is_deleted: boolean;
  google_id?: string | null;
  apple_id?: string | null;
  facebook_id?: string | null;
  is_active?: boolean;
  avatar_url?: string;
  [key: string]: unknown;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface RefreshResponse {
  tokens: AuthTokens;
}

/** Finite auth status — drives navigation and UI gates */
export type AuthStatus =
  | "bootstrapping" // app just launched, reading storage
  | "unauthenticated" // no valid session
  | "authenticated" // fully authenticated
  | "refreshing"; // mid-token-refresh (keeps UI stable)

export interface AuthState {
  status: AuthStatus;
  user: AuthUser | null;
  /** Set on successful login / refresh */
  setSession: (user: AuthUser, tokens: AuthTokens) => void;
  /** Clears everything and transitions to unauthenticated */
  logout: () => Promise<void>;
  /** Called by AuthProvider after storage is read */
  setStatus: (status: AuthStatus) => void;
}

/** Shape stored in the failed-request queue while a refresh is in flight */
export interface QueuedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}
