import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Animated,
  BackHandler,
  ViewStyle,
} from 'react-native';
import {
  useFocusable,
  FocusContext,
  setFocus,
} from '@noriginmedia/norigin-spatial-navigation';
import { FocusableButton } from './FocusableButton';
import {
  FONT_SIZE,
  SPACING,
  BORDER_RADIUS,
  SCREEN,
} from '@/src/utils/dimensions';
import { isTV } from '@/src/utils/platform';

interface TVModalAction {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  focusKey?: string;
  /** Focus this button when the modal opens.*/
  autoFocus?: boolean;
}

interface TVModalProps {
  visible: boolean;
  title: string;
  message?: string;
  actions: TVModalAction[];
  onDismiss?: () => void;
  /** Custom content rendered between message and action buttons. */
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
}

const MODAL_FOCUS_KEY = 'TV_MODAL_CONTAINER';

/**
 * TVModal
 *
 * A confirmation / alert modal designed for TV UX.
 *
 * KEY TV BEHAVIOURS:
 * 1. Focus is trapped inside the modal when it opens — spatial nav cannot
 *    escape to background content (isFocusBoundary=true).
 * 2. The first action button is auto-focused on open (or whichever has
 *    autoFocus=true).
 * 3. The Android TV Back button dismisses the modal (calls onDismiss).
 * 4. On mobile it falls back to a standard RN Modal with tap targets.
 *
 * Usage:
 *   <TVModal
 *     visible={showConfirm}
 *     title="Quit Game?"
 *     message="Your progress will be lost."
 *     actions={[
 *       { label: 'Cancel', variant: 'secondary', onPress: () => setShowConfirm(false), autoFocus: true },
 *       { label: 'Quit',   variant: 'danger',    onPress: handleQuit },
 *     ]}
 *     onDismiss={() => setShowConfirm(false)}
 *   />
 */
export const TVModal: React.FC<TVModalProps> = ({
  visible,
  title,
  message,
  actions,
  onDismiss,
  children,
  containerStyle,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;

  // ── Focus trap container
  const { focusKey: modalFocusKey } = useFocusable({
    focusKey: MODAL_FOCUS_KEY,
    isFocusBoundary: true,   // ← nothing outside the modal can be focused
    trackChildren: true,
    autoRestoreFocus: true,
  });

  // ── Animate in/out──────
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          speed: 25,
          bounciness: 5,
          useNativeDriver: true,
        }),
      ]).start();

      // Steal focus into the modal once it's open
      if (isTV) {
        const timer = setTimeout(() => {
          const autoFocusAction = actions.find((a) => a.autoFocus);
          const targetKey =
            autoFocusAction?.focusKey ??
            actions[0]?.focusKey ??
            `${MODAL_FOCUS_KEY}_BTN_0`;
          setFocus(targetKey);
        }, 80); // brief delay lets the modal mount before we steal focus
        return () => clearTimeout(timer);
      }
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.94,
          duration: 140,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  // ── Android back button─
  useEffect(() => {
    if (!visible || !isTV) return;
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      onDismiss?.();
      return true; // prevent default back navigation
    });
    return () => handler.remove();
  }, [visible, onDismiss]);

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onDismiss}
    >
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />

      {/* Dialog */}
      <View style={styles.centerer}>
        <FocusContext.Provider value={modalFocusKey}>
          <Animated.View
            style={[
              styles.dialog,
              containerStyle,
              { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Text style={styles.title}>{title}</Text>
            {message ? <Text style={styles.message}>{message}</Text> : null}
            {children}

            {/* Action buttons */}
            <View style={styles.actions}>
              {actions.map((action, index) => (
                <FocusableButton
                  variant={action.variant ?? (index === 0 ? 'secondary' : 'primary')}
                  focusKey={action.focusKey ?? `${MODAL_FOCUS_KEY}_BTN_${index}`}
                  key={action.focusKey ?? `${MODAL_FOCUS_KEY}_BTN_${index}`}
                  autoFocus={action.autoFocus === true && isTV}
                  onPress={action.onPress}
                  style={styles.actionBtn}
                  label={action.label}
                />
              ))}
            </View>
          </Animated.View>
        </FocusContext.Provider>
      </View>
    </Modal>
  );
};

const DIALOG_WIDTH = isTV
  ? Math.min(SCREEN.width * 0.5, 700)
  : Math.min(SCREEN.width * 0.85, 400);

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.72)',
  },
  centerer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    width: DIALOG_WIDTH,
    backgroundColor: '#1F2937',
    borderRadius: BORDER_RADIUS.lg,
    padding: isTV ? SPACING.xxl : SPACING.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 32,
    elevation: 24,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  message: {
    fontSize: FONT_SIZE.md,
    color: '#9CA3AF',
    marginBottom: isTV ? SPACING.xl : SPACING.lg,
    textAlign: 'center',
    lineHeight: FONT_SIZE.md * 1.55,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: isTV ? SPACING.lg : SPACING.md,
    flexWrap: 'wrap',
    marginTop: SPACING.sm,
  },
  actionBtn: {
    flex: 1,
    minWidth: isTV ? 160 : 110,
  },
});
