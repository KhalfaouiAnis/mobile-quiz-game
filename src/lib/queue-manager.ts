// ─────────────────────────────────────────────────────────
// queue-manager.ts
//
// When multiple requests 401 simultaneously, only ONE refresh
// call should be made. Every other request that 401s while the
// refresh is in-flight is queued here and retried once the new
// access token arrives (or rejected if the refresh fails).
//
// Pattern: mutex flag + promise queue.
// ─────────────────────────────────────────────────────────

import type { QueuedRequest } from "@/src/types/auth.types";

let _isRefreshing = false;
let _queue: QueuedRequest[] = [];

export const QueueManager = {
  get isRefreshing(): boolean {
    return _isRefreshing;
  },

  setRefreshing(value: boolean): void {
    _isRefreshing = value;
  },

  /**
   * Enqueue a stalled request. Returns a Promise that resolves with the
   * fresh access token (so the caller can retry) or rejects if refresh fails.
   */
  enqueue(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      _queue.push({ resolve, reject });
    });
  },

  /**
   * Called after a successful token refresh.
   * Resolves every queued request with the new access token.
   */
  drainWithToken(accessToken: string): void {
    _queue.forEach(({ resolve }) => resolve(accessToken));
    _queue = [];
    _isRefreshing = false;
  },

  /**
   * Called after a failed token refresh.
   * Rejects every queued request so callers can handle the error.
   */
  drainWithError(error: unknown): void {
    _queue.forEach(({ reject }) => reject(error));
    _queue = [];
    _isRefreshing = false;
  },
} as const;
