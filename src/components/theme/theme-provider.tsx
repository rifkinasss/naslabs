"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
};

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark", disableTransitionOnChange: boolean) {
  const root = document.documentElement;
  if (disableTransitionOnChange) {
    root.dataset.themeTransition = "off";
    window.setTimeout(() => delete root.dataset.themeTransition, 0);
  }
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children, defaultTheme = "system", enableSystem = true, disableTransitionOnChange = false }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  const resolveTheme = useCallback((value: Theme) => value === "system" && enableSystem ? getSystemTheme() : value === "dark" ? "dark" : "light", [enableSystem]);
  const updateTheme = useCallback((value: Theme) => {
    const resolved = resolveTheme(value);
    setThemeState(value);
    setResolvedTheme(resolved);
    applyTheme(resolved, disableTransitionOnChange);
    try {
      window.localStorage.setItem("theme", value);
    } catch {
      // Theme state still applies when browser storage is unavailable.
    }
  }, [disableTransitionOnChange, resolveTheme]);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem("theme");
    } catch {
      // Fall back to the configured default when browser storage is unavailable.
    }
    const initialTheme = stored === "light" || stored === "dark" || stored === "system" ? stored : defaultTheme;
    window.queueMicrotask(() => updateTheme(initialTheme));

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (initialTheme === "system") updateTheme("system");
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "theme") updateTheme(event.newValue === "light" || event.newValue === "dark" || event.newValue === "system" ? event.newValue : defaultTheme);
    };

    media.addEventListener("change", handleSystemChange);
    window.addEventListener("storage", handleStorage);
    return () => {
      media.removeEventListener("change", handleSystemChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, [defaultTheme, updateTheme]);

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme: updateTheme }), [resolvedTheme, theme, updateTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
