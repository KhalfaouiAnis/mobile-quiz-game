import React from 'react';
import { View, StyleSheet, ViewStyle, ImageStyle, ImageResizeMode } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { CARD, BORDER_RADIUS, FOCUS_RING } from '@/src/utils/dimensions';
import { isTV } from '@/src/utils/platform';

type TVImagePreset = 'card' | 'wideCard' | 'square' | 'hero' | 'avatar' | 'custom';

interface TVImageProps {
  uri: string;
  preset?: TVImagePreset;
  /** Only used when preset='custom' */
  width?: number;
  height?: number;
  focused?: boolean;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  resizeMode?: ImageResizeMode;
  /** Blur hash placeholder while loading (expo-image) */
  blurhash?: string;
  borderRadius?: number;
}

/**
 * Preset dimensions indexed by TV and mobile variants.
 * Always use presets instead of hard-coding numbers in screens.
 */
const PRESET_DIMS: Record<
  TVImagePreset,
  { width: number | string; height: number | string } | null
> = {
  card: { width: CARD.width, height: CARD.height },
  wideCard: { width: CARD.wideWidth, height: CARD.wideHeight },
  square: { width: CARD.squareSize, height: CARD.squareSize },
  hero: { width: '100%', height: isTV ? 520 : 220 },
  avatar: { width: isTV ? 80 : 48, height: isTV ? 80 : 48 },
  custom: null,
};

/**
 * TVImage
 *
 * A wrapper around expo-image that:
 *   - Uses consistent preset dimensions for TV vs mobile
 *   - Shows an optional focus highlight ring
 *   - Provides blurhash placeholders for smooth loading
 *
 * Usage:
 *   <TVImage uri={game.thumbnailUrl} preset="wideCard" focused={focused} />
 */
export const TVImage: React.FC<TVImageProps> = ({
  uri,
  preset = 'card',
  width,
  height,
  focused = false,
  style,
  imageStyle,
  resizeMode = 'cover',
  blurhash,
  borderRadius,
}) => {
  const dims = PRESET_DIMS[preset];
  const resolvedWidth = preset === 'custom' ? width : dims?.width;
  const resolvedHeight = preset === 'custom' ? height : dims?.height;
  const resolvedRadius = borderRadius ?? BORDER_RADIUS.md;

  return (
    <View
      style={[
        styles.container,
        {
          width: resolvedWidth as number,
          height: resolvedHeight as number,
          borderRadius: resolvedRadius,
        },
        focused && styles.focusedContainer,
        style,
      ]}
    >
      <ExpoImage
        source={{ uri }}
        style={[
          StyleSheet.absoluteFill,
          { borderRadius: resolvedRadius },
          imageStyle,
        ]}
        contentFit={resizeMode}
        placeholder={blurhash ? { blurhash } : undefined}
        transition={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#1F2937',
  },
  focusedContainer: {
    borderWidth: FOCUS_RING.width,
    borderColor: FOCUS_RING.color,
    shadowColor: FOCUS_RING.color,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: FOCUS_RING.shadowRadius,
    shadowOpacity: FOCUS_RING.shadowOpacity,
    elevation: 10,
  },
});
