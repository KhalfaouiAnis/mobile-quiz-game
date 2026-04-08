import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

/**
 * iPhone 14 Plus Landscape Logical Resolution:
 * Width: 926, Height: 428
 */
const guidelineBaseWidth = 926;
const guidelineBaseHeight = 428;

// Scale based on Width (use for horizontal dimensions like widths, margins, padding)
const scale = (size: number) => (width / guidelineBaseWidth) * size;

// Scale based on Height (use for vertical dimensions like heights, top/bottom padding)
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

// Moderate scale (useful for fonts so they don't get TOO huge on tablets)
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
