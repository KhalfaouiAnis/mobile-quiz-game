import { Question, Team } from ".";

export interface ServerToClientEvents {
  "game:player_joined": (payload: { playerId: string; name: string }) => void;
  "game:state_update": (gameState: Game2State) => void;
  "game:turn_start": (payload: {
    playerId: string;
    question: Question;
  }) => void;
  "game:points_awarded": (payload: { playerId: string; score: number }) => void;
  "game:error": (payload: { code: string; message: string }) => void;
}

export interface ClientToServerEvents {
  "lobby:create": (payload: { settings: any }) => void;
  "join_session": (payload: { code: string }) => void;
  "leave_session": (payload: { code: string }) => void;
  "start_game": (payload: { session_id: string }) => void;
  "submit_answer": (payload: { session_id: string; answerIndex: number }) => void;
}

export type Game2Status = "WAITING" | "ACTIVE" | "FINISHED";

export interface Game2State {
  currentTurn?: string;
  status: Game2Status;
  session_id: string;
  players: Team[];
}
