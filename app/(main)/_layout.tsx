import useAuthStore from "@/core/store/auth.store";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "react-native";
import { useEffect } from "react";

export default function MainLayout() {
    const { user } = useAuthStore();

    useEffect(()=>{
        StatusBar.setHidden(true, 'fade');
    },[])

    if (!user) {
        return <Redirect href="/(auth)" />;
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