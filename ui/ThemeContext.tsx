import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Platform, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ThemeMode,
  ThemeColors,
  AccentPalette,
  getColors,
  createTypography,
} from './theme';

const THEME_STORAGE_KEY = '@lafs/theme';
const PREMIUM_THEME_KEY = '@lafs/premiumThemeEnabled';

type ThemeContextValue = {
  theme: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  typography: ReturnType<typeof createTypography>;
  setTheme: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
  /** User preference: use Premium accent palette when subscribed. Default on. */
  premiumThemeEnabled: boolean;
  setPremiumThemeEnabled: (enabled: boolean) => Promise<void>;
  /** True when Premium is active AND preference is on — blue accent applied. */
  isPremiumThemeActive: boolean;
  /** Called from UserProvider when premium status changes. */
  setPremiumEligible: (eligible: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyWebDocumentTheme(mode: ThemeMode, colors: ThemeColors) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.backgroundColor = colors.background;
  root.style.colorScheme = mode;
  if (document.body) {
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.text;
    document.body.style.fontFamily =
      'Manrope, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  }

  const fontId = 'lafs-landing-fonts';
  if (!document.getElementById(fontId)) {
    const link = document.createElement('link');
    link.id = fontId;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Syne:wght@700;800&display=swap';
    document.head.appendChild(link);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [premiumThemeEnabled, setPremiumThemeEnabledState] = useState(true);
  const [premiumEligible, setPremiumEligible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [storedTheme, storedPremiumTheme] = await Promise.all([
          AsyncStorage.getItem(THEME_STORAGE_KEY),
          AsyncStorage.getItem(PREMIUM_THEME_KEY),
        ]);
        if (!cancelled && (storedTheme === 'light' || storedTheme === 'dark')) {
          setThemeState(storedTheme);
        } else if (!cancelled && !storedTheme) {
          // First launch: landing look (dark)
          setThemeState('dark');
        }
        if (!cancelled && storedPremiumTheme === '0') {
          setPremiumThemeEnabledState(false);
        } else if (!cancelled && storedPremiumTheme === '1') {
          setPremiumThemeEnabledState(true);
        }
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const accent: AccentPalette =
    premiumEligible && premiumThemeEnabled ? 'premium' : 'brand';
  const isPremiumThemeActive = accent === 'premium';

  const colors = useMemo(() => getColors(theme, accent), [theme, accent]);
  const typography = useMemo(() => createTypography(colors), [colors]);

  useEffect(() => {
    applyWebDocumentTheme(theme, colors);
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle(theme === 'dark' ? 'light-content' : 'dark-content');
      StatusBar.setBackgroundColor(colors.background);
    }
  }, [theme, colors]);

  const setTheme = useCallback(async (mode: ThemeMode) => {
    setThemeState(mode);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = useCallback(async () => {
    await setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);

  const setPremiumThemeEnabled = useCallback(async (enabled: boolean) => {
    setPremiumThemeEnabledState(enabled);
    try {
      await AsyncStorage.setItem(PREMIUM_THEME_KEY, enabled ? '1' : '0');
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      colors,
      typography,
      setTheme,
      toggleTheme,
      premiumThemeEnabled,
      setPremiumThemeEnabled,
      isPremiumThemeActive,
      setPremiumEligible,
    }),
    [
      theme,
      colors,
      typography,
      setTheme,
      toggleTheme,
      premiumThemeEnabled,
      setPremiumThemeEnabled,
      isPremiumThemeActive,
    ],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
