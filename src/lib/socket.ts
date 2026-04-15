import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "@/src/constants";

const SOCKET_URL = API_BASE_URL;

let _socket: Socket | null = null;

/**
 * Returns the singleton socket. Creates it if it doesn't exist yet.
 * Pass token only on first creation — subsequent calls reuse the instance.
 */
export function getSocket(token?: string): Socket {
  if (_socket) return _socket;

  if (!token) throw new Error("getSocket: token required on first call");

  _socket = io(`${SOCKET_URL}/game`, {
    auth: { token },
    autoConnect: false,
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1_000,
  });

  return _socket;
}

/**
 * Connect the socket (idempotent).
 * Call from lobby screen after the user has a session code.
 */
export function connectSocket(token: string): Socket {
  const socket = getSocket(token);
  if (!socket.connected) socket.connect();
  return socket;
}

/**
 * Fully tear down the socket. Call only on game-over or logout.
 */
export function destroySocket(): void {
  _socket?.disconnect();
  _socket = null;
}
