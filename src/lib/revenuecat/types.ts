export type GameId = "gadha" | "theChallenge" | "theLiar";
export type SubscriptionTier = "basic" | "pro" | "platinum";

export interface GameEntitlement {
  gameId: GameId;
  tier: SubscriptionTier | null;
  isActive: boolean;
  expirationDate: string | null;
}

export interface SubscriptionState {
  gadha: GameEntitlement;
  theChallenge: GameEntitlement;
  theLiar: GameEntitlement;
  isLoading: boolean;
  lastSyncedAt: number | null;
}
