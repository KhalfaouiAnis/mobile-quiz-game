import React, { useRef } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';
import {
  useFocusable,
  FocusContext,
} from '@noriginmedia/norigin-spatial-navigation';
import { isTV } from '@/core/utils/platform';
import { CARD, SPACING } from '@/core/constants/dimensions';

interface FocusableRowProps {
  focusKey: string;
  children: React.ReactNode;
  /** 'horizontal' (default) or 'vertical' */
  direction?: 'horizontal' | 'vertical';
  /**
   * On TV, when the focused child changes, automatically scroll to keep it
   * visible. The parent must pass a ref-based scroll handler.
   */
  onScrollToChild?: (x: number, y: number) => void;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollViewProps?: Partial<ScrollViewProps>;
  /** Called when focus enters this container */
  onFocusEnter?: () => void;
}

/**
 * FocusableRow / FocusableList
 *
 * A scrollable container that participates in the spatial navigation tree.
 * Children placed inside automatically become siblings in the nav graph.
 *
 * On TV the scroll position follows the focused child automatically.
 * On mobile it's a standard ScrollView.
 *
 * Usage:
 *   <FocusableRow focusKey="GAMES_ROW">
 *     {games.map(g => (
 *       <Focusable key={g.id} focusKey={`GAME_${g.id}`} onSelect={...}>
 *         {({ focused }) => <GameCard game={g} focused={focused} />}
 *       </Focusable>
 *     ))}
 *   </FocusableRow>
 */
export const FocusableRow: React.FC<FocusableRowProps> = ({
  focusKey,
  children,
  direction = 'horizontal',
  style,
  contentContainerStyle,
  scrollViewProps,
  onFocusEnter,
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const isHorizontal = direction === 'horizontal';

  const { ref, focusKey: resolvedKey } = useFocusable({
    focusKey,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    onFocus: onFocusEnter,
    // When a child gets focused, scroll it into view on TV
    onChildFocused: isTV
      ? (layout: { x: number; y: number; width: number; height: number }) => {
        if (!scrollRef.current) return;
        if (isHorizontal) {
          // Scroll so the focused card is centred (roughly)
          const offset = Math.max(
            0,
            layout.x - CARD.width / 2,
          );
          scrollRef.current.scrollTo({ x: offset, animated: true });
        } else {
          const offset = Math.max(0, layout.y - CARD.height / 2);
          scrollRef.current.scrollTo({ y: offset, animated: true });
        }
      }
      : undefined,
  } as any);

  return (
    <FocusContext.Provider value={resolvedKey}>
      <ScrollView
        ref={scrollRef}
        horizontal={isHorizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isTV} // On TV we control scroll programmatically
        style={[styles.scroll, style]}
        contentContainerStyle={[
          isHorizontal ? styles.hContent : styles.vContent,
          contentContainerStyle,
        ]}
        {...scrollViewProps}
      >
        <View
          ref={ref as any}
          style={isHorizontal ? styles.hInner : styles.vInner}
        >
          {children}
        </View>
      </ScrollView>
    </FocusContext.Provider>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  hContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vContent: {
    flexDirection: 'column',
  },
  hInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CARD.gap,
    paddingHorizontal: isTV ? SPACING.xl : SPACING.md,
  },
  vInner: {
    flexDirection: 'column',
    gap: CARD.gap,
    paddingVertical: SPACING.md,
  },
});
