import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/src/stores/auth.store';

export default function AuthLayout() {
    const status = useAuthStore((s) => s.status);

    if (status === "authenticated") return <Redirect href="/(main)/" />;

    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}