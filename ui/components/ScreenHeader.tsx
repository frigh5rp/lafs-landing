import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Spacing, FontFamily, FontSize } from '../theme';
import { useTheme } from '../ThemeContext';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  large?: boolean;
}

export function ScreenHeader({ title, subtitle, centered, large }: ScreenHeaderProps) {
  const { colors, typography } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: Spacing.lg,
          paddingTop: Spacing.xs,
        },
        centered: {
          alignItems: 'center',
        },
        title: {
          ...typography.title,
        },
        titleLarge: {
          ...typography.largeTitle,
        },
        subtitle: {
          fontFamily: FontFamily,
          color: colors.textSecondary,
          fontSize: FontSize.sm,
          marginTop: 4,
          fontWeight: '400',
          lineHeight: 20,
          letterSpacing: -0.24,
        },
      }),
    [colors, typography],
  );

  return (
    <View style={[styles.container, centered && styles.centered]}>
      <Text style={[styles.title, large && styles.titleLarge]}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}
