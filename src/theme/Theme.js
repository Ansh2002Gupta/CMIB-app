import icons from "../images";
import lightColors from "../assets/colors";
import darkColors from "../assets/darkColors";

const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
  xxl: 1800,
};

export const fonts = {
  TITLE: {
    fontSize: 17,
    fontFamily: "Inter-Bold",
  },
  HEADING1: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    lineHeight: 20,
  },
  HEADING2: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    lineHeight: 20,
  },
  SECTION_HEADING1: {
    fontSize: 17,
    fontFamily: "Inter-Regular",
  },
  SECTION_HEADING2: {
    fontSize: 15,
    fontFamily: "Inter-Medium",
  },
  BODY1: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    lineHeight: 18,
  },
  BODY2: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    lineHeight: 18,
  },
  BODY3: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    lineHeight: 20,
  },
  ACTION: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    lineHeight: 18,
  },
  SIDE_NAVIGATION: {
    fontSize: 13,
    fontFamily: "Inter-Medium",
    lineHeight: 18,
  },
  CAPTION: {
    fontSize: 13,
    fontFamily: "Inter-Italic",
    lineHeight: 16,
  },
  CAPTION_LARGE: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    lineHeight: 16,
  },
  CAPTION_SMALL: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    lineHeight: 16,
  },
  FOOTNOTE: {
    fontSize: 10,
    fontFamily: "Inter-Medium",
    lineHeight: 10,
  },
  FOOTNOTE_SMALL: {
    fontSize: 10,
    fontFamily: "Inter-Medium",
    lineHeight: 12,
  },
};

const radius = {
  "2xs": 1,
  xs: 2,
  sm: 3,
  md: 4,
  lg: 6,
  xl: 8,
  "2xl": 12,
  "3xl": 16,
  "4xl": 20,
  "5xl": 24,
};

const spacing = {
  "2xs": 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  "2xl": 16,
  "3xl": 20,
  "4xl": 24,
  "5xl": 30,
  "6xl": 32,
  "7xl": 36,
};

export default {
  breakpoints,
  lightColors,
  darkColors,
  icons,
  fonts,
  radius,
  spacing,
};
