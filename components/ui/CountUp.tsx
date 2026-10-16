"use client";

import * as React from "react";

type CountUpProps = {
  value: number;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
};

export function CountUp({
  value,
  suffix = "",
  decimals,
  durationMs = 1200,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);

  const fmtDecimals =
    typeof decimals === "number" ? decimals : value % 1 === 0 ? 0 : 1;

  const format = React.useCallback(
    (n: number) => `${n.toFixed(fmtDecimals)}${suffix}`,
    [fmtDecimals, suffix],
  );

  React.useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      el.textContent = format(value);
      return;
    }

    let raf = 0;
    let started = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const step = (ts: number) => {
          if (!started) started = ts;
          const p = Math.min(1, (ts - started) / durationMs);
          const eased = 1 - Math.pow(1 - p, 3);
          const current = value * eased;
          el.textContent = format(current);

          if (p < 1) raf = requestAnimationFrame(step);
        };

        raf = requestAnimationFrame(step);
      },
      { threshold: 0.15 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [durationMs, format, value]);

  return (
    <>
      <span ref={ref} aria-hidden="true" suppressHydrationWarning>
        {format(0)}
      </span>
      <span className="sr-only">{format(value)}</span>
    </>
  );
}
