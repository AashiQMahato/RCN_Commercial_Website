import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

// Hover lift/glow is handled in CSS (`.rcn-card--hoverable`, `group-hover`)
// so cards render as plain server-friendly markup with zero runtime JS.

type CardSize = "sm" | "md" | "lg";

function sizeClass(size: CardSize) {
  return size === "sm"
    ? "rcn-card-sm"
    : size === "lg"
      ? "rcn-card-lg"
      : "rcn-card-md";
}

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactNode;
  accentColor?: string;
  noHover?: boolean;
  size?: CardSize;
  className?: string;
}

export function Card({
  children,
  accentColor = "rgb(var(--primary) / 0.18)",
  noHover = false,
  size = "md",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rcn-card group/card",
        sizeClass(size),
        noHover ? "" : "rcn-card--hoverable",
        "relative overflow-hidden",
        className,
      )}
      {...props}>
      {!noHover && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{
            background: `radial-gradient(500px circle at 50% -20%, ${accentColor}, transparent 70%)`,
          }}
        />
      )}

      <div className="relative">{children}</div>
    </div>
  );
}

interface FeaturedCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactNode;
  from?: string;
  to?: string;
  noHover?: boolean;
  size?: CardSize;
  className?: string;
}

export function FeaturedCard({
  children,
  from = "rgb(var(--primary) / 0.14)",
  to = "rgb(var(--green-400) / 0.10)",
  noHover = false,
  size = "lg",
  className,
  ...props
}: FeaturedCardProps) {
  return (
    <div
      className={cn(
        "rcn-card group/card",
        sizeClass(size),
        noHover ? "" : "rcn-card--hoverable",
        "relative overflow-hidden",
        className,
      )}
      {...props}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${from}, transparent 50%, ${to})`,
        }}
      />

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300",
          noHover ? "" : "group-hover/card:opacity-100",
        )}
        style={{
          background: `radial-gradient(600px circle at 50% 0%, ${from}, transparent 65%)`,
        }}
      />

      <div className="relative">{children}</div>
    </div>
  );
}

interface GhostCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactNode;
  pill?: boolean;
  noHover?: boolean;
  size?: CardSize;
  className?: string;
}

export function GhostCard({
  children,
  pill = false,
  noHover = false,
  size = "sm",
  className,
  ...props
}: GhostCardProps) {
  return (
    <div
      className={cn(
        "rcn-card",
        sizeClass(size),
        noHover ? "" : "rcn-card--hoverable",
        pill ? "rounded-full" : "",
        "overflow-hidden",
        className,
      )}
      {...props}>
      {children}
    </div>
  );
}
