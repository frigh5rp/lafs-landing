import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Typography, FontFamily } from '../theme';

interface StatBoxProps {
  label: string;
  value: string;
  variant: 'pink' | 'purple';
}

export function StatBox({ label, value, variant }: StatBoxProps) {
  return (
    <View style={[styles.box, variant === 'pink' ? styles.pink : styles.accent]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
    backgroundColor: Colors.surface,
  },
  pink: {
    backgroundColor: Colors.surface,
  },
  accent: {
    backgroundColor: Colors.surface,
  },
  value: {
    fontFamily: FontFamily,
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
    letterSpacing: 0.38,
  },
  label: {
    ...Typography.caption,
    textAlign: 'center',
  },
});
