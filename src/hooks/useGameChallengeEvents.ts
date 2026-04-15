import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/src/stores/auth.store";
import { useGameChallengeStore } from "@/src/stores/game.challenge.store";
import { getSocket } from "@/src/lib/socket";
import { ServerEvent } from "@/src/types/game.challenge.types";
import type {
  SessionJoinedPayload,
  ParticipantJoinedPayload,
  GameStartedPayload,
  RoundStartedPayload,
  QuestionPayload,
  AnswerResultPayload,
  RevealPayload,
  RoundEndedPayload,
  GameOverPayload,
} from "@/src/types/game.challenge.types";

export function useGameChallengeEvents() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (!token) return;

    // getSocket throws if called without token and socket doesn't exist yet.
    // In this hook we only register listeners — the socket may not be connected
    // yet (that happens in the lobby screen). We call getSocket here just to
    // ensure the instance exists so listeners are attached before connect().
    let socket = getSocket(token);

    // ── Helpers ──
    const store = () => useGameChallengeStore.getState();

    // ── Handlers ──

    const onSessionJoined = (p: SessionJoinedPayload) => {
      store().setSessionJoined(p);
    };

    const onParticipantJoined = (p: ParticipantJoinedPayload) => {
      store().addParticipant(p);
    };

    const onParticipantLeft = ({ userId }: { userId: number }) => {
      store().markParticipantLeft(userId);
    };

    const onParticipantReconnected = ({ userId }: { userId: number }) => {
      store().markParticipantBack(userId);
    };

    const onGameStarted = (p: GameStartedPayload) => {
      store().setGameStarted(p);
      const code = store().code;
      if (code) router.push(`/(game)/play/${code}`);
    };

    const onRoundStarted = (p: RoundStartedPayload) => {
      store().setRoundStarted(p);
    };

    const onQuestion = (p: QuestionPayload) => {
      store().setQuestion(p);
    };

    const onAnswerResult = (p: AnswerResultPayload) => {
      store().setAnswerResult(p);
    };

    // Both all_answered and question_timeout broadcast the correct answer
    const onReveal = (p: RevealPayload) => {
      store().setReveal(p);
    };

    const onRoundEnded = (p: RoundEndedPayload) => {
      store().setRoundEnded(p);
      const code = store().code;
      if (code) router.push(`/(game)/round-result/${code}`);
    };

    const onGameOver = (p: GameOverPayload) => {
      store().setGameOver(p);
      const code = store().code;
      if (code) router.push(`/(game)/game-over/${code}`);
    };

    const onError = ({ message }: { message: string }) => {
      console.warn("[socket error]", message);
    };

    // ── Register ──
    socket.on(ServerEvent.SESSION_JOINED, onSessionJoined);
    socket.on(ServerEvent.PARTICIPANT_JOINED, onParticipantJoined);
    socket.on(ServerEvent.PARTICIPANT_LEFT, onParticipantLeft);
    socket.on(ServerEvent.PARTICIPANT_RECONNECTED, onParticipantReconnected);
    socket.on(ServerEvent.GAME_STARTED, onGameStarted);
    socket.on(ServerEvent.ROUND_STARTED, onRoundStarted);
    socket.on(ServerEvent.QUESTION, onQuestion);
    socket.on(ServerEvent.ANSWER_RESULT, onAnswerResult);
    socket.on(ServerEvent.ALL_ANSWERED, onReveal);
    socket.on(ServerEvent.QUESTION_TIMEOUT, onReveal);
    socket.on(ServerEvent.ROUND_ENDED, onRoundEnded);
    socket.on(ServerEvent.GAME_OVER, onGameOver);
    socket.on(ServerEvent.ERROR, onError);

    return () => {
      socket.off(ServerEvent.SESSION_JOINED, onSessionJoined);
      socket.off(ServerEvent.PARTICIPANT_JOINED, onParticipantJoined);
      socket.off(ServerEvent.PARTICIPANT_LEFT, onParticipantLeft);
      socket.off(ServerEvent.PARTICIPANT_RECONNECTED, onParticipantReconnected);
      socket.off(ServerEvent.GAME_STARTED, onGameStarted);
      socket.off(ServerEvent.ROUND_STARTED, onRoundStarted);
      socket.off(ServerEvent.QUESTION, onQuestion);
      socket.off(ServerEvent.ANSWER_RESULT, onAnswerResult);
      socket.off(ServerEvent.ALL_ANSWERED, onReveal);
      socket.off(ServerEvent.QUESTION_TIMEOUT, onReveal);
      socket.off(ServerEvent.ROUND_ENDED, onRoundEnded);
      socket.off(ServerEvent.GAME_OVER, onGameOver);
      socket.off(ServerEvent.ERROR, onError);
    };
  }, [token]);
}
