import { Stack } from 'expo-router';

export default function GadhaLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'fade',
                contentStyle: { backgroundColor: '#0F0F13' },
            }}
        />
    );
}