import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';

/**
 * LAFS visual system — aligned with lafs.tech download landing:
 * deep night background, pink brand glow, soft indigo secondary glow.
 */

/** Accent palette: brand (pink) vs Premium (blue). */
export type AccentPalette = 'brand' | 'premium';

export const TitleFontFamily = 'ProximaNovaBlack';

/** Body UI font — Manrope on all platforms (matches app.lafs.tech). */
export const FontFamily = Platform.select({
  web: 'Manrope, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  default: 'Manrope_400Regular',
}) as string;

export const FontFamilyMedium = Platform.select({
  web: FontFamily,
  default: 'Manrope_500Medium',
}) as string;

export const FontFamilySemiBold = Platform.select({
  web: FontFamily,
  default: 'Manrope_600SemiBold',
}) as string;

export const FontFamilyBold = Platform.select({
  web: FontFamily,
  default: 'Manrope_700Bold',
}) as string;

/** @deprecated use TitleFontFamily for headings; kept for layout font loading */
export const AppFontFamily = TitleFontFamily;

export type ThemeMode = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  backgroundAlt: string;
  surface: string;
  surfaceMuted: string;
  inputFill: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  textOnPrimary: string;
  border: string;
  borderLight: string;
  separator: string;
  success: string;
  danger: string;
  warning: string;
  pinkTint: string;
  purpleTint: string;
  accentTint: string;
  secondaryBtn: string;
  mutedBtn: string;
  dangerTint: string;
  shadow: string;
  overlay: string;
  overlayLight: string;
  glass: string;
  glassBorder: string;
  fillTertiary: string;
  fillQuaternary: string;
  link: string;
  tabInactive: string;
  glowPink: string;
  glowIndigo: string;
};

/** Landing-inspired night theme (default). */
export const DarkColors: ThemeColors = {
  background: '#0B0C10',
  backgroundAlt: '#151821',
  surface: 'rgba(255,255,255,0.06)',
  surfaceMuted: 'rgba(255,255,255,0.09)',
  inputFill: 'rgba(255,255,255,0.08)',
  primary: '#FF4D8D',
  primaryLight: '#FF7AB0',
  primaryDark: '#E11D74',
  secondary: '#FF7AB0',
  secondaryLight: '#FFA3C7',
  secondaryDark: '#FF4D8D',
  text: '#F5F6FA',
  textSecondary: '#A8AEBC',
  textMuted: '#7E8698',
  textOnPrimary: '#FFFFFF',
  border: 'rgba(255, 255, 255, 0.12)',
  borderLight: 'rgba(255, 255, 255, 0.08)',
  separator: 'rgba(255, 255, 255, 0.10)',
  success: '#32D74B',
  danger: '#FF453A',
  warning: '#FF9F0A',
  pinkTint: 'rgba(255, 77, 141, 0.22)',
  purpleTint: 'rgba(88, 101, 242, 0.16)',
  accentTint: 'rgba(255, 77, 141, 0.22)',
  secondaryBtn: 'rgba(255,255,255,0.06)',
  mutedBtn: 'rgba(255,255,255,0.05)',
  dangerTint: 'rgba(255, 69, 58, 0.18)',
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.55)',
  overlayLight: 'rgba(11, 12, 16, 0.94)',
  glass: 'rgba(21, 24, 33, 0.82)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  fillTertiary: 'rgba(255, 255, 255, 0.08)',
  fillQuaternary: 'rgba(255, 255, 255, 0.05)',
  link: '#FF7AB0',
  tabInactive: '#8B93A7',
  glowPink: 'rgba(255, 77, 141, 0.28)',
  glowIndigo: 'rgba(88, 101, 242, 0.18)',
};

/** Daylight brand theme — opaque surfaces, readable contrast. */
export const LightColors: ThemeColors = {
  background: '#F7F8FB',
  backgroundAlt: '#EEF0F5',
  surface: '#FFFFFF',
  surfaceMuted: '#F2F3F7',
  inputFill: '#EBEDF2',
  primary: '#FF4D8D',
  primaryLight: '#FF7AB0',
  primaryDark: '#E11D74',
  secondary: '#FF7AB0',
  secondaryLight: '#FFA3C7',
  secondaryDark: '#FF4D8D',
  text: '#12141A',
  textSecondary: '#5C6578',
  textMuted: '#8A93A6',
  textOnPrimary: '#FFFFFF',
  border: 'rgba(18, 20, 26, 0.12)',
  borderLight: 'rgba(18, 20, 26, 0.08)',
  separator: 'rgba(18, 20, 26, 0.10)',
  success: '#2F9E44',
  danger: '#E03131',
  warning: '#F08C00',
  pinkTint: 'rgba(255, 77, 141, 0.14)',
  purpleTint: 'rgba(88, 101, 242, 0.10)',
  accentTint: 'rgba(255, 77, 141, 0.14)',
  secondaryBtn: 'rgba(255, 77, 141, 0.12)',
  mutedBtn: 'rgba(18, 20, 26, 0.06)',
  dangerTint: 'rgba(224, 49, 49, 0.12)',
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.4)',
  overlayLight: 'rgba(247, 248, 251, 0.94)',
  glass: 'rgba(255, 255, 255, 0.92)',
  glassBorder: 'rgba(18, 20, 26, 0.10)',
  fillTertiary: 'rgba(18, 20, 26, 0.06)',
  fillQuaternary: 'rgba(18, 20, 26, 0.04)',
  link: '#E11D74',
  tabInactive: '#6B7385',
  glowPink: 'rgba(255, 77, 141, 0.14)',
  glowIndigo: 'rgba(88, 101, 242, 0.08)',
};

