"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const current = theme === "system" ? systemTheme : theme;
  const isDark = current === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center justify-center rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-muted)] px-2.5 py-2 text-sm shadow-sm hover:opacity-90"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <span suppressHydrationWarning>
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </span>
    </button>
  );
}
