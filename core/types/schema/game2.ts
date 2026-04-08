import { z } from "zod";

export const JoinGame2SessionSchema = z.object({
  code: z.string(),
  name: z.string(),
  avatar: z.string(),
});

export const CreateGame2SessionSchema = z.object({
  categoryIds: z.array(z.coerce.number().positive()).min(2).max(10),
  totalRounds: z.coerce.number().positive().min(1).max(10).optional(),
  questionsPerRound: z.coerce.number().positive().min(5).max(10).optional(),
  questionTimeoutSeconds: z.coerce
    .number()
    .positive()
    .min(5)
    .max(30)
    .optional(),
  maxParticipants: z.coerce.number().positive().min(2).max(100).optional(),
  shuffleQuestions: z.boolean().optional(),
});

export type JoinGame2Interface = z.infer<typeof JoinGame2SessionSchema>;
export type CreateGame2SessionInterface = z.infer<
  typeof CreateGame2SessionSchema
>;
