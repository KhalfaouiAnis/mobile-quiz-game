import React from 'react';
import { useRouter } from 'expo-router';
import { useGameEntitlement } from '@/src/hooks/subscription/useEntitlement';
import { GameId, SubscriptionTier } from '@/src/lib/revenuecat/types';

interface EntitlementGateProps {
    gameId: GameId;
    requiredTier: SubscriptionTier;
    children: React.ReactNode;
    /** Optional: render a fallback instead of redirecting */
    fallback?: React.ReactNode;
}

/**
 * Wrap any component or screen to gate it behind a subscription tier.
 *
 * Usage:
 *   <EntitlementGate gameId="game1" requiredTier="pro">
 *     <ProFeature />
 *   </EntitlementGate>
 */
export function EntitlementGate({
    gameId,
    requiredTier,
    children,
    fallback,
}: EntitlementGateProps) {
    const { hasMinTier } = useGameEntitlement(gameId);
    const router = useRouter();

    if (!hasMinTier(requiredTier)) {
        if (fallback) return <>{fallback}</>;

        // Redirect to the game's paywall
        router.replace(`/games/${gameId}/paywall?requiredTier=${requiredTier}`);
        return null;
    }

    return <>{children}</>;
}