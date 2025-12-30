import { ThemeProvider } from '@react-navigation/native';
import { PropsWithChildren } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from "sonner-native";

import { queryClient } from '@/core/api/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { useNavigationTheme } from '../lib/theme/use-navigation-theme';

export const Providers = ({ children }: PropsWithChildren) => {
    const theme = useNavigationTheme();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <ThemeProvider value={theme}>
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>
                </ThemeProvider>
            </SafeAreaProvider>
            <Toaster />
        </GestureHandlerRootView>
    )
}