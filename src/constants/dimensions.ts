import { Dimensions } from "react-native";
import { isTV } from "../utils/platform";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/**
 * TV screens are physically large but the app renders at a logical resolution
 * (typically 1280×720 or 1920×1080). We scale everything up relative to a
 * 375-wide mobile baseline so that a font or dimension that looks right on
 * a phone is automatically enlarged for the 10-foot viewing distance on a TV.
 *
 * TV_SCALE: multiplier applied on top of the mobile base.
 * Use `tvScale(n)` for any value you'd normally hard-code.
 */

const MOBILE_BASE_WIDTH = 375;
const TV_BASE_WIDTH = 1280; // typical TV logical width

// On TV: scale relative to 1280-wide canvas; on mobile: scale relative to 375
const BASE_WIDTH = isTV ? TV_BASE_WIDTH : MOBILE_BASE_WIDTH;

/** Scale a dimension proportionally to the current screen width. */
export const scale = (size: number): number =>
  Math.round((SCREEN_WIDTH / BASE_WIDTH) * size);

/** Scale specifically for font sizes — slightly gentler to avoid oversized text. */
export const fontScale = (size: number): number => {
  const ratio = SCREEN_WIDTH / BASE_WIDTH;
  // Flatten scaling curve a bit: sqrt-blend between linear and 1
  const adjusted = Math.sqrt(ratio) * ratio ** 0.25;
  return Math.round(size * adjusted);
};

/**
 * TV-specific multiplier for anything that needs a harder bump on TV
 * without affecting mobile at all (e.g. focus ring thickness, icon sizes).
 */
export const tvScale = (size: number, tvMultiplier = 1.6): number =>
  isTV ? scale(size * tvMultiplier) : scale(size);

// ─── Shared design tokens ────────────────────────────────────────────────────

export const SPACING = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
  xxl: scale(48),
} as const;

export const FONT_SIZE = {
  xs: fontScale(isTV ? 18 : 11),
  sm: fontScale(isTV ? 22 : 13),
  md: fontScale(isTV ? 28 : 16),
  lg: fontScale(isTV ? 36 : 20),
  xl: fontScale(isTV ? 46 : 26),
  xxl: fontScale(isTV ? 60 : 34),
  display: fontScale(isTV ? 80 : 44),
} as const;

export const BORDER_RADIUS = {
  sm: scale(isTV ? 8 : 4),
  md: scale(isTV ? 14 : 8),
  lg: scale(isTV ? 20 : 12),
  full: 9999,
} as const;

export const ICON_SIZE = {
  sm: tvScale(16),
  md: tvScale(24),
  lg: tvScale(36),
  xl: tvScale(48),
} as const;

/**
 * Card / thumbnail dimensions.
 * Use these for consistent image / card sizing across the app.
 */
export const CARD = {
  // Standard content card (e.g. game tile)
  width: isTV ? scale(280) : scale(160),
  height: isTV ? scale(180) : scale(100),
  // Wide card (16:9 thumbnail)
  wideWidth: isTV ? scale(380) : scale(200),
  wideHeight: isTV ? scale(214) : scale(112),
  // Square avatar / icon card
  squareSize: isTV ? scale(160) : scale(90),
  // Gap between cards in a horizontal row
  gap: isTV ? scale(24) : scale(12),
} as const;

/** Focus ring style — always call this instead of hard-coding border widths. */
export const FOCUS_RING = {
  width: isTV ? 4 : 2,
  color: "#FACC15", // golden yellow — highly visible on dark TV UIs
  shadowRadius: isTV ? 12 : 4,
  shadowOpacity: isTV ? 0.9 : 0.5,
} as const;

export const SCREEN = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  // Safe area padding for TV overscan (TVs can clip edges — 5% is standard)
  overscanH: isTV ? Math.round(SCREEN_WIDTH * 0.05) : 0,
  overscanV: isTV ? Math.round(SCREEN_HEIGHT * 0.05) : 0,
} as const;
