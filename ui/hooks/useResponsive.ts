import { useWindowDimensions, Platform } from 'react-native';
import { Spacing } from '../theme';

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isTablet = width >= 600;
  const isDesktop = width >= 900;
  const isLandscape = width > height;
  const contentMaxWidth = isDesktop ? 480 : isTablet ? 420 : width;
  const horizontalPadding = isDesktop ? Spacing.xl : Spacing.lg;
  const cardHeight = isDesktop
    ? Math.min(height * 0.52, 460)
    : isLandscape
      ? Math.min(height * 0.48, 320)
      : Math.min(height * 0.48, 420);
  const searchCardHeight = isDesktop
    ? Math.min(height * 0.58, 520)
    : isLandscape
      ? Math.min(height * 0.55, 400)
      : Math.min(height * 0.52, 460);

  return {
    width,
    height,
    isWeb,
    isTablet,
    isDesktop,
    isLandscape,
    contentMaxWidth,
    horizontalPadding,
    cardHeight,
    searchCardHeight,
  };
}
