"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

const MODES = ["system", "light", "dark"] as const;
type Mode = (typeof MODES)[number];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-9 w-9" />;

  const cycle = () => {
    const idx = MODES.indexOf(((theme as Mode) ?? "system") as Mode);
    setTheme(MODES[(idx + 1) % MODES.length]);
  };

  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  const label = `Theme: ${theme ?? "system"}`;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text-muted))] shadow-sm transition hover:scale-[1.08] hover:bg-[rgb(var(--surface-2))] hover:text-[rgb(var(--text))] active:scale-[0.94]">
      <span key={theme} className="rcn-theme-icon">
        <Icon className="h-4 w-4" />
      </span>
    </button>
  );
}
