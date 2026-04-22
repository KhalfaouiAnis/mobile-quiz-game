import { GameId, SubscriptionTier } from "./types";

export const RC_CONFIG = {
  IOS_KEY: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY!,
  ANDROID_KEY: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY!,
} as const;

// Must match exactly what you created in RevenueCat dashboard
export const ENTITLEMENT_KEYS: Record<
  GameId,
  Record<SubscriptionTier, string>
> = {
  gadha: {
    basic: "gadha_basic",
    pro: "gadha_pro",
    platinum: "gadha_platinum",
  },
  theChallenge: {
    basic: "theChallenge_basic",
    pro: "theChallenge_pro",
    platinum: "theChallenge_platinum",
  },
  theLiar: {
    basic: "theLiar_basic",
    pro: "theLiar_pro",
    platinum: "theLiar_platinum",
  },
};

// Must match offering IDs in RevenueCat dashboard
export const OFFERING_IDS: Record<GameId, string> = {
  gadha: "gadha_offering",
  theChallenge: "theChallenge_offering",
  theLiar: "theLiar_offering",
};

// Package identifiers inside each offering
export const PACKAGE_IDS: Record<SubscriptionTier, string> = {
  basic: "$rc_monthly", // built-in RevenueCat identifier
  pro: "pro_monthly", // custom identifier you set in dashboard
  platinum: "platinum_monthly",
};

export const TIERS: SubscriptionTier[] = ["basic", "pro", "platinum"];
export const GAMES: GameId[] = ["gadha", "theChallenge", "theLiar"];
