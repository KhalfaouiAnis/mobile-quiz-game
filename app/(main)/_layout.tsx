import useAuthStore from "@/core/store/auth.store";
import { Redirect, Stack } from "expo-router";

export default function MainLayout() {
    // const { user } = useAuthStore();

    // if (!user) {
    //     return <Redirect href="/(auth)" />;
    // }
    
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'transparent' }
            }}
        />
    )
}