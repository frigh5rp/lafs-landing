import { useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Spacing, FontSize, BorderRadius, FontFamily } from '../theme';
import { useTheme } from '../ThemeContext';

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  status?: 'default' | 'error';
}

export function TextField({ label, error, status = 'default', style, ...props }: TextFieldProps) {
  const { colors, typography } = useTheme();
  const hasError = status === 'error' || !!error;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          marginBottom: Spacing.md,
        },
        label: {
          ...typography.footnote,
          marginBottom: Spacing.sm,
        },
        input: {
          fontFamily: FontFamily,
          backgroundColor: colors.inputFill,
          borderRadius: BorderRadius.md,
          paddingHorizontal: Spacing.lg,
          paddingVertical: 12,
          fontSize: FontSize.md,
          color: colors.text,
          minHeight: 44,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: 'transparent',
          letterSpacing: -0.3,
        },
        inputError: {
          backgroundColor: colors.dangerTint,
          borderColor: colors.danger,
        },
        error: {
          fontFamily: FontFamily,
          color: colors.danger,
          fontSize: FontSize.xs,
          marginTop: 6,
        },
      }),
    [colors, typography],
  );

  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[styles.input, hasError && styles.inputError, style]}
        placeholderTextColor={colors.textMuted}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}
