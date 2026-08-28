"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 flex gap-2 z-50">
      <button
        onClick={() => setTheme("dark")}
        className="px-3 py-2 bg-[var(--card)] border border-[var(--border)] text-[var(--text)]"
      >
        Dark
      </button>
      <button
        onClick={() => setTheme("cyber")}
        className="px-3 py-2 bg-[var(--card)] border border-[var(--border)] text-[var(--text)]"
      >
        Cyber
      </button>
      <button
        onClick={() => setTheme("noir")}
        className="px-3 py-2 bg-[var(--card)] border border-[var(--border)] text-[var(--text)]"
      >
        Noir
      </button>
    </div>
  );
}
