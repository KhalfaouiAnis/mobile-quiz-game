import { create } from "zustand";
import type {
  Participant,
  QuestionPayload,
  AnswerResultPayload,
  RevealPayload,
  LeaderboardEntry,
  SessionJoinedPayload,
  GameStartedPayload,
  RoundStartedPayload,
  RoundEndedPayload,
  GameOverPayload,
} from "@/src/types/game.challenge.types";

// ─── Types ─────────────────────────────────────────────────────────────────

export type GameChallengeStatus = "idle" | "waiting" | "active" | "finished";

/**
 * AnswerReveal is set by:
 *   - ANSWER_RESULT  (personal result — isCorrect, pointsEarned are known)
 *   - ALL_ANSWERED / QUESTION_TIMEOUT  (room reveal — no personal data)
 */
export interface AnswerReveal {
  correctAnswer: number;
  explanation: string | null;
  isCorrect?: boolean;
  pointsEarned?: number;
}

interface GameChallengeStore {
  // ── Session ──
  sessionId: number | null;
  code: string | null;
  isHost: boolean;
  status: GameChallengeStatus;
  participants: Participant[];

  // ── Round ──
  currentRound: number;
  totalRounds: number;
  questionsInRound: number;

  // ── Question ──
  question: QuestionPayload | null;
  myScore: number;

  // ── Answer state (reset per question) ──
  selectedOption: number | null;
  hasAnswered: boolean;
  answerReveal: AnswerReveal | null;

  // ── Leaderboard ──
  roundLeaderboard: LeaderboardEntry[] | null;
  globalLeaderboard: LeaderboardEntry[] | null;

  // ── Actions ──
  setSessionJoined: (p: SessionJoinedPayload) => void;
  addParticipant: (p: {
    userId: number;
    username: string;
    avatarUrl: string | null;
  }) => void;
  markParticipantLeft: (userId: number) => void;
  markParticipantBack: (userId: number) => void;
  setGameStarted: (p: GameStartedPayload) => void;
  setRoundStarted: (p: RoundStartedPayload) => void;
  setQuestion: (p: QuestionPayload) => void;
  setSelectedOption: (option: number) => void;
  setAnswerResult: (p: AnswerResultPayload) => void;
  setReveal: (p: RevealPayload) => void;
  setRoundEnded: (p: RoundEndedPayload) => void;
  setGameOver: (p: GameOverPayload) => void;
  reset: () => void;
}

// ─── Initial state
const initial = {
  sessionId: null,
  code: null,
  isHost: false,
  status: "idle" as GameChallengeStatus,
  participants: [],
  currentRound: 1,
  totalRounds: 4,
  questionsInRound: 25,
  question: null,
  myScore: 0,
  selectedOption: null,
  hasAnswered: false,
  answerReveal: null,
  roundLeaderboard: null,
  globalLeaderboard: null,
};

// ─── Store
export const useGameChallengeStore = create<GameChallengeStore>()((set, get) => ({
  ...initial,

  setSessionJoined: (p) =>
    set({
      sessionId: p.sessionId,
      code: p.code,
      isHost: p.isHost,
      status:
        p.status === "WAITING"
          ? "waiting"
          : p.status === "ACTIVE"
            ? "active"
            : "finished",
      participants: p.participants,
      myScore: p.yourScore ?? 0,
      currentRound: p.currentRound ?? 1,
    }),

  addParticipant: (p) =>
    set((state) => {
      if (state.participants.some((x) => x.userId === p.userId)) return state;
      return {
        participants: [
          ...state.participants,
          {
            ...p,
            totalScore: 0,
            isConnected: true,
          },
        ],
      };
    }),

  markParticipantLeft: (userId) =>
    set((state) => ({
      participants: state.participants.map((p) =>
        p.userId === userId ? { ...p, isConnected: false } : p,
      ),
    })),

  markParticipantBack: (userId) =>
    set((state) => ({
      participants: state.participants.map((p) =>
        p.userId === userId ? { ...p, isConnected: true } : p,
      ),
    })),

  setGameStarted: (p) =>
    set({
      status: "active",
      totalRounds: p.totalRounds,
      participants: p.participants,
    }),

  setRoundStarted: (p) =>
    set({
      currentRound: p.roundNumber,
      totalRounds: p.totalRounds,
      questionsInRound: p.questionsInRound,
      // Clear stale leaderboard from previous round
      roundLeaderboard: null,
    }),

  setQuestion: (p) =>
    set({
      question: p,
      selectedOption: null,
      hasAnswered: false,
      answerReveal: null,
    }),

  setSelectedOption: (option) => {
    // Idempotent — ignore if already answered
    if (get().hasAnswered) return;
    set({ selectedOption: option });
  },

  setAnswerResult: (p) =>
    set((state) => ({
      hasAnswered: true,
      myScore: p.totalScore,
      answerReveal: {
        correctAnswer: p.correctAnswer,
        explanation: p.explanation,
        isCorrect: p.isCorrect,
        pointsEarned: p.pointsEarned,
      },
      // Update participant score in list
      participants: state.participants.map((part) =>
        part.userId === state.sessionId // use own userId stored separately if available
          ? { ...part, totalScore: p.totalScore }
          : part,
      ),
    })),

  // Broadcast reveal — only set if player hasn't answered yet (else they already have their result)
  setReveal: (p) =>
    set((state) => {
      if (state.hasAnswered) return state;
      return {
        answerReveal: {
          correctAnswer: p.correctAnswer,
          explanation: p.explanation,
        },
      };
    }),

  setRoundEnded: (p) =>
    set({
      roundLeaderboard: p.leaderboard,
      globalLeaderboard: p.globalLeaderboard,
    }),

  setGameOver: (p) =>
    set({
      status: "finished",
      globalLeaderboard: p.leaderboard,
    }),

  reset: () => set(initial),
}));
