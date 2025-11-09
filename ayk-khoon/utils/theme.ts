export const COLORS = {
  primary: '#E63946',
  secondary: '#457B9D',
  success: '#2A9D8F',
  error: '#D62828',
  background: '#FFFFFF',
  cardBackground: '#F1F1F1',
  text: '#1D3557',
  textLight: '#6C757D',
  white: '#FFFFFF',
  black: '#000000',
  grayLight: '#F8F9FA',
  grayMedium: '#DEE2E6',
  grayDark: '#6C757D',
  green: '#2A9D8F',
  red: '#E63946',
  blue: '#457B9D',
  yellow: '#F4A261',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FONT_WEIGHTS = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const ICON_SIZES = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};
