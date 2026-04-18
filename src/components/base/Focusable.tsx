import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {
  useFocusable,
  FocusContext,
} from '@noriginmedia/norigin-spatial-navigation';
import { isTV } from '@/src/utils/platform';
import { FOCUS_RING } from '@/src/utils/dimensions';

interface FocusableProps {
  /**
   * Unique key for this focusable node in the spatial nav tree.
   * Required for programmatic focus: call setFocus(focusKey) from anywhere.
   */
  focusKey?: string;
  /**
   * Called when the user presses the Select/Enter/OK remote button.
   * On mobile this maps to a tap.
   */
  onSelect?: () => void;
  /**
   * Called when the user presses a directional key while this element is focused.
   * Return `true` to prevent the default spatial nav movement.
   */
  onArrowPress?: (direction: string) => boolean | void;
  onFocus?: () => void;
  onBlur?: () => void;
  /** Whether this item should steal focus automatically when it mounts. */
  autoFocus?: boolean;
  /** If true, focus cannot escape this container (use for modals). */
  isFocusBoundary?: boolean;
  /** Propagate focus inward to the last-focused child. Default: true. */
  trackChildren?: boolean;
  children: (props: { focused: boolean; hasFocusedChild: boolean }) => React.ReactNode;
  style?: ViewStyle;
  /** Show a visible focus ring around this element when focused. */
  showFocusRing?: boolean;
  /**
   * Only make this focusable on TV. On mobile the wrapper becomes a plain
   * passthrough (touch-based navigation handles it natively).
   */
  tvOnly?: boolean;
}

/**
 * Focusable
 *
 * The foundational building block for all TV navigation. Wraps the norigin
 * `useFocusable` hook and provides:
 *   - A FocusContext so children can participate in the focus tree
 *   - An animated focus ring on TV
 *   - A clean render-prop API: children receive { focused, hasFocusedChild }
 *
 * On mobile, when `tvOnly` is true, this renders a plain View (touch navigation
 * handles everything natively).
 *
 * Example — a simple focusable tile:
 *
 *   <Focusable focusKey="TILE_1" onSelect={() => navigate('/game')}>
 *     {({ focused }) => (
 *       <View style={[styles.tile, focused && styles.tileFocused]} />
 *     )}
 *   </Focusable>
 */
export const Focusable: React.FC<FocusableProps> = ({
  focusKey,
  onSelect,
  onArrowPress,
  onFocus,
  onBlur,
  autoFocus = false,
  isFocusBoundary = false,
  trackChildren = true,
  children,
  style,
  showFocusRing = isTV,
  tvOnly = false,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const { ref, focused, hasFocusedChild, focusSelf, focusKey: resolvedKey } =
    useFocusable({
      onEnterPress: onSelect,
      onArrowPress,
      focusKey,
      onFocus: () => {
        if (isTV) {
          Animated.spring(scaleAnim, {
            useNativeDriver: true,
            toValue: 1.04,
            bounciness: 6,
            speed: 30,
          }).start();
        }
        onFocus?.();
      },
      onBlur: () => {
        if (isTV) {
          Animated.spring(scaleAnim, {
            useNativeDriver: true,
            bounciness: 4,
            toValue: 1,
            speed: 30,
          }).start();
        }
        onBlur?.();
      },
      autoRestoreFocus: true,
      isFocusBoundary,
      trackChildren,
    });

  // On mobile with tvOnly=true, skip all spatial nav machinery
  if (tvOnly && !isTV) {
    return (
      <View style={style}>
        {children({ focused: false, hasFocusedChild: false })}
      </View>
    );
  }

  // On mobile (not tvOnly), wrap in TouchableOpacity for tap support
  if (!isTV) {
    return (
      <FocusContext.Provider value={resolvedKey}>
        <TouchableOpacity
          ref={ref as any}
          activeOpacity={0.8}
          onPress={onSelect}
          style={style}
        >
          {children({ focused, hasFocusedChild })}
        </TouchableOpacity>
      </FocusContext.Provider>
    );
  }

  // ── TV rendering ───────────────────────────────────────────────────────────
  const isFocusVisible = focused && showFocusRing;

  return (
    <FocusContext.Provider value={resolvedKey}>
      <Animated.View
        ref={ref}
        style={[
          style,
          { transform: [{ scale: scaleAnim }] },
          isFocusVisible && styles.focusRing,
        ]}
      >
        {children({ focused, hasFocusedChild })}
      </Animated.View>
    </FocusContext.Provider>
  );
};

const styles = StyleSheet.create({
  focusRing: {
    borderWidth: FOCUS_RING.width,
    borderColor: FOCUS_RING.color,
    borderRadius: 10,
    shadowColor: FOCUS_RING.color,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: FOCUS_RING.shadowRadius,
    shadowOpacity: FOCUS_RING.shadowOpacity,
    elevation: 10,
  },
});
