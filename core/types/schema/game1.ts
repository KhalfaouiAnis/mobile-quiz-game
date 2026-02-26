import { z } from "zod";

export const Game1SetupSchema = z.object({
  sub_category_ids: z.array(z.number()).length(6),
  teams: z
    .array(
      z.object({
        name: z
          .string()
          .min(2, "Team name must be at least 2 characters")
          .max(20),
        score: z.number().optional(),
      }),
    )
    .length(2, "The game requires exactly 2 teams"),
});

export type Game1SetupValues = z.infer<typeof Game1SetupSchema>;