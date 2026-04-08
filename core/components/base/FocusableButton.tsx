import React from 'react';
import {
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { Focusable } from './Focusable';
import { FONT_SIZE, SPACING, BORDER_RADIUS, FOCUS_RING } from '../../constants/dimensions';
import { isTV } from '../../utils/platform';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface FocusableButtonProps {
  label: string;
  onPress: () => void;
  focusKey?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

const VARIANT_STYLES: Record<
  ButtonVariant,
  { bg: string; bgFocused: string; text: string; border?: string }
> = {
  primary: {
    bg: '#2563EB',
    bgFocused: '#1D4ED8',
    text: '#FFFFFF',
  },
  secondary: {
    bg: '#374151',
    bgFocused: '#4B5563',
    text: '#F9FAFB',
  },
  ghost: {
    bg: 'transparent',
    bgFocused: 'rgba(255,255,255,0.12)',
    text: '#F9FAFB',
    border: 'rgba(255,255,255,0.3)',
  },
  danger: {
    bg: '#DC2626',
    bgFocused: '#B91C1C',
    text: '#FFFFFF',
  },
};

/**
 * FocusableButton
 *
 * A TV-aware button that:
 *   - Scales up + shows focus ring when focused on TV
 *   - Degrades to a standard TouchableOpacity on mobile
 *   - Supports loading and disabled states
 *   - Exposes `focusKey` for programmatic focus
 *
 * Usage:
 *   <FocusableButton
 *     focusKey="BTN_START"
 *     label="Start Game"
 *     variant="primary"
 *     onPress={handleStart}
 *     autoFocus
 *   />
 */
export const FocusableButton: React.FC<FocusableButtonProps> = ({
  label,
  onPress,
  focusKey,
  variant = 'primary',
  disabled = false,
  loading = false,
  autoFocus = false,
  icon,
  style,
  labelStyle,
}) => {
  const v = VARIANT_STYLES[variant];

  return (
    <Focusable
      style={style}
      focusKey={focusKey}
      autoFocus={autoFocus}
      onSelect={disabled || loading ? undefined : onPress}
    >
      {({ focused }) => {
        const bg = focused ? v.bgFocused : v.bg;
        return (
          <View
            style={[
              styles.button,
              { backgroundColor: bg },
              v.border ? { borderWidth: 1, borderColor: v.border } : null,
              disabled && styles.disabled,
              focused && styles.focused,
            ]}
          >
            {loading ? (
              <ActivityIndicator color={v.text} size={isTV ? 'large' : 'small'} />
            ) : (
              <>
                {icon && <View style={styles.iconWrap}>{icon}</View>}
                <Text
                  style={[
                    styles.label,
                    { color: v.text },
                    focused && styles.labelFocused,
                    labelStyle,
                  ]}
                >
                  {label}
                </Text>
              </>
            )}
          </View>
        );
      }}
    </Focusable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isTV ? SPACING.md : SPACING.sm,
    paddingHorizontal: isTV ? SPACING.xl : SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    minWidth: isTV ? 200 : 120,
  },
  focused: {
    // Extra shadow for 10-foot visibility
    shadowColor: FOCUS_RING.color,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 16,
    shadowOpacity: 0.7,
    elevation: 12,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    letterSpacing: isTV ? 0.5 : 0,
  },
  labelFocused: {
    fontWeight: '700',
  },
  iconWrap: {
    marginRight: SPACING.sm,
  },
});
