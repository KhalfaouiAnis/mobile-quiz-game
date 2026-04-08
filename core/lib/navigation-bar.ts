import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { setStatusBarHidden } from "expo-status-bar";

export const hideSystemBars = async () => {
    if (Platform.OS === 'android') {
        await NavigationBar.setVisibilityAsync("hidden");
        setStatusBarHidden(true, "none")
    }
};