import {
  ColorScheme,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useState } from "react";

export const theme: MantineThemeOverride = {
  colorScheme: "light",
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ ...theme, colorScheme }}
    >
      {children}
    </MantineProvider>
  );
}
