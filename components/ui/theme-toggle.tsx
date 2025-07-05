"use client";

import * as React from "react";
import { IconButton } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function ThemeToggle() {
  const [appearance, setAppearance] = React.useState<"light" | "dark">("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Get initial theme from localStorage or system preference
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      setAppearance(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const theme = prefersDark ? "dark" : "light";
      setAppearance(theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, []);

  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", appearance);
      document.documentElement.classList.toggle("dark", appearance === "dark");
    }
  }, [appearance, mounted]);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />;
  }

  const isDark = appearance === "dark";

  return (
    <IconButton
      variant="ghost"
      size="2"
      onClick={() => setAppearance(isDark ? "light" : "dark")}
      className="hover:bg-accent/50 transition-colors rounded-organic"
    >
      {isDark ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </IconButton>
  );
}
