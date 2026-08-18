import { useMemo } from 'react';
import { Text, StyleSheet, ViewStyle } from 'react-native';
import { Spacing, FontSize, BorderRadius, FontFamily } from '../theme';
import { useTheme } from '../ThemeContext';
import { PressableScale } from './motion';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  variant?: 'pink' | 'purple';
}

/** Selection chip — VKUI muted / primary selected */
export function Chip({ label, selected, onPress, style }: ChipProps) {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        chip: {
          paddingVertical: 9,
          paddingHorizontal: Spacing.lg,
          borderRadius: BorderRadius.md,
          backgroundColor: colors.mutedBtn,
        },
        selected: {
          backgroundColor: colors.primary,
        },
        label: {
          fontFamily: FontFamily,
          color: colors.primary,
          fontSize: FontSize.sm,
          fontWeight: '600',
          letterSpacing: -0.2,
        },
        selectedLabel: {
          color: colors.textOnPrimary,
        },
      }),
    [colors],
  );

  return (
    <PressableScale
      onPress={onPress}
      pressedScale={0.95}
      style={style}
      contentStyle={[styles.chip, selected && styles.selected]}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </PressableScale>
  );
}
