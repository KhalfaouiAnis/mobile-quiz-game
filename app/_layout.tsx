import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect } from 'react';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

import { Providers } from '@/core/providers';
import useAuthStore, { authStore } from '@/core/store/auth.store';
import { injectLogout } from '@/core/api/httpClient';
import { useAppStore } from '@/core/store/app.store';

import "../global.css";

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
  }, [loadFonts]);

  useEffect(() => {
    initialize()
  }, [initialize]);

  useEffect(() => {
    const hideSplash = async () => {
      if (isReady && fontsLoaded) {
        requestAnimationFrame(async () => {
          await SplashScreen.hideAsync();
          console.log("Splash hidden cleanly");
        });
      }
    };

    hideSplash();
  }, [isReady, fontsLoaded]);

  useEffect(() => {
    injectLogout(() => authStore?.getState().signOut());
  }, []);

  if (!isReady || !fontsLoaded) return null;

  return (
    <Providers>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false }} />
    </Providers>
  );
}
