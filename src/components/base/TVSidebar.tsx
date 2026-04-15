import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Animated,
} from 'react-native';
import {
  useFocusable,
  FocusContext,
} from '@noriginmedia/norigin-spatial-navigation';
import { Focusable } from './Focusable';
import {
  FONT_SIZE,
  SPACING,
  BORDER_RADIUS,
  ICON_SIZE,
  FOCUS_RING,
} from '@/src/constants/dimensions';
import { isTV } from '@/src/utils/platform';

export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onSelect: () => void;
}

interface TVSidebarProps {
  items: MenuItem[];
  activeKey?: string;
  focusKey?: string;
  /** Collapsed (icon-only) vs expanded (icon + label) */
  collapsed?: boolean;
  onFocusEnter?: () => void;
  style?: ViewStyle;
}

const SIDEBAR_FOCUS_KEY = 'SIDEBAR_MENU';

/**
 * TVSidebar
 *
 * A vertical navigation menu for TV UIs (left-edge sidebar pattern).
 *
 * FOCUS BEHAVIOUR:
 *   - Expands automatically when any child gains focus (TV)
 *   - Collapses when focus leaves the sidebar
 *   - Remembers the last focused item (norigin autoRestoreFocus)
 *   - Call setFocus(SIDEBAR_FOCUS_KEY) from anywhere to jump to the sidebar
 *
 * Usage:
 *   <TVSidebar
 *     items={[
 *       { key: 'home',     label: 'Home',     icon: <HomeIcon />,  onSelect: () => router.push('/') },
 *       { key: 'games',    label: 'Games',    icon: <GameIcon />,  onSelect: () => router.push('/games') },
 *       { key: 'settings', label: 'Settings', icon: <GearIcon />,  onSelect: () => router.push('/settings') },
 *     ]}
 *     activeKey={currentRoute}
 *   />
 */
export const TVSidebar: React.FC<TVSidebarProps> = ({
  items,
  activeKey,
  focusKey = SIDEBAR_FOCUS_KEY,
  collapsed: collapsedProp = true,
  onFocusEnter,
  style,
}) => {
  const [expanded, setExpanded] = useState(!collapsedProp);
  const widthAnim = React.useRef(
    new Animated.Value(collapsedProp ? COLLAPSED_WIDTH : EXPANDED_WIDTH),
  ).current;

  const { ref, focusKey: resolvedKey } = useFocusable({
    focusKey,
    trackChildren: true,
    autoRestoreFocus: true,
    onFocus: () => {
      if (isTV) expand();
      onFocusEnter?.();
    },
    onBlur: () => {
      if (isTV && collapsedProp) collapse();
    },
  });

  const expand = () => {
    setExpanded(true);
    Animated.spring(widthAnim, {
      toValue: EXPANDED_WIDTH,
      useNativeDriver: false,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const collapse = () => {
    Animated.spring(widthAnim, {
      toValue: COLLAPSED_WIDTH,
      useNativeDriver: false,
      speed: 20,
      bounciness: 0,
    }).start(() => setExpanded(false));
  };

  return (
    <FocusContext.Provider value={resolvedKey}>
      <Animated.View
        ref={ref as any}
        style={[styles.sidebar, { width: isTV ? widthAnim : EXPANDED_WIDTH }, style]}
      >
        {items.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <Focusable
              key={item.key}
              focusKey={`${focusKey}_ITEM_${item.key}`}
              onSelect={item.onSelect}
              showFocusRing={false} // sidebar items handle their own focus style
            >
              {({ focused }) => (
                <View
                  style={[
                    styles.menuItem,
                    isActive && styles.menuItemActive,
                    focused && styles.menuItemFocused,
                  ]}
                >
                  {item.icon && (
                    <View style={styles.iconWrap}>{item.icon}</View>
                  )}
                  {expanded && (
                    <Text
                      style={[
                        styles.label,
                        isActive && styles.labelActive,
                        focused && styles.labelFocused,
                      ]}
                      numberOfLines={1}
                    >
                      {item.label}
                    </Text>
                  )}
                  {/* Active indicator bar */}
                  {isActive && <View style={styles.activeBar} />}
                </View>
              )}
            </Focusable>
          );
        })}
      </Animated.View>
    </FocusContext.Provider>
  );
};

const COLLAPSED_WIDTH = isTV ? 72 : 0;
const EXPANDED_WIDTH = isTV ? 240 : 260;

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: 'rgba(17,24,39,0.95)',
    paddingVertical: isTV ? SPACING.xl : SPACING.md,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: isTV ? SPACING.lg : SPACING.md,
    paddingHorizontal: isTV ? SPACING.lg : SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: SPACING.sm,
    marginBottom: SPACING.xs,
    position: 'relative',
  },
  menuItemActive: {
    backgroundColor: 'rgba(37,99,235,0.2)',
  },
  menuItemFocused: {
    backgroundColor: 'rgba(250,204,21,0.15)',
    borderWidth: isTV ? FOCUS_RING.width : 0,
    borderColor: FOCUS_RING.color,
  },
  iconWrap: {
    width: ICON_SIZE.md,
    height: ICON_SIZE.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.md,
    color: '#9CA3AF',
    flex: 1,
    fontWeight: '500',
  },
  labelActive: {
    color: '#F9FAFB',
    fontWeight: '700',
  },
  labelFocused: {
    color: FOCUS_RING.color,
  },
  activeBar: {
    position: 'absolute',
    left: 0,
    top: '20%',
    bottom: '20%',
    width: 3,
    borderRadius: 2,
    backgroundColor: '#2563EB',
  },
});
