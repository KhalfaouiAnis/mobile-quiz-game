import { useMutation } from "@tanstack/react-query";
import { api } from "@/src/lib/api";
import type {
  AnswerQuestionPayload,
  AnswerQuestionResponse,
} from "@/src/types/game.gadha.types";

export function useAnswerQuestion(sessionId: number) {
  return useMutation<AnswerQuestionResponse, Error, AnswerQuestionPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post<AnswerQuestionResponse>(
        `/gadha/sessions/${sessionId}/answer`,
        payload,
      );
      return data;
    },
  });
}
