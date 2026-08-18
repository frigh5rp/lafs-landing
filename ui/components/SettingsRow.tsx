import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius, FontFamily } from '../theme';
import { PressableScale } from './motion';

interface SettingsRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
  showSeparator?: boolean;
}

/** Thin wrapper kept for existing screens — delegates to VKUI Cell look */
export function SettingsRow({
  icon,
  label,
  value,
  onPress,
  danger,
  showSeparator = false,
}: SettingsRowProps) {
  const row = (
    <>
      <View style={[styles.iconWrap, danger && styles.iconDanger]}>
        <Ionicons name={icon} size={18} color={danger ? '#fff' : Colors.primary} />
      </View>
      <Text style={[styles.label, danger && styles.labelDanger]}>{label}</Text>
      {value ? <Text style={styles.value}>{value}</Text> : null}
      {onPress ? (
        <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
      ) : null}
      {showSeparator ? <View style={styles.sep} /> : null}
    </>
  );

  if (!onPress) {
    return <View style={styles.row}>{row}</View>;
  }

  return (
    <PressableScale
      onPress={onPress}
      pressedScale={0.985}
      contentStyle={styles.row}
    >
      {row}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: Spacing.lg,
    gap: 12,
    minHeight: 48,
    backgroundColor: Colors.surface,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.pinkTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDanger: {
    backgroundColor: Colors.danger,
  },
  label: {
    flex: 1,
    fontFamily: FontFamily,
    fontSize: FontSize.md,
    fontWeight: '400',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  labelDanger: {
    color: Colors.danger,
  },
  value: {
    fontFamily: FontFamily,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginRight: 2,
  },
  sep: {
    position: 'absolute',
    left: 56,
    right: 0,
    bottom: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separator,
  },
});
