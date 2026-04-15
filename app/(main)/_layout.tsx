import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/src/stores/auth.store';

export default function AppLayout() {
    const status = useAuthStore((s) => s.status);

    if (status === "unauthenticated") return <Redirect href="/(auth)/" />;

    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}