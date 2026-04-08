import { z } from "zod";

export const CreateGame1SessionSchema = z.object({
  sub_category_ids: z
    .array(z.number())
    .length(6, "يرجى تحديد 6 فئات فرعية بالضبط"),
  teams: z
    .array(
      z.object({
        name: z.string("يجب أن يتكون اسم الفريق من حرفين على الأقل").min(2).max(20),
        score: z.number().default(0).nullish(),
      }),
    )
    .length(2, "تتطلب اللعبة فريقين بالضبط"),
  question_time_limit: z.number().default(0).optional(),
});

export type CreateGame1SessionRequest = z.infer<
  typeof CreateGame1SessionSchema
>;
