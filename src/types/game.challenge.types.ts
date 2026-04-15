export enum ClientEvent {
  JOIN_SESSION = "join_session",
  LEAVE_SESSION = "leave_session",
  START_GAME = "start_game",
  SUBMIT_ANSWER = "submit_answer",
}

export enum ServerEvent {
  SESSION_JOINED = "session_joined",
  PARTICIPANT_JOINED = "participant_joined",
  PARTICIPANT_LEFT = "participant_left",
  PARTICIPANT_RECONNECTED = "participant_reconnected",
  GAME_STARTED = "game_started",
  ROUND_STARTED = "round_started",
  QUESTION = "question",
  ANSWER_RESULT = "answer_result",
  ALL_ANSWERED = "all_answered",
  QUESTION_TIMEOUT = "question_timeout",
  ROUND_ENDED = "round_ended",
  GAME_OVER = "game_over",
  ERROR = "error",
}

// ─── Server → Client payloads
export interface Participant {
  userId: number;
  username: string;
  avatarUrl: string | null;
  totalScore: number;
  isConnected: boolean;
}

export interface SessionJoinedPayload {
  sessionId: number;
  code: string;
  status: "WAITING" | "ACTIVE" | "FINISHED";
  isHost: boolean;
  participants: Participant[];
  reconnected: boolean;
  yourScore?: number;
  currentRound?: number;
}

export interface ParticipantJoinedPayload {
  userId: number;
  username: string;
  avatarUrl: string | null;
}

export interface GameStartedPayload {
  totalRounds: number;
  totalQuestions: number;
  participants: Participant[];
}

export interface RoundStartedPayload {
  roundNumber: number;
  totalRounds: number;
  questionsInRound: number;
}

export interface QuestionPayload {
  questionIndex: number;
  totalQuestions: number;
  roundNumber: number;
  totalRounds: number;
  questionId: number;
  text: string;
  options: string[];
  timeLimit: number;
  points: number;
  imageUrl: string | null;
}

export interface AnswerResultPayload {
  isCorrect: boolean;
  correctAnswer: number;
  explanation: string | null;
  pointsEarned: number;
  totalScore: number;
}

export interface RevealPayload {
  questionId: number;
  correctAnswer: number;
  explanation: string | null;
}

export interface LeaderboardEntry {
  rank: number;
  userId: number;
  username: string;
  avatarUrl: string | null;
  score: number;
}

export interface RoundEndedPayload {
  roundNumber: number;
  leaderboard: LeaderboardEntry[];
  globalLeaderboard: LeaderboardEntry[];
}

export interface GameOverPayload {
  leaderboard: LeaderboardEntry[];
}

// ─── REST
export interface Category {
  id: number;
  name: string;
  image_url: string | null;
  description: string | null;
  _count: { questions: number };
}

export interface CreateSessionResponse {
  code: string;
  sessionId: number;
}
