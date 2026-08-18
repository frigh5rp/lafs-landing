import { useMemo } from 'react';
import { View, StyleSheet, ViewStyle, Platform, StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import { BorderRadius, Shadow } from '../theme';
import { useTheme } from '../ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'flat' | 'glass' | 'grouped';
  /** Keep glass/blur dark even in light app theme (call screens). */
  forceDark?: boolean;
}

export function Card({ children, style, variant = 'default', forceDark = false }: CardProps) {
  const { colors, isDark } = useTheme();
  const darkGlass = forceDark || isDark;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          width: '100%',
          alignSelf: 'stretch',
          backgroundColor: colors.surface,
          borderRadius: BorderRadius.xl,
          overflow: 'hidden',
          ...Shadow.card,
        },
        flat: {
          borderWidth: 0,
          borderRadius: BorderRadius.xl,
          ...Shadow.soft,
        },
        glass: {
          backgroundColor:
            Platform.OS === 'web'
              ? darkGlass
                ? 'rgba(21, 24, 33, 0.82)'
                : colors.glass
              : 'transparent',
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: darkGlass ? 'rgba(255,255,255,0.12)' : colors.glassBorder,
          ...(Platform.OS === 'web'
            ? ({
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              } as object)
            : {}),
        },
        glassFill: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: darkGlass ? 'rgba(21, 24, 33, 0.82)' : colors.glass,
        },
        grouped: {
          borderRadius: BorderRadius.xl,
          backgroundColor: colors.surface,
          ...Shadow.soft,
        },
        content: {
          zIndex: 1,
          width: '100%',
          alignSelf: 'stretch',
        },
      }),
    [colors, darkGlass],
  );

  if (variant === 'glass' && Platform.OS !== 'web') {
    return (
      <View style={[styles.card, styles.glass]}>
        <BlurView intensity={48} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={styles.glassFill} pointerEvents="none" />
        {/* Layout styles must live on content — outer only holds blur chrome. */}
        <View style={[styles.content, style]}>{children}</View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.card,
        variant === 'flat' && styles.flat,
        variant === 'glass' && styles.glass,
        variant === 'grouped' && styles.grouped,
        style,
      ]}
    >
      {children}
    </View>
  );
}
