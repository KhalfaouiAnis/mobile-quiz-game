import { z } from "zod";

// question_time_limit?:
//   | "FIVE_SECONDS"
//   | "TEN_SECONDS"
//   | "FIFTEEN_SECONDS"
//   | "TWENTY_SECONDS";

export const CreateGame1SessionSchema = z.object({
  sub_category_ids: z
    .array(z.number())
    .length(6, "The game requires exactly 6 subcategories"),
  teams: z
    .array(
      z.object({
        name: z.string().min(2).max(20),
        score: z.number().optional(),
      }),
    )
    .length(2, "The game requires exactly 2 teams"),
  question_time_limit: z
    .enum(["FIVE_SECONDS", "TEN_SECONDS", "FIFTEEN_SECONDS", "TWENTY_SECONDS"])
    .default("FIVE_SECONDS")
    .optional(),
});

export type CreateGame1SessionRequest = z.infer<typeof CreateGame1SessionSchema>;
