import useAuthStore from "@/core/store/auth.store";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
    const { user } = useAuthStore();

    if (user) {
        return <Redirect href="/(main)" />;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'transparent' }
            }}
        />
    )
}