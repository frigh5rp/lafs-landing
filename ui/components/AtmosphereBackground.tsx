import { useMemo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../ThemeContext';

/**
 * Brand atmosphere on web (CSS radials).
 * Native app: flat solid background — no gradient orbs.
 */
export function AtmosphereBackground() {
  const { colors, isDark } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          ...StyleSheet.absoluteFillObject,
          overflow: 'hidden',
          backgroundColor: colors.background,
          ...(Platform.OS === 'web'
            ? ({
                backgroundImage: isDark
                  ? `radial-gradient(1200px 600px at 10% -10%, ${colors.glowPink}, transparent 55%), radial-gradient(900px 500px at 100% 0%, ${colors.glowIndigo}, transparent 50%), linear-gradient(160deg, ${colors.background}, ${colors.backgroundAlt})`
                  : `radial-gradient(900px 480px at 8% -8%, ${colors.glowPink}, transparent 58%), radial-gradient(700px 400px at 100% 0%, ${colors.glowIndigo}, transparent 55%), linear-gradient(180deg, ${colors.background}, ${colors.backgroundAlt})`,
              } as object)
            : null),
        },
      }),
    [colors, isDark],
  );

  return <View pointerEvents="none" style={styles.root} />;
}
