import { useCallback, useEffect, useState } from "react";

const THEME_KEY = "theme";
const DEFAULT_THEME = "dim";

export function useTheme() {
  // Use lazy initializer to read from localStorage on first render (client only)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem(THEME_KEY) ||
        document.documentElement.getAttribute("data-theme") ||
        DEFAULT_THEME
      );
    }
    return DEFAULT_THEME;
  });

  // Update <html> and localStorage when theme changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme]);

  // DaisyUI toggle: just swap between two or more themes
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dim" ? "lemonade" : "dim"));
  }, []);

  return { theme, setTheme, toggleTheme };
}
