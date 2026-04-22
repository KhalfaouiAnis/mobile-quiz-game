import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PurchasesPackage } from 'react-native-purchases';

import { useGameOffering } from '@/src/hooks/subscription/useOfferings';
import { usePurchasePackage, useRestorePurchases } from '@/src/hooks/subscription/usePurchase';
import { useGameEntitlement } from '@/src/hooks/subscription/useEntitlement';
import { GameId, SubscriptionTier } from '@/src/lib/revenuecat/types';

const TIER_LABELS: Record<SubscriptionTier, { name: string; color: string; features: string[] }> = {
    basic: {
        name: 'Basic',
        color: '#6B7280',
        features: ['Access to core levels', 'Standard quality', '1 save slot'],
    },
    pro: {
        name: 'Pro',
        color: '#3B82F6',
        features: ['All Basic features', 'Advanced levels', 'HD quality', '5 save slots'],
    },
    platinum: {
        name: 'Platinum',
        color: '#F59E0B',
        features: ['All Pro features', 'Exclusive content', '4K quality', 'Unlimited saves', 'Early access'],
    },
};

export default function PaywallScreen() {
    const { gameId, requiredTier } = useLocalSearchParams<{
        gameId: GameId;
        requiredTier: SubscriptionTier;
    }>();
    const router = useRouter();
    const [selectedTier, setSelectedTier] = useState<SubscriptionTier>(requiredTier ?? 'pro');

    const { data: packages, isLoading: loadingOfferings } = useGameOffering(gameId);
    const { mutateAsync: purchase, isPending: purchasing } = usePurchasePackage();
    const { mutateAsync: restore, isPending: restoring } = useRestorePurchases();
    const { isActive } = useGameEntitlement(gameId);

    // Auto-close if user already has access (e.g. after purchase)
    React.useEffect(() => {
        if (isActive) router.back();
    }, [isActive]);

    const getPackageForTier = (tier: SubscriptionTier): PurchasesPackage | undefined => {
        // Match package by product identifier containing the tier name
        return packages?.find((pkg) =>
            pkg.product.identifier.includes(tier)
        );
    };

    const handlePurchase = async () => {
        const pkg = getPackageForTier(selectedTier);
        if (!pkg) return;

        try {
            await purchase(pkg);
            Alert.alert('Success! 🎮', 'Your subscription is now active.');
            router.back();
        } catch (e: any) {
            if (!e.message?.includes('cancelled')) {
                Alert.alert('Purchase Failed', e.message ?? 'Please try again.');
            }
        }
    };

    const handleRestore = async () => {
        try {
            await restore();
            Alert.alert('Restored!', 'Your purchases have been restored.');
        } catch {
            Alert.alert('Restore Failed', 'No previous purchases found.');
        }
    };

    if (loadingOfferings) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Unlock {gameId.replace('game', 'Game ')}</Text>
            <Text style={styles.subtitle}>Choose your plan</Text>

            {/* Tier selector */}
            {(['basic', 'pro', 'platinum'] as SubscriptionTier[]).map((tier) => {
                const pkg = getPackageForTier(tier);
                const meta = TIER_LABELS[tier];
                const isSelected = selectedTier === tier;

                return (
                    <TouchableOpacity
                        key={tier}
                        style={[styles.tierCard, isSelected && { borderColor: meta.color, borderWidth: 2 }]}
                        onPress={() => setSelectedTier(tier)}
                    >
                        <View style={styles.tierHeader}>
                            <Text style={[styles.tierName, { color: meta.color }]}>{meta.name}</Text>
                            <Text style={styles.tierPrice}>
                                {pkg?.product.priceString ?? '...'} / mo
                            </Text>
                        </View>
                        {meta.features.map((f) => (
                            <Text key={f} style={styles.feature}>• {f}</Text>
                        ))}
                    </TouchableOpacity>
                );
            })}

            {/* Purchase CTA */}
            <TouchableOpacity
                style={[styles.purchaseButton, (purchasing || restoring) && styles.disabled]}
                onPress={handlePurchase}
                disabled={purchasing || restoring}
            >
                {purchasing ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.purchaseButtonText}>
                        Subscribe to {TIER_LABELS[selectedTier].name}
                    </Text>
                )}
            </TouchableOpacity>

            {/* Restore Purchases — REQUIRED by Apple */}
            <TouchableOpacity onPress={handleRestore} disabled={restoring} style={styles.restoreButton}>
                <Text style={styles.restoreText}>
                    {restoring ? 'Restoring...' : 'Restore Purchases'}
                </Text>
            </TouchableOpacity>

            <Text style={styles.legalText}>
                Subscriptions auto-renew monthly. Cancel anytime in your account settings.
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, paddingBottom: 40 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 6 },
    subtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 24 },
    tierCard: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    tierHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    tierName: { fontSize: 18, fontWeight: '700' },
    tierPrice: { fontSize: 16, fontWeight: '500', color: '#374151' },
    feature: { fontSize: 14, color: '#6B7280', marginTop: 2 },
    purchaseButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    purchaseButtonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
    disabled: { opacity: 0.6 },
    restoreButton: { alignItems: 'center', marginTop: 16 },
    restoreText: { color: '#6B7280', fontSize: 14, textDecorationLine: 'underline' },
    legalText: { fontSize: 11, color: '#9CA3AF', textAlign: 'center', marginTop: 20 },
});