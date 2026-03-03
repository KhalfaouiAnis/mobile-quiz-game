import { AnswerSubmissionRequest, GameBoard } from "@/core/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  cancelSession,
  createSession,
  submitAnswer,
  updateSessionStatus,
} from "./session.service";
import { CreateGame1SessionRequest } from "@/core/types/schema/game1";

export const useGame1SessionMutations = () => {
  const queryClient = useQueryClient();

  const createGame1Session = useMutation({
    mutationFn: async (payload: CreateGame1SessionRequest) => {
      const { data } = await createSession(payload);
      return data.data;
    },
    onSuccess: () => {},
    onError: (err) => console.log(err),
  });

  const updateGame1SessionStatus = useMutation({
    mutationFn: async ({
      sessionId,
      action,
    }: {
      sessionId: number;
      action: "start" | "end";
    }) => {
      const { data } = await updateSessionStatus(sessionId, action);

      return data.data;
    },
    onSuccess: () => {},
    onError: (err) => console.log(err),
  });

  const cancelGame1Session = useMutation({
    mutationFn: async (sessionId: number) => {
      await cancelSession(sessionId);
    },
    onSuccess: () => {},
    onError: (err) => console.log(err),
  });

  const submitGame1Answer = useMutation({
    mutationFn: async (payload: AnswerSubmissionRequest) => {
      const { data } = await submitAnswer(payload);

      return data.data;
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: ["game1__session", "game_board", data.session_id],
      });

      const previousDrafts =
        queryClient.getQueryData<GameBoard>([
          "game1__session",
          "game_board",
          data.session_id,
        ]) || [];
      return { previousDrafts };
    },
    onSuccess: () => {},
    onError: (err) => console.log(err),
  });

  return {
    submitGame1Answer,
    createGame1Session,
    cancelGame1Session,
    updateGame1SessionStatus,
  };
};
