import { useMemo } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Spacing, FontSize, BorderRadius, FontFamily } from '../theme';
import { useTheme } from '../ThemeContext';
import { PressableScale } from './motion';
import { RemoteImage } from './RemoteImage';

interface CellProps {
  title: string;
  subtitle?: string;
  value?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  avatarUri?: string;
  onPress?: () => void;
  danger?: boolean;
  chevron?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (v: boolean) => void;
  showSeparator?: boolean;
}

/** VKUI-style Cell: icon/avatar · title/subtitle · value/switch/chevron */
export function Cell({
  title,
  subtitle,
  value,
  icon,
  iconColor,
  avatarUri,
  onPress,
  danger,
  chevron,
  switchValue,
  onSwitchChange,
  showSeparator = true,
}: CellProps) {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          backgroundColor: colors.surface,
          width: '100%',
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 48,
          paddingHorizontal: Spacing.lg,
          paddingVertical: 10,
          gap: 12,
        },
        iconWrap: {
          width: 28,
          height: 28,
          borderRadius: BorderRadius.sm,
          backgroundColor: colors.pinkTint,
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconDanger: {
          backgroundColor: colors.danger,
        },
        avatar: {
          width: 40,
          height: 40,
          borderRadius: 20,
        },
        textCol: {
          flex: 1,
          minWidth: 0,
        },
        title: {
          fontFamily: FontFamily,
          fontSize: FontSize.md,
          fontWeight: '400',
          color: colors.text,
          letterSpacing: -0.3,
        },
        titleDanger: {
          color: colors.danger,
        },
        subtitle: {
          fontFamily: FontFamily,
          fontSize: FontSize.xs,
          color: colors.textSecondary,
          marginTop: 2,
        },
        value: {
          fontFamily: FontFamily,
          fontSize: FontSize.md,
          color: colors.textSecondary,
        },
        separator: {
          height: StyleSheet.hairlineWidth,
          backgroundColor: colors.separator,
          marginLeft: 56,
        },
      }),
    [colors],
  );

  const resolvedIconColor = iconColor ?? colors.primary;

  const content = (
    <>
      <View style={styles.row}>
        {avatarUri ? (
          <RemoteImage uri={avatarUri} style={styles.avatar} resizeMode="cover" />
        ) : icon ? (
          <View style={[styles.iconWrap, danger && styles.iconDanger]}>
            <Ionicons name={icon} size={18} color={danger ? '#fff' : resolvedIconColor} />
          </View>
        ) : null}

        <View style={styles.textCol}>
          <Text style={[styles.title, danger && styles.titleDanger]} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {value ? <Text style={styles.value}>{value}</Text> : null}

        {onSwitchChange != null ? (
          <Switch
            value={!!switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: colors.inputFill, true: colors.primary }}
            thumbColor="#fff"
            ios_backgroundColor={colors.inputFill}
          />
        ) : null}

        {(chevron || onPress) && onSwitchChange == null ? (
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        ) : null}
      </View>
      {showSeparator ? <View style={styles.separator} /> : null}
    </>
  );

  if (onPress) {
    return (
      <PressableScale
        onPress={onPress}
        pressedScale={0.985}
        style={{ width: '100%' }}
        contentStyle={styles.wrap}
      >
        {content}
      </PressableScale>
    );
  }

  return <View style={styles.wrap}>{content}</View>;
}

export function CellGroup({
  children,
  header,
}: {
  children: React.ReactNode;
  header?: string;
}) {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        groupWrap: {
          width: '100%',
          marginBottom: Spacing.lg,
        },
        groupHeader: {
          fontFamily: FontFamily,
          fontSize: 13,
          fontWeight: '400',
          color: colors.textSecondary,
          textTransform: 'uppercase',
          marginBottom: 6,
          marginLeft: 16,
          letterSpacing: 0.2,
        },
        group: {
          backgroundColor: colors.surface,
          borderRadius: BorderRadius.xl,
          overflow: 'hidden',
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.borderLight,
        },
      }),
    [colors],
  );

  return (
    <View style={styles.groupWrap}>
      {header ? <Text style={styles.groupHeader}>{header}</Text> : null}
      <View style={styles.group}>{children}</View>
    </View>
  );
}
