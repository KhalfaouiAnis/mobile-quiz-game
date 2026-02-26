import { useQuery } from "@tanstack/react-query";
import {
  fetchSessionGameBoard,
  getCorrectAnswer,
  getQuestionById,
} from "./session.service";

export const useSessionGameBoardQuery = (session_id: number) => {
  return useQuery({
    queryKey: ["game1__session", "game_board", session_id],
    queryFn: () => fetchSessionGameBoard(session_id),
  });
};

export const useQuestionQuery = (question_id: number) => {
  return useQuery({
    queryKey: ["game1__question", question_id],
    queryFn: () => getQuestionById(question_id),
    staleTime: 60 * 60 * 10,
  });
};

export const useCorrectAnswerQuery = (question_id: number) => {
  return useQuery({
    queryKey: ["game1__answer", question_id],
    queryFn: () => getCorrectAnswer(question_id),
  });
};
