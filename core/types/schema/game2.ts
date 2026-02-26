import { z } from "zod";

export const JoinGame2SessionSchema = z.object({
  code: z.string(),
  name: z.string(),
  avatar: z.string(),
});

export type JoinGame2Interface = z.infer<typeof JoinGame2SessionSchema>;
