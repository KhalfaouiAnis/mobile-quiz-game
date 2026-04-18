import { Toaster } from "sonner-native";
import { PropsWithChildren } from 'react';
import { Dimensions } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from '@tanstack/react-query';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { queryClient } from '@/src/lib/query-client';
import { useNavigationTheme } from '@/src/lib/theme/useNavigationTheme';
import { SpatialNavigationProvider } from './SpatialNavigationProvider';

export const Providers = ({ children }: PropsWithChildren) => {
    const theme = useNavigationTheme();

    return (
        <SpatialNavigationProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ThemeProvider value={theme}>
                    <QueryClientProvider client={queryClient}>
                        <KeyboardProvider>
                            {children}
                        </KeyboardProvider>
                    </QueryClientProvider>
                </ThemeProvider>
                <Toaster
                    position='top-center'
                    styles={{
                        toastContainer: {
                            end: 50,
                            start: 50,
                            direction: "rtl",
                            position: 'absolute',
                            width: Dimensions.get("window").width - 100,
                        }
                    }}
                />
            </GestureHandlerRootView>
        </SpatialNavigationProvider>
    )
}