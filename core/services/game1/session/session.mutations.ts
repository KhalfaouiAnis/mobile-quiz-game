import {
  AnswerSubmissionRequest,
  CreateGameSessionRequest,
} from "@/core/types";
import { useMutation } from "@tanstack/react-query";
import {
  cancelSession,
  createSession,
  submitAnswer,
  updateSessionStatus,
} from "./session.service";

export const useCreateGame1Session = () => {
  const mutation = useMutation({
    mutationFn: async (payload: CreateGameSessionRequest) => {
      const { data } = await createSession(payload);
      return data.data;
    },
    onSuccess: () => {},
    onError: (err) => console.log(err),
  });

  return { ...mutation };
};

export const useUpdateGame1SessionStatus = () => {
  const mutation = useMutation({
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

  return { ...mutation };
};

export const useCancelGame1Session = () => {
  const mutation = useMutation({
    mutationFn: async (sessionId: number) => {
      await cancelSession(sessionId);
    },
    onSuccess: () => {},
    onError: (err) => console.log(err),
  });

  return { ...mutation };
};

export const useSubmitAnswer = () => {
  const mutation = useMutation({
    mutationFn: async (payload: AnswerSubmissionRequest) => {
      const { data } = await submitAnswer(payload);

      return data.data;
    },
    onSuccess: () => {},
    onError: (err) => console.log(err),
  });

  return { ...mutation };
};

export const useGame1SessionMutations =() => {
   const createGame1Session = useMutation({
    mutationFn: async (payload: CreateGameSessionRequest) => {
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
    onSuccess: () => {},
    onError: (err) => console.log(err),
  });

  return {
    submitGame1Answer,
    createGame1Session,
    cancelGame1Session,
    updateGame1SessionStatus,
  }
}