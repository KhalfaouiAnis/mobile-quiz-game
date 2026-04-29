import { z } from "zod";

export const CreateGadhaGameSessionSchema = z.object({
  subcategoryIds: z.array(z.any()).length(6, "يرجى تحديد 6 فئات فرعية بالضبط"),
  teams: z
    .array(
      z.object({
        name: z
          .string("يجب أن يتكون اسم الفريق من حرفين على الأقل")
          .min(2)
          .max(20),
        score: z.number().min(1).max(10).default(1).nullish(),
      }),
    )
    .length(2, "تتطلب اللعبة فريقين بالضبط"),
  questionTimeLimit: z.number().default(0).optional(),
});

export type CreateGadhaGameSession = z.infer<
  typeof CreateGadhaGameSessionSchema
>;

export type Difficulty = "easy" | "medium" | "hard";
export type GameStatus = "pending" | "active" | "completed" | "cancelled";

// ─── Subcategory picker
export interface GameGadhaSubcategory {
  id: number;
  name: string;
  image_url: string | null;
  eligible: boolean; // has ≥2 easy + ≥2 medium + ≥2 hard questions
  counts: { easy: number; medium: number; hard: number; total: number };
}

export interface GameGadhaCategory {
  id: number;
  name: string;
  image_url: string | null;
  subcategories: GameGadhaSubcategory[];
}

// ─── Answer
export interface AnswerQuestionPayload {
  teamId?: number;
  noOne?: boolean;
  questionId: number;
  isCorrect: boolean;
  useBoost?: boolean;
}

export interface AnswerQuestionResponse {
  isSessionComplete?: boolean;
  questionId: number;
  isCorrect: boolean;
  pointsAwarded: number;
  nextTeamId: number;
  boosted: boolean;
}

// ─── Reveal
export interface RevealResponse {
  answer: {
    text: string;
    fileUrl: string | null;
    mediaType?: "image" | "video";
  };
}

// ─── Results
export interface ResultTeam {
  rank: number;
  id: number;
  name: string;
  score: number;
  isBoostUsed: boolean;
  correctAnswers: number;
  totalAnswered: number;
  accuracy: number;
  answerHistory: {
    questionId: number;
    difficulty: Difficulty;
    basePoints: number;
    pointsAwarded: number;
    isCorrect: boolean;
    answeredAt: string;
  }[];
}

export interface LastAciveSessionStats {
  remainingQuestions: number;
  completionPercentage: number;
  sessionId: number;
}

export interface ResultsResponse {
  sessionId: number;
  status: GameStatus;
  startTime: string | null;
  endTime: string | null;
  winner: ResultTeam | null;
  teams: ResultTeam[];
  boardProgress: { answered: number; uniqueAnswered: number; total: number };
}

// ─── Create session
export interface CreateSessionResponse {
  sessionId: number;
  status: GameStatus;
  questionTimeLimit: number;
  teams: Team[];
}

export interface Team {
  id: number;
  session_id: number;
  name: string;
  is_boost_used: boolean;
  is_current_turn?: boolean;
  score: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  is_deleted: boolean;
}

export interface Question {
  id: number;
  sub_category_id: number;
  content: string;
  difficulty: Difficulty;
  points: number;
  file_url?: string | null;
  media_type?: "image" | "video";
  init_fullscreen?: boolean;
  is_answered?: boolean;
  grid_row: number;
  grid_col: number;
  subcategory?: {
    id: number;
    name: string;
    image_url: string | null;
  };
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  is_deleted: boolean;
}

export interface Answer {
  id: number;
  question_id: number;
  file_url?: string | null;
  answer_text: string;
  is_correct: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  is_deleted: boolean;
}

export interface GameBoard {
  questionTimeLimit: number;
  sessionId: number;
  grid: Question[];
  teams: Team[];
}

export interface SessionBoard {
  session: {
    id: number;
    status: GameStatus;
    questionTimeLimit: number;
    startTime: Date | null;
    endTime: Date | null;
    createdAt: Date;
  };
  columnHeaders: {
    col: number;
    subcategoryId: number | null;
    subcategoryName: string | null;
    imageUrl: string | null;
  }[];
  questions: Question[];
  teams: Team[];
  progress: {
    answered: number;
    total: number;
  };
}
