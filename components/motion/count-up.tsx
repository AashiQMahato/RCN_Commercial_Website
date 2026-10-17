"use client";

import * as React from "react";

/**
 * Counts up to `value` when scrolled into view.
 *
 * The final value is server-rendered (correct without JS, for crawlers and
 * screen readers). Only when the number is still below the fold at
 * hydration do we reset it to 0 and animate — so a visible value never
 * flickers, and SSR/initial client output always match.
 */
const format = (n: number) => Math.round(n).toLocaleString("en-US");

export function CountUp({
  value,
  durationMs = 1600,
}: {
  value: number;
  durationMs?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const final = format(value);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    el.textContent = format(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / durationMs);
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = format(value * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = final;
    };
  }, [value, durationMs, final]);

  return (
    <span ref={ref} className="tabular-nums" suppressHydrationWarning>
      {final}
    </span>
  );
}
