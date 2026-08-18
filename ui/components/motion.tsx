import {
  Children,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  type GestureResponderEvent,
} from 'react-native';
import { NavigationContext } from '@react-navigation/native';

const IS_WEB = Platform.OS === 'web';

type PressableScaleProps = {
  children: ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  /** How far the control shrinks on press (1 = none). */
  pressedScale?: number;
  accessibilityLabel?: string;
  accessibilityState?: { selected?: boolean; disabled?: boolean };
  hitSlop?:
    | number
    | { top?: number; bottom?: number; left?: number; right?: number };
};

/** Soft spring press feedback for tappable actions (mouse + touch). */
export function PressableScale({
  children,
  onPress,
  onLongPress,
  disabled,
  style,
  contentStyle,
  pressedScale = 0.94,
  accessibilityLabel,
  accessibilityState,
  hitSlop,
}: PressableScaleProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressedRef = useRef(false);
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (releaseTimer.current) clearTimeout(releaseTimer.current);
    };
  }, []);

  const animateTo = (toValue: number) => {
    // Web mouse clicks are too fast for springs — use short timings so the press is visible.
    if (IS_WEB) {
      Animated.timing(scale, {
        toValue,
        duration: toValue < 1 ? 70 : 160,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
      return;
    }
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: toValue < 1 ? 50 : 22,
      bounciness: toValue < 1 ? 0 : 7,
    }).start();
  };

  const handlePressIn = () => {
    if (disabled) return;
    pressedRef.current = true;
    if (releaseTimer.current) {
      clearTimeout(releaseTimer.current);
      releaseTimer.current = null;
    }
    animateTo(pressedScale);
  };

  const handlePressOut = () => {
    pressedRef.current = false;
    // Keep the pressed frame visible briefly on web so clicks feel animated.
    if (IS_WEB) {
      releaseTimer.current = setTimeout(() => {
        if (!pressedRef.current) animateTo(1);
      }, 90);
      return;
    }
    animateTo(1);
  };

  return (
    <Animated.View
      style={[
        { transform: [{ scale }] },
        IS_WEB
          ? ({
              transitionProperty: 'transform',
              transitionDuration: '120ms',
            } as ViewStyle)
          : null,
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onHoverIn={
          IS_WEB && !disabled
            ? () => animateTo(Math.min(1, pressedScale + 0.03))
            : undefined
        }
        onHoverOut={
          IS_WEB && !disabled
            ? () => {
                if (!pressedRef.current) animateTo(1);
              }
            : undefined
        }
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={accessibilityState}
        hitSlop={hitSlop}
        style={contentStyle}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

type FadeInProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  delay?: number;
  duration?: number;
  fromY?: number;
  fromScale?: number;
  fromX?: number;
  /** Replay when the parent screen/tab gains focus (default true). */
  replayOnFocus?: boolean;
};

/** Entrance: fade + slight rise. Plays once on mount (set replayOnFocus to re-run on tab focus). */
export function FadeIn({
  children,
  style,
  delay = 0,
  duration = 420,
  fromY = 18,
  fromScale = 0.96,
  fromX = 0,
  replayOnFocus = false,
}: FadeInProps) {
  const navigation = useContext(NavigationContext);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(fromY)).current;
  const translateX = useRef(new Animated.Value(fromX)).current;
  const scale = useRef(new Animated.Value(fromScale)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  const play = useCallback(() => {
    animRef.current?.stop();
    opacity.setValue(0);
    translateY.setValue(fromY);
    translateX.setValue(fromX);
    scale.setValue(fromScale);
    const anim = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);
    animRef.current = anim;
    anim.start();
  }, [delay, duration, fromScale, fromX, fromY, opacity, scale, translateX, translateY]);

  useEffect(() => {
    // Outside a navigator (e.g. root modal) — play once on mount.
    if (!replayOnFocus || !navigation) {
      play();
      return () => animRef.current?.stop();
    }

    const unsub = navigation.addListener('focus', play);
    if (navigation.isFocused()) play();
    return () => {
      unsub();
      animRef.current?.stop();
    };
  }, [navigation, play, replayOnFocus]);

  return (
    <Animated.View
      style={[
        {
          opacity,
          transform: [{ translateX }, { translateY }, { scale }],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

type StaggerProps = {
  children: ReactNode;
  /** Delay between each child (ms). */
  step?: number;
  duration?: number;
  fromY?: number;
  fromScale?: number;
  style?: StyleProp<ViewStyle>;
  replayOnFocus?: boolean;
};

/** Staggered FadeIn for sibling blocks on a screen. */
export function Stagger({
  children,
  step = 80,
  duration = 400,
  fromY = 16,
  fromScale = 0.97,
  style,
  replayOnFocus = false,
}: StaggerProps) {
  const items = Children.toArray(children).filter(isValidElement);
  return (
    <View style={style}>
      {items.map((child, index) => (
        <FadeIn
          key={child.key ?? index}
          delay={index * step}
          duration={duration}
          fromY={fromY}
          fromScale={fromScale}
          replayOnFocus={replayOnFocus}
        >
          {child}
        </FadeIn>
      ))}
    </View>
  );
}

/** Soft cross-fade when a string value changes (status lines, labels). */
export function SoftFadeText({
  value,
  style,
  numberOfLines,
}: {
  value: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}) {
  const opacity = useRef(new Animated.Value(1)).current;
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (value === display) return;
    Animated.timing(opacity, {
      toValue: 0,
      duration: 140,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished) return;
      setDisplay(value);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    });
  }, [display, opacity, value]);

  return (
    <Animated.Text style={[{ opacity }, style]} numberOfLines={numberOfLines}>
      {display}
    </Animated.Text>
  );
}

/** Expanding ring — e.g. around the search heart while matching. */
export function PulseRing({
  active,
  color,
  size = 68,
}: {
  active: boolean;
  color: string;
  size?: number;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) {
      scale.setValue(1);
      opacity.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.55,
            duration: 1400,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.45,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1220,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [active, opacity, scale]);

  if (!active) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: color,
        opacity,
        transform: [{ scale }],
      }}
    />
  );
}

/** Gentle looping pulse — for hearts / accept affordances. */
export function usePulse(active = true, min = 1, max = 1.08, halfMs = 900) {
  const pulse = useRef(new Animated.Value(min)).current;

  useEffect(() => {
    if (!active) {
      pulse.setValue(min);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: max,
          duration: halfMs,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: min,
          duration: halfMs,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [active, halfMs, max, min, pulse]);

  return pulse;
}
