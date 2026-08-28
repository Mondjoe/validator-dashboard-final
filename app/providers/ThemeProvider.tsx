"use client";

import { theme } from "../theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: theme.colors.background,
        color: theme.colors.text,
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      {children}
    </div>
  );
}