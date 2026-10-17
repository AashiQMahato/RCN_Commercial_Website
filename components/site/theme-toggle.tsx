"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      aria-label="Toggle light and dark theme"
      title="Toggle light and dark theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-line text-fg-muted transition-colors duration-200 hover:border-line-strong hover:text-fg">
      <Moon className="h-[18px] w-[18px] light:hidden" aria-hidden="true" />
      <Sun className="hidden h-[18px] w-[18px] light:block" aria-hidden="true" />
    </button>
  );
}
