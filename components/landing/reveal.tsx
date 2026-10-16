"use client";

import * as React from "react";

type RevealProps = React.PropsWithChildren<{
  className?: string;
  delay?: number;
  y?: number;
}>;

/**
 * Fades/slides children in when they scroll into view.
 * Pure CSS transition toggled by an IntersectionObserver — no animation
 * library on the critical path (see `[data-reveal]` in globals.css).
 */
export function Reveal({
  className,
  delay = 0,
  y = 16,
  children,
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => {
      el.dataset.reveal = "in";
    };
    if (typeof IntersectionObserver === "undefined") return show();

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      data-reveal=""
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-delay": `${delay}s`,
        } as React.CSSProperties
      }>
      {children}
    </div>
  );
}
