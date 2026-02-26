import { httpClient } from "@/core/api/httpClient";
import {
  Answer,
  AnswerSubmissionRequest,
  AnswerSubmissionResponse,
  ApiResponse,
  AwardPointsRequest,
  CreateGameSessionRequest,
  GameBoard,
  GameSession,
  QuestionResponse,
  Team,
} from "@/core/types";

export const createSession = async (data: CreateGameSessionRequest) => {
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

export const fetchSessionGameBoard = async (sessionId: number) => {
  const { data } = await httpClient.get<ApiResponse<GameBoard>>(
    `/sessions/${sessionId}/game-board`,
  );

  return data;
};

export const getQuestionById = async (questionId: number) => {
  return httpClient.get<ApiResponse<QuestionResponse>>(
    `/questions/${questionId}`,
  );
};

export const getCorrectAnswer = async (questionId: number) => {
  const { data } = await httpClient.get<ApiResponse<Answer>>(
    `/answers/question/${questionId}/correct`,
  );
  return data;
};

export const submitAnswer = async (payload: AnswerSubmissionRequest) => {
  return httpClient.post<ApiResponse<AnswerSubmissionResponse>>(
    "/answers/submit",
    payload,
  );
};

export const awardPoints = async (payload: AwardPointsRequest) => {
  return httpClient.post<
    ApiResponse<{
      awards: {
        team_id: number;
        points_awarded: number;
        team_score: number;
      }[];
    }>
  >(`sessions/${payload.session_id}/award-points`, payload);
};
