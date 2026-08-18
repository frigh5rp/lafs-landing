import { useMemo } from 'react';
import { View, StyleSheet, ImageSourcePropType, ViewStyle, Image } from 'react-native';
import { BorderRadius } from '../theme';
import { useTheme } from '../ThemeContext';
import { RemoteImage } from './RemoteImage';

interface FrostedPhotoProps {
  source: ImageSourcePropType | { uri: string };
  height?: number;
  borderRadius?: number;
  /** @deprecated Kept for call sites; overlays handle frost now — image stays fully opaque. */
  opacity?: number;
  frosted?: boolean;
  style?: ViewStyle;
  fill?: boolean;
}

function sourceUri(source: ImageSourcePropType | { uri: string }): string | null {
  if (source && typeof source === 'object' && 'uri' in source && typeof source.uri === 'string') {
    return source.uri;
  }
  return null;
}

export function FrostedPhoto({
  source,
  height = 380,
  borderRadius = BorderRadius.xl,
  frosted = true,
  style,
  fill = false,
}: FrostedPhotoProps) {
  const { colors, isDark } = useTheme();
  const uri = sourceUri(source);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          width: '100%',
          overflow: 'hidden',
          backgroundColor: colors.backgroundAlt,
          position: 'relative',
        },
        fill: {
          flex: 1,
          minHeight: 220,
          height: undefined,
        },
        image: {
          ...StyleSheet.absoluteFillObject,
          width: '100%',
          height: '100%',
        },
        tint: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: isDark ? 'rgba(14, 14, 16, 0.32)' : 'rgba(255, 240, 245, 0.28)',
        },
        fadeTop: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: isDark ? 'rgba(14, 14, 16, 0.12)' : 'rgba(250, 250, 250, 0.1)',
        },
      }),
    [colors, isDark],
  );

  return (
    <View
      style={[
        styles.wrap,
        fill ? styles.fill : { height },
        { borderRadius },
        style,
      ]}
    >
      {uri ? (
        <RemoteImage uri={uri} style={styles.image} resizeMode="cover" />
      ) : (
        <Image source={source} style={styles.image} resizeMode="cover" />
      )}
      {frosted ? (
        <>
          <View style={[styles.tint, { borderRadius }]} pointerEvents="none" />
          <View style={[styles.fadeTop, { borderRadius }]} pointerEvents="none" />
        </>
      ) : null}
    </View>
  );
}
