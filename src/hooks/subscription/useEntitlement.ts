import {
  useSubscriptionStore,
  selectGameEntitlement,
} from "@/src/stores/subscription.store";
import { GameId, SubscriptionTier } from "@/src/lib/revenuecat/types";

/**
 * Main hook to check entitlement for a specific game.
 *
 * Usage:
 *   const { isActive, tier, hasMinTier } = useGameEntitlement('game1');
 *   if (hasMinTier('pro')) { ... }
 */
export function useGameEntitlement(gameId: GameId) {
  const entitlement = useSubscriptionStore(selectGameEntitlement(gameId));

  const TIER_RANK: Record<SubscriptionTier, number> = {
    basic: 1,
    pro: 2,
    platinum: 3,
  };

  /**
   * Returns true if user has at least the specified tier.
   * e.g. hasMinTier('pro') returns true for both pro and platinum subscribers.
   */
  const hasMinTier = (requiredTier: SubscriptionTier): boolean => {
    if (!entitlement.isActive || !entitlement.tier) return false;
    return TIER_RANK[entitlement.tier] >= TIER_RANK[requiredTier];
  };

  return {
    isActive: entitlement.isActive,
    tier: entitlement.tier,
    expirationDate: entitlement.expirationDate,
    hasMinTier,
    isBasic: entitlement.tier === "basic",
    isPro: entitlement.tier === "pro",
    isPlatinum: entitlement.tier === "platinum",
  };
}
