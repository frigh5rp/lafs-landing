import { useMemo } from 'react';
import { View, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing } from '../theme';
import { useTheme } from '../ThemeContext';
import { useResponsive } from '../hooks/useResponsive';
import { FadeIn } from './motion';
import { AtmosphereBackground } from './AtmosphereBackground';

interface ScreenContainerProps {
  children: React.ReactNode;
  scroll?: boolean;
  center?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  /** Soft entrance animation when the screen mounts (default on). */
  animate?: boolean;
  /** Landing-like atmospheric background (default on). */
  atmosphere?: boolean;
}

export function ScreenContainer({
  children,
  scroll = false,
  center = true,
  style,
  contentStyle,
  animate = true,
  atmosphere = true,
}: ScreenContainerProps) {
  const { colors } = useTheme();
  const { contentMaxWidth, horizontalPadding } = useResponsive();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        safe: {
          flex: 1,
          backgroundColor: colors.background,
        },
        scrollContent: {
          flexGrow: 1,
          paddingBottom: 120,
        },
        inner: {
          width: '100%',
          flex: 1,
          alignSelf: 'center',
          paddingTop: Spacing.sm,
        },
        centered: {
          alignItems: 'stretch',
        },
      }),
    [colors],
  );

  const inner = (
    <View
      style={[
        styles.inner,
        center && styles.centered,
        { maxWidth: contentMaxWidth, paddingHorizontal: horizontalPadding },
        contentStyle,
      ]}
    >
      {animate ? (
        <FadeIn
          fromY={14}
          fromScale={0.985}
          duration={380}
          style={scroll ? { width: '100%' } : { flex: 1, width: '100%' }}
        >
          {children}
        </FadeIn>
      ) : (
        children
      )}
    </View>
  );

  const body = scroll ? (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {inner}
    </ScrollView>
  ) : (
    inner
  );

  return (
    <SafeAreaView style={[styles.safe, style]} edges={['top', 'left', 'right']}>
      {atmosphere ? <AtmosphereBackground /> : null}
      {body}
    </SafeAreaView>
  );
}
