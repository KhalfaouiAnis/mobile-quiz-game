import { Platform } from 'react-native';

/**
 * Detects whether the app is running on a TV device (Android TV or Apple TV).
 *
 * React Native TVOS sets `Platform.isTV = true` on TV builds.
 * This is the single source of truth — use this everywhere instead of
 * inline Platform checks scattered across the codebase.
 */
export const isTV: boolean = Platform.isTV === true;

export const isAndroid: boolean = Platform.OS === 'android';
export const isIOS: boolean = Platform.OS === 'ios';
export const isAndroidTV: boolean = isTV && isAndroid;
export const isAppleTV: boolean = isTV && isIOS;
