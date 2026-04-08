import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../types/socket-types";
import { TokenService } from "../token-manager";
import { useGame2Store } from "../../store/game2.store";
import { toast } from "sonner-native";

const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL;

class SocketManager {
  public socket: Socket<ServerToClientEvents, ClientToServerEvents> | null =
    null;

  public connect() {
    if (this.socket?.connected) return;

    const token = TokenService.getAccessToken();

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
    });

    this.setupListeners();
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public emit<T extends keyof ClientToServerEvents>(
    event: T,
    ...args: Parameters<ClientToServerEvents[T]>
  ) {
    this.socket?.emit(event, ...args);
  }

  private setupListeners() {
    if (!this.socket) return;

    const store = useGame2Store.getState();

    this.socket.on("connect", () => store.actions.setConnectionStatus(true));
    this.socket.on("disconnect", () =>
      store.actions.setConnectionStatus(false),
    );

    this.socket.on("game:state_update", (state) => {
      store.actions.syncGameState(state);
    });

    this.socket.on("game:turn_start", (data) => {
      store.actions.setCurrentTurn(data);
    });

    this.socket.on("game:error", (err) => {
      console.error("Socket Error:", err);
      toast.error(err.message);
    });
  }
}

export const socketService = new SocketManager();
