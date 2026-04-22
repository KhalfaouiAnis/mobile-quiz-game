import '../src/i18n';
import "../global.css";

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect } from 'react';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import * as NavigationBar from 'expo-navigation-bar';
import { Providers } from '@/src/providers';
import { useAppStore } from '@/src/stores/app.store';

import { isTV } from '@/src/utils/platform';
import { useBootstrapAuth } from '@/src/hooks/useBootstrapAuth';
import { configureOAuth } from '@/src/lib/oauth';

SplashScreen.preventAutoHideAsync();
NavigationBar.setVisibilityAsync("hidden");

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export const unstable_settings = {
  initialRouteName: '(main)',
};

export default function RootLayout() {
  const { isReady } = useBootstrapAuth();
  const { loadFonts, fontsLoaded } = useAppStore()

  useEffect(() => {
    loadFonts()
  }, [loadFonts]);

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

  if (!isReady || !fontsLoaded) return null;

  configureOAuth()

  return (
    <Providers>
      <StatusBar hidden={true} />
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: !isTV,
          animation: isTV ? 'fade' : 'default',
          contentStyle: { backgroundColor: '#000' },
        }}
      />
    </Providers>
  );
}