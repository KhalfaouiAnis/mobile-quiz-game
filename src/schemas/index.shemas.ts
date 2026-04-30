import { z } from "zod";

export const PaymentObjectSchema = z.object({
  amount: z.object({
    currency: z.enum(["KWD"]),
    value: z.coerce.number(),
  }),
  language: z.enum(["en", "ar"]).optional(),
  urls: z.object({ successUrl: z.string(), errorUrl: z.string() }).optional(),
  customer: z.optional(
    z.object({
      fullName: z.string().optional(),
      phoneNumber: z.string().optional(),
    }),
  ),
  description: z.string().optional(),
  order: z
    .object({
      ref: z.string().optional(),
      placedAt: z.date(),
      products: z.array(
        z.object({
          nameEn: z.string(),
          nameAr: z.string(),
          qty: z.coerce.number(),
          price: z.coerce.number(),
        }),
      ),
    })
    .optional(),
});

export type PaymentObjectInterface = z.infer<typeof PaymentObjectSchema>;