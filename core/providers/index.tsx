import { ThemeProvider } from '@react-navigation/native';
import { PropsWithChildren } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";

import { queryClient } from '@/core/api/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { Dimensions } from 'react-native';
import { useNavigationTheme } from '@/core/lib/theme/use-navigation-theme';
import { SpatialNavigationProvider } from './SpatialNavigationProvider';

export const Providers = ({ children }: PropsWithChildren) => {
    const theme = useNavigationTheme();

    return (
        <SpatialNavigationProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ThemeProvider value={theme}>
                    <QueryClientProvider client={queryClient}>
                        {children}
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