/** Premium accent — cool blue on top of brand surfaces. */
export const PremiumLightColors: ThemeColors = {
  ...LightColors,
  primary: '#3F8CFF',
  primaryLight: '#5A9EFF',
  primaryDark: '#0062D1',
  secondary: '#5A9EFF',
  secondaryLight: '#7AB0FF',
  secondaryDark: '#3F8CFF',
  pinkTint: 'rgba(63, 140, 255, 0.12)',
  purpleTint: 'rgba(63, 140, 255, 0.08)',
  accentTint: 'rgba(63, 140, 255, 0.12)',
  secondaryBtn: 'rgba(63, 140, 255, 0.12)',
  link: '#3F8CFF',
  glowPink: 'rgba(63, 140, 255, 0.28)',
  glowIndigo: 'rgba(63, 140, 255, 0.12)',
};

export const PremiumDarkColors: ThemeColors = {
  ...DarkColors,
  primary: '#3F8CFF',
  primaryLight: '#5A9EFF',
  primaryDark: '#0077FF',
  secondary: '#5A9EFF',
  secondaryLight: '#7AB0FF',
  secondaryDark: '#3F8CFF',
  pinkTint: 'rgba(63, 140, 255, 0.22)',
  purpleTint: 'rgba(63, 140, 255, 0.14)',
  accentTint: 'rgba(63, 140, 255, 0.22)',
  secondaryBtn: 'rgba(255,255,255,0.06)',
  link: '#5A9EFF',
  glowPink: 'rgba(63, 140, 255, 0.28)',
  glowIndigo: 'rgba(63, 140, 255, 0.14)',
};

/** Default export alias — prefer useTheme().colors for live theme. */
export const Colors = DarkColors;

export function getColors(
  mode: ThemeMode,
  accent: AccentPalette = 'brand',
): ThemeColors {
  if (accent === 'premium') {
    return mode === 'dark' ? PremiumDarkColors : PremiumLightColors;
  }
  return mode === 'dark' ? DarkColors : LightColors;
}

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const FontSize = {
  xs: 13,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 28,
};

export const BorderRadius = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
  xxl: 18,
  continuous: 20,
  full: 999,
};

export function createTypography(colors: ThemeColors) {
  const baseType = {
    fontFamily: FontFamily,
    color: colors.text,
  };

  return {
    largeTitle: {
      ...baseType,
      fontFamily: TitleFontFamily,
      fontSize: FontSize.xxl,
      fontWeight: '400' as TextStyle['fontWeight'],
      letterSpacing: 0.36,
      lineHeight: 34,
    },
    title: {
      ...baseType,
      fontFamily: TitleFontFamily,
      fontSize: FontSize.xl,
      fontWeight: '400' as TextStyle['fontWeight'],
      letterSpacing: 0.2,
      lineHeight: 30,
    },
    headline: {
      ...baseType,
      fontSize: FontSize.md,
      fontWeight: '600' as TextStyle['fontWeight'],
      letterSpacing: -0.3,
      lineHeight: 22,
    },
    body: {
      ...baseType,
      fontSize: FontSize.md,
      fontWeight: '400' as TextStyle['fontWeight'],
      letterSpacing: -0.3,
      lineHeight: 22,
    },
    callout: {
      ...baseType,
      fontSize: FontSize.sm,
      fontWeight: '400' as TextStyle['fontWeight'],
      letterSpacing: -0.2,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    caption: {
      ...baseType,
      fontSize: FontSize.xs,
      fontWeight: '400' as TextStyle['fontWeight'],
      letterSpacing: -0.08,
      color: colors.textSecondary,
      lineHeight: 18,
    },
    label: {
      ...baseType,
      fontSize: FontSize.xs,
      fontWeight: '400' as TextStyle['fontWeight'],
      letterSpacing: -0.08,
      color: colors.textSecondary,
      lineHeight: 18,
    },
    footnote: {
      ...baseType,
      fontSize: 13,
      fontWeight: '400' as TextStyle['fontWeight'],
      letterSpacing: -0.08,
      color: colors.textSecondary,
      lineHeight: 18,
    },
  };
}

export const Typography = createTypography(DarkColors);

/**
 * Soft shadows. On Android, CSS-like `boxShadow` / elevation paints a square
 * bound around rounded views — use hairline borders there instead.
 */
export const Shadow = {
  card: Platform.select<ViewStyle>({
    web: { boxShadow: '0 12px 30px rgba(0, 0, 0, 0.28)' },
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.28,
      shadowRadius: 20,
    },
    default: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'rgba(255, 255, 255, 0.10)',
    },
  }) as ViewStyle,
  soft: Platform.select<ViewStyle>({
    web: { boxShadow: '0 4px 16px rgba(0, 0, 0, 0.18)' },
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.18,
      shadowRadius: 10,
    },
    default: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'rgba(255, 255, 255, 0.08)',
    },
  }) as ViewStyle,
  tabBar: Platform.select<ViewStyle>({
    web: { boxShadow: '0 -1px 0 rgba(18, 20, 26, 0.08)' },
    default: {},
  }) as ViewStyle,
};

/** Primary button glow — follows brand or Premium accent (not hardcoded pink). */
export function glowShadow(colors: ThemeColors): ViewStyle {
  return (
    Platform.select<ViewStyle>({
      web: { boxShadow: `0 12px 30px ${colors.glowPink}` },
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
      },
      default: {},
    }) ?? {}
  );
}
