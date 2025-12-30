import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect } from 'react';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

import { Providers } from '@/core/providers';

import "../global.css";
import useAuthStore from '@/core/store/auth.store';
import { injectLogout } from '@/core/api/httpClient';
import { useAppStore } from '@/core/store/app.store';

SplashScreen.preventAutoHideAsync();

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export const unstable_settings = {
  initialRouteName: '(main)',
};

export default function RootLayout() {
  const { isReady, initialize } = useAuthStore();
  const { loadFonts, fontsLoaded } = useAppStore()

  useEffect(() => {
    loadFonts()
    injectLogout(() => useAuthStore.setState({ user: null }));
    initialize();
  }, []);

  useEffect(() => {
    if (isReady && fontsLoaded) {
      SplashScreen.hideAsync().then(() => console.log("splash hidden"));
    }
  }, [isReady, fontsLoaded]);

  if (!isReady || !fontsLoaded) return null;

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar hidden />
    </Providers>
  );
}
