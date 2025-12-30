import { z } from "zod";
import {
  AreaSchema,
  BaseAdSchema,
  LocationSchema,
  ProvinceSchema,
} from "../shared";

export const UsedCarAdSchema = BaseAdSchema.extend({
  price: z.coerce.number().min(0, "The price field is required"),
  province: ProvinceSchema,
  area: AreaSchema.optional(),
  location: LocationSchema.optional(),

  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),

  year: z.coerce
    .number()
    .min(0, "Year is required")
    .max(new Date().getFullYear()),
  exterior_color: z.string({ message: "Color is required" }).min(1),
  mileage: z.coerce.number().min(1, "Mileage is required"),
  mileage_unit: z.string().optional(),

  fuel_type: z.string().optional(),
  cylinders: z.string().optional(),
  transmission: z.string().optional(),
  under_warranty: z.coerce.boolean().optional(),
  roof: z.string().optional(),

  hide_license_plate: z.coerce.boolean().optional().default(false),

});

export type UsedCarAdInterface = z.infer<typeof UsedCarAdSchema>;
