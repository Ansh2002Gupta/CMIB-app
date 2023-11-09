import icons from '../images';

const breakpoints = {
  md: 768,
};

const lightColors = {
  MODAL_BACKGROUND: 'rgba(0,0,0,0.2)',

  BACKGROUND: '#FFFFFF',
  SURFACE1: '#FCFCFD',
  SURFACE2: '#F8F8FB',
  SURFACE3: '#F6F6F6',
  OUTLINE: '#EBEBEF',

  NEUTRAL_HIGH: '#2C2E36',
  NEUTRAL_MEDIUM: '#666D73',
  NEUTRAL_LOW: '#A4A4B2',

  PRIMARY_HIGH: '#7459DB',
  PRIMARY_MEDIUM: '#EBE7FE',
  PRIMARY_LOW: '#F5F2FD',

  ERROR_HIGH: '#DB4E4E',
  ERROR_MEDIUM: '#FFE6E6',
  ERROR_LOW: '#FEEBEB',

  WARNING_HIGH: '#ECA059',

  SUCCESS_HIGH: '#67B742',
  SUCCESS_MEDIUM: '#E2EFDC',
  SUCCESS_LOW: '#EFF7EE',

  BRAND_MEDIUM: '#82CE32',

  ACCENT1_HIGH: '#5271E0',
  ACCENT1_MEDIUM: '#E3E8FC',
  ACCENT1_LOW: '#F1F4FE',

  ACCENT2_HIGH: '#E54FA9',
  ACCENT2_MEDIUM: '#FFE0EA',
  ACCENT2_LOW: '#FFF0F6',

  ACCENT3_HIGH: '#31B082',
  ACCENT3_MEDIUM: '#D4F2E7',
  ACCENT3_LOW: '#E8F7F2',

  ACCENT4_HIGH: '#EC8559',
  ACCENT4_MEDIUM: '#FCE9DA',
  ACCENT4_LOW: '#FDF2E9',

  ACCENT5_HIGH: '#FFB800',
  ACCENT5_MEDIUM: '#FFF7D6',
  ACCENT5_LOW: '#FFFAE5',
};

const darkColors = {
  MODAL_BACKGROUND: 'rgba(0,0,0,0.8)',

  BACKGROUND: '#dbdbdb',
  SURFACE1: '#1E1E1F',
  SURFACE2: '#232324',
  OUTLINE: '#323234',

  NEUTRAL_HIGH: '#E4E4E7',
  NEUTRAL_MEDIUM: '#999AA3',
  NEUTRAL_LOW: '#6F707B',

  PRIMARY_HIGH: '#8464FC',
  PRIMARY_MEDIUM: '#292942',
  PRIMARY_LOW: '#1F1F33',

  ERROR_HIGH: '#E25970',
  ERROR_MEDIUM: '#402626',
  ERROR_LOW: '#332021',

  SUCCESS_HIGH: '#8AC270',
  SUCCESS_MEDIUM: '#2F3F27',
  SUCCESS_LOW: '#25331F',

  ACCENT1_HIGH: '#6D89E9',
  ACCENT1_MEDIUM: '#272B3F',
  ACCENT1_LOW: '#1F2333',

  ACCENT2_HIGH: '#DF73A0',
  ACCENT2_MEDIUM: '#3B2B32',
  ACCENT2_LOW: '#381926',

  ACCENT3_HIGH: '#4BB894',
  ACCENT3_MEDIUM: '#2D433B',
  ACCENT3_LOW: '#152D25',

  ACCENT4_HIGH: '#EC8E59',
  ACCENT4_MEDIUM: '#3F2F27',
  ACCENT4_LOW: '#32241F',

  ACCENT5_HIGH: '#F0BD6A',
  ACCENT5_MEDIUM: '#3F3527',
  ACCENT5_LOW: '#332A1F',
};

export const fonts = {
  TITLE: {
    fontSize: 17,
    fontFamily: 'Inter-Bold',
  },
  HEADING1: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 20,
  },
  HEADING2: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 20,
  },
  SECTION_HEADING1: {
    fontSize: 17,
    fontFamily: 'Inter-Regular',
  },
  SECTION_HEADING2: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
  },
  BODY1: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 18,
  },
  BODY2: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    lineHeight: 18,
  },
  BODY3: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  ACTION: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    lineHeight: 18,
  },
  SIDE_NAVIGATION: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    lineHeight: 18,
  },
  CAPTION: {
    fontSize: 13,
    fontFamily: 'Inter-Italic',
    lineHeight: 16,
  },
  CAPTION_LARGE: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    lineHeight: 16,
  },
  CAPTION_SMALL: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    lineHeight: 16,
  },
  FOOTNOTE: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    lineHeight: 10,
  },
  FOOTNOTE_SMALL: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    lineHeight: 12,
  },
};

const radius = {
  '2xs': 1,
  xs: 2,
  sm: 3,
  md: 4,
  lg: 6,
  xl: 8,
  '2xl': 12,
  '3xl': 16,
  '4xl': 20,
  '5xl': 24,
};

const spacing = {
  '2xs': 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  '2xl': 16,
  '3xl': 20,
  '4xl': 24,
  '5xl': 30,
  '6xl': 32,
  '7xl': 36,
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
