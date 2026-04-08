import { useQuery } from "@tanstack/react-query";
import {
  fetchSessionGameBoard,
  getCorrectAnswer,
  getLatestActiveSession,
  getOverallProgress,
  getQuestionById,
} from "./session.service";

export const useGame1SessionQueries = () => {
  const useGameBoard = (session_id: number) =>
    useQuery({
      queryKey: ["game1__session", "game_board", session_id],
      queryFn: () => fetchSessionGameBoard(session_id),
    });

  const useQuestion = (question_id: number) =>
    useQuery({
      queryKey: ["game1__question", question_id],
      queryFn: () => getQuestionById(question_id),
      staleTime: 60 * 60 * 10,
    });

  const useLastSession = () =>
    useQuery({
      queryKey: ["game1__last__session"],
      queryFn: () => getLatestActiveSession(),
      staleTime: 60 * 60 * 10,
    });

  const useOverallProgress = () =>
    useQuery({
      queryKey: ["game1__overall_progress"],
      queryFn: () => getOverallProgress(),
      staleTime: 60 * 60 * 10,
    });

  const useCorerctAnswer = (question_id: number) =>
    useQuery({
      queryKey: ["game1__answer", question_id],
      queryFn: () => getCorrectAnswer(question_id),
    });

  return {
    useOverallProgress,
    useCorerctAnswer,
    useLastSession,
    useGameBoard,
    useQuestion,
  };
};
