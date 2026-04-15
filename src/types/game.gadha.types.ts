import { z } from "zod";

export const CreateGadhaGameSessionSchema = z.object({
  subcategoryIds: z
    .array(z.number())
    .length(6, "يرجى تحديد 6 فئات فرعية بالضبط"),
  teams: z
    .array(
      z.object({
        name: z
          .string("يجب أن يتكون اسم الفريق من حرفين على الأقل")
          .min(2)
          .max(20),
        score: z.number().default(0).nullish(),
      }),
    )
    .length(2, "تتطلب اللعبة فريقين بالضبط"),
  questionTimeLimit: z.number().default(0).optional(),
});

export type CreateGadhaGameSession = z.infer<
  typeof CreateGadhaGameSessionSchema
>;

export type Difficulty = "easy" | "medium" | "hard";
export type SessionStatus = "pending" | "active" | "completed" | "cancelled";

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
  teamId: number;
  questionId: number;
  isCorrect: boolean;
  useBoost?: boolean;
}

export interface AnswerQuestionResponse {
  questionId: number;
  isCorrect: boolean;
  basePoints: number;
  pointsAwarded: number;
  boosted: boolean;
  teams: { id: number; name: string; score: number; isBoostUsed: boolean }[];
}

// ─── Reveal
export interface RevealResponse {
  questionId: number;
  question: {
    content: string | null;
    fileUrl: string | null;
    difficulty: Difficulty | null;
    points: number | null;
  };
  answer: {
    text: string;
    fileUrl: string | null;
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
  status: SessionStatus;
  startTime: string | null;
  endTime: string | null;
  winner: ResultTeam | null;
  teams: ResultTeam[];
  boardProgress: { answered: number; uniqueAnswered: number; total: number };
}

// ─── Create session
export interface CreateSessionResponse {
  sessionId: number;
  status: SessionStatus;
  questionTimeLimit: number;
  teams: Team[];
}

export interface Team {
  id: number;
  session_id: number;
  name: string;
  is_boost_used: boolean;
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
  file_url?: string | null;
  difficulty: Difficulty;
  points: number;
  point_value?: number;
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
