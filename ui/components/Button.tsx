import { useMemo } from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Spacing, BorderRadius, FontFamilySemiBold, glowShadow, type ThemeColors } from '../theme';
import { useTheme } from '../ThemeContext';
import { PressableScale } from './motion';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'tertiary'
  | 'outline'
  | 'danger'
  | 'commerce'
  | 'purple'
  | 'ghost';

type ButtonSize = 's' | 'm' | 'l';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  icon?: keyof typeof Ionicons.glyphMap;
  stretched?: boolean;
}

const SIZE = {
  s: { minHeight: 30, padV: 6, padH: 12, font: 14, icon: 16, radius: BorderRadius.xl },
  m: { minHeight: 40, padV: 10, padH: 16, font: 15, icon: 18, radius: BorderRadius.xl },
  l: { minHeight: 52, padV: 14, padH: 22, font: 16, icon: 20, radius: BorderRadius.xl },
} as const;

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'l',
  disabled,
  loading,
  style,
  icon,
  stretched = true,
}: ButtonProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createButtonStyles(colors), [colors]);
  const s = SIZE[size];
  const mappedVariant = variant === 'purple' || variant === 'ghost' ? mapLegacy(variant) : variant;
  const textColor = textColorFor(mappedVariant, colors);
  const inactive = disabled || loading;
  const isPrimaryLook = mappedVariant === 'primary';

  const inner = loading ? (
    <ActivityIndicator color={textColor} />
  ) : (
    <View style={styles.content}>
      {icon ? <Ionicons name={icon} size={s.icon} color={textColor} /> : null}
      <Text style={[styles.text, { color: textColor, fontSize: s.font }]}>{title}</Text>
    </View>
  );

  return (
    <PressableScale
      onPress={onPress}
      disabled={inactive}
      pressedScale={0.96}
      style={[
        {
          alignSelf: stretched ? 'stretch' : 'flex-start',
          width: stretched ? '100%' : undefined,
          // Shadow host must share radius — otherwise web paints a square boxShadow.
          borderRadius: s.radius,
        },
        isPrimaryLook ? glowShadow(colors) : null,
        style,
      ]}
      contentStyle={[
        styles.base,
        {
          minHeight: s.minHeight,
          paddingVertical: s.padV,
          paddingHorizontal: s.padH,
          borderRadius: s.radius,
          overflow: 'hidden',
        },
        !isPrimaryLook && styles[mappedVariant],
        inactive && styles.disabled,
      ]}
    >
      {isPrimaryLook ? (
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            StyleSheet.absoluteFillObject,
            { borderRadius: s.radius },
          ]}
        />
      ) : null}
      {inner}
    </PressableScale>
  );
}

function mapLegacy(v: 'purple' | 'ghost'): ButtonVariant {
  return v === 'ghost' ? 'tertiary' : 'primary';
}

function textColorFor(variant: ButtonVariant, colors: ThemeColors): string {
  switch (variant) {
    case 'primary':
    case 'commerce':
    case 'danger':
      return colors.textOnPrimary;
    case 'secondary':
    case 'outline':
    case 'tertiary':
      return colors.primary;
    case 'muted':
      return colors.text;
    default:
      return colors.textOnPrimary;
  }
}

function createButtonStyles(colors: ThemeColors) {
  return StyleSheet.create({
    base: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      zIndex: 1,
    },
    primary: {
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.xl,
    },
    secondary: {
      backgroundColor: colors.secondaryBtn,
      borderWidth: StyleSheet.hairlineWidth * 2,
      borderColor: colors.border,
      borderRadius: BorderRadius.xl,
    },
    muted: {
      backgroundColor: colors.mutedBtn,
      borderRadius: BorderRadius.xl,
    },
    tertiary: {
      backgroundColor: 'transparent',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: StyleSheet.hairlineWidth * 2,
      borderColor: colors.primary,
      borderRadius: BorderRadius.xl,
    },
    commerce: {
      backgroundColor: colors.success,
      borderRadius: BorderRadius.xl,
    },
    danger: {
      backgroundColor: colors.danger,
      borderRadius: BorderRadius.xl,
    },
    purple: {
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.xl,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    disabled: {
      opacity: 0.4,
    },
    text: {
      fontFamily: FontFamilySemiBold,
      fontWeight: Platform.OS === 'web' ? ('600' as const) : ('400' as const),
      letterSpacing: -0.2,
    },
  });
}
