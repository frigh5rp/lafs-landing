# LAFS UI kit

Extract of **non-admin** React Native / Expo UI from LAFS: theme, buttons, cards, inputs, motion.

Not a runnable app — drop into an Expo project or use as reference.

## Included

| Path | What |
|------|------|
| `theme.ts` | Colors, spacing, typography, shadows |
| `ThemeContext.tsx` | Light/dark + brand/premium accents |
| `hooks/useResponsive.ts` | Breakpoints for phone/tablet/web |
| `components/` | Button, Card, Chip, TextField, Logo, Screen*, Cell, StatBox, SettingsRow, FrostedPhoto, AtmosphereBackground, motion, RemoteImage |

## Not included (on purpose)

- Admin panel / moderation UI
- Auth (VK), calls, WebRTC
- API / server / deploy
- Overlays tied to maintenance / admin broadcasts

## Peer dependencies

```
react
react-native
expo-linear-gradient
expo-blur
expo-av
@expo/vector-icons
@react-native-masked-view/masked-view
@react-native-async-storage/async-storage
react-native-safe-area-context
```

Fonts used in production: **Manrope**, **Syne**, Proxima Nova (titles). On web you can load Manrope/Syne from Google Fonts.

## Usage sketch

```tsx
import { ThemeProvider, useTheme } from '../ui/ThemeContext';
import { Button } from '../ui/components/Button';
import { ScreenContainer } from '../ui/components/ScreenContainer';

export function Demo() {
  return (
    <ThemeProvider>
      <ScreenContainer>
        <Button title="Continue" onPress={() => {}} />
      </ScreenContainer>
    </ThemeProvider>
  );
}
```

## License

Same as the repository root `LICENSE` (proprietary / all rights reserved by default — not an open-source grant).
