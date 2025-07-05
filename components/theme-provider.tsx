"use client";

import { Theme } from "@radix-ui/themes";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <Theme
      accentColor="green"
      grayColor="olive"
      radius="large"
      scaling="100%"
      appearance="inherit"
    >
      {children}
    </Theme>
  );
}
