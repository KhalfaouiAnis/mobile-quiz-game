import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/src/stores/auth.store';
import { useEffect } from 'react';
import { configureRevenueCat, resetRevenueCat } from '@/src/lib/revenuecat/service';
import { useSubscriptionStore } from '@/src/stores/subscription.store';
import { useAuth } from '@/src/hooks/useAuth';

export default function AppLayout() {
    const status = useAuthStore((s) => s.status);
    // const { user } = useAuth()
    // const clearSubscriptions = useSubscriptionStore((s) => s.clearSubscriptions);

    // useEffect(() => {
    //     if (status === "authenticated" && user?.id) {
    //         // Initialize RevenueCat with the authenticated user's ID
    //         configureRevenueCat(user.id).catch(console.error);
    //     } else {
    //         // User logged out — clear subscription cache and RC session
    //         clearSubscriptions();
    //         resetRevenueCat().catch(console.error);
    //     }
    // }, [status, user?.id]);

    if (status === "unauthenticated") return <Redirect href="/(auth)/" />;

    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}