"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";

import { useTheme } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const t = useTranslations("Navigation");
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "dark";
  const label = mounted ? (isDark ? t("useLightTheme") : t("useDarkTheme")) : t("chooseTheme");

  return (
    <Button
      type="button"
      variant="v2-ghost"
      size="icon"
      className="v2-interactive"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {!mounted ? <Monitor aria-hidden="true" /> : isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}
