import { httpClient } from "@/core/api/httpClient";
import {
  AnswerSubmissionRequest,
  AnswerSubmissionResponse,
  ApiResponse,
  GameBoard,
  GameSession,
  LastAciveSessionStats,
  QuestionResponse,
  Team,
} from "@/core/types";
import { CreateGame1SessionRequest } from "@/core/types/schema/game1";

export const createSession = async (data: CreateGame1SessionRequest) => {
  return httpClient.post<
    ApiResponse<{
      game_session: {
        teams: Team[];
      } & GameSession;
    }>
  >("/sessions", data);
};

export const updateSessionStatus = async (
  sessionId: number,
  action: "start" | "end",
) => {
  return httpClient.post<ApiResponse<{ success: boolean; message: string }>>(
    `/sessions/${sessionId}/status`,
    action,
  );
};

export const cancelSession = async (sessionId: number) => {
  return httpClient.post<Promise<void>>(`/sessions/${sessionId}/cancel`);
};

export const fetchUserSessions = async (userId: number) => {
  return httpClient.get<ApiResponse<{ sessions: GameSession[] }>>(
    `/sessions/user/${userId}`,
  );
};

export const getLatestActiveSession = async () => {
  const { data } =
    await httpClient.get<ApiResponse<LastAciveSessionStats>>(
      `/sessions/last-game`,
    );
  return data?.data;
};

export const getOverallProgress = async () => {
  const { data } = await httpClient.get<
    ApiResponse<{ remaining: number; progress: number }>
  >(`/sessions/overall-progress`);
  return data?.data;
};

export const fetchSessionGameBoard = async (sessionId: number) => {
  const { data } = await httpClient.get<ApiResponse<GameBoard>>(
    `/sessions/${sessionId}/game-board`,
  );

  return data?.data;
};

export const getQuestionById = async (questionId: number) => {
  return httpClient.get<ApiResponse<QuestionResponse>>(
    `/questions/${questionId}`,
  );
};

export const getCorrectAnswer = async (questionId: number) => {
  const { data } = await httpClient.get<
    ApiResponse<{ answer_text: string; file_url?: string }>
  >(`/answers/question/${questionId}`);
  return data;
};

export const submitAnswer = async (payload: AnswerSubmissionRequest) => {
  return httpClient.post<ApiResponse<AnswerSubmissionResponse>>(
    "/answers/submit",
    payload,
  );
};

export const updateTeamScore = async (id: number, score: number) => {
  return httpClient.put<ApiResponse<AnswerSubmissionResponse>>(
    `/teams/${id}/score`,
    { score },
  );
};
