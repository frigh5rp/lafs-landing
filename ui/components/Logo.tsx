import { useEffect, useMemo, useRef } from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, Platform, View } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useTheme } from '../ThemeContext';

/** Same display face as app.lafs.tech (Syne). */
export const LogoFontFamily = Platform.OS === 'web' ? 'Syne, ExpresswayFree' : 'Syne_800ExtraBold';

type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

interface LogoProps {
  size?: LogoSize;
  style?: ViewStyle;
}

const SIZE_MAP: Record<LogoSize, { fontSize: number; letterSpacing: number }> = {
  sm: { fontSize: 28, letterSpacing: -0.8 },
  md: { fontSize: 36, letterSpacing: -1.2 },
  lg: { fontSize: 48, letterSpacing: -1.6 },
  xl: { fontSize: 64, letterSpacing: -2.4 },
};

const EASTER_HOLD_MS = 60_000;
const EASTER_SOUND = require('../assets/sounds/farts-4.mp3');

export function Logo({ size = 'lg', style }: LogoProps) {
  const { colors, isDark } = useTheme();
  const { fontSize, letterSpacing } = SIZE_MAP[size];
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  const wordStyle = useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        },
        word: {
          fontFamily: LogoFontFamily,
          fontWeight: Platform.OS === 'web' ? ('800' as const) : ('400' as const),
          includeFontPadding: false,
          letterSpacing,
          fontSize,
          color: colors.primary,
          textAlign: 'center',
          ...(Platform.OS === 'web'
            ? isDark
              ? ({
                  backgroundImage: `linear-gradient(120deg, #fff 10%, ${colors.primaryLight} 55%, ${colors.primary})`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                } as object)
              : ({
                  color: colors.primary,
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                } as object)
            : null),
        },
        maskWord: {
          fontFamily: LogoFontFamily,
          fontWeight: '400',
          includeFontPadding: false,
          letterSpacing,
          fontSize,
          color: '#000',
          textAlign: 'center',
        },
        maskBox: {
          height: fontSize * 1.25,
          width: fontSize * 5.4,
          alignSelf: 'center',
        },
      }),
    [colors, isDark, fontSize, letterSpacing],
  );

  useEffect(() => {
    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      void soundRef.current?.unloadAsync();
      soundRef.current = null;
    };
  }, []);

  const clearHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const playEasterEgg = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(EASTER_SOUND, {
        shouldPlay: true,
        volume: 1,
      });
      soundRef.current = sound;
    } catch {
      // easter egg only
    }
  };

  const onPressIn = () => {
    clearHold();
    holdTimer.current = setTimeout(() => {
      holdTimer.current = null;
      void playEasterEgg();
    }, EASTER_HOLD_MS);
  };

  // Dark: gradient word like web. Light: solid brand pink.
  // MaskedView must be at least as wide as "LAFS" in Syne ExtraBold — a short
  // minWidth clipped the last letter ("LAF").
  const label =
    isDark && Platform.OS !== 'web' ? (
      <MaskedView
        style={wordStyle.maskBox}
        maskElement={
          <View style={{ backgroundColor: 'transparent', alignItems: 'center' }}>
            <Text style={wordStyle.maskWord} numberOfLines={1}>
              LAFS
            </Text>
          </View>
        }
      >
        <LinearGradient
          colors={['#FFFFFF', colors.primaryLight, colors.primary]}
          locations={[0.1, 0.55, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </MaskedView>
    ) : (
      <Text style={wordStyle.word} numberOfLines={1}>
        LAFS
      </Text>
    );

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={clearHold}
      style={[wordStyle.wrap, style]}
      accessibilityLabel="LAFS"
    >
      {label}
    </Pressable>
  );
}
