import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFocusable,
  FocusContext,
} from '@noriginmedia/norigin-spatial-navigation';
import { isTV } from '@/src/utils/platform';
import { SCREEN } from '@/src/utils/dimensions';

interface TVScreenProps {
  /** A unique focus key for this screen's root container. */
  focusKey: string;
  children: React.ReactNode;
  style?: ViewStyle;
  /**
   * The focus key of the element to focus when this screen mounts.
   * If omitted, norigin will focus the first available focusable child.
   */
  initialFocusKey?: string;
  /** Set true for full-bleed screens (video player, splash, etc.) */
  disableOverscan?: boolean;
  backgroundColor?: string;
}

/**
 * TVScreen
 *
 * Root wrapper for every screen in the app. Handles:
 *   - TV overscan safe-zone padding (5% inset on all sides)
 *   - Spatial navigation root container for the screen
 *   - StatusBar hiding on TV
 *   - Safe area on mobile
 *
 * Usage in a screen component:
 *
 *   export default function HomeScreen() {
 *     return (
 *       <TVScreen focusKey="HOME_SCREEN" initialFocusKey="HOME_FIRST_CARD">
 *         <HomeContent />
 *       </TVScreen>
 *     );
 *   }
 */
export const TVScreen: React.FC<TVScreenProps> = ({
  focusKey,
  children,
  style,
  initialFocusKey,
  disableOverscan = false,
  backgroundColor = '#111827',
}) => {
  const { ref, focusKey: resolvedKey } = useFocusable({
    focusKey,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    preferredChildFocusKey: initialFocusKey,
  });

  if (isTV) {
    return (
      <FocusContext.Provider value={resolvedKey}>
        <View ref={ref} style={[styles.tvRoot, { backgroundColor }]}>
          <StatusBar hidden />
          <View
            style={[
              disableOverscan && styles.noOverscan,
              styles.tvContent,
              style,
            ]}
          >
            {children}
          </View>
        </View>
      </FocusContext.Provider>
    );
  }

  return (
    <FocusContext.Provider value={resolvedKey}>
      <SafeAreaView
        ref={ref}
        style={[styles.mobileRoot, { backgroundColor }, style]}
      >
        {children}
      </SafeAreaView>
    </FocusContext.Provider>
  );
};

const styles = StyleSheet.create({
  tvRoot: {
    flex: 1,
  },
  tvContent: {
    flex: 1,
    // Overscan compensation — TVs can physically cut off screen edges
    paddingHorizontal: SCREEN.overscanH,
    paddingVertical: SCREEN.overscanV,
  },
  noOverscan: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  mobileRoot: {
    flex: 1,
  },
});
