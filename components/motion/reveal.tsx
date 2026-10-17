"use client";

import * as React from "react";

type RevealProps = React.PropsWithChildren<{
  className?: string;
  /** Seconds before the transition starts once visible. */
  delay?: number;
  /** Starting vertical offset in px. */
  y?: number;
  as?: "div" | "section" | "ul" | "ol" | "li" | "article";
  id?: string;
  "aria-labelledby"?: string;
}>;

/**
 * Reveals content as it scrolls into view. The transition itself is CSS
 * (`[data-reveal]` in globals.css); this component only flips the state.
 * Children marked `data-stagger` (with a `--i` index) animate in sequence.
 * Content is visible without JS (see <noscript> in the root layout) and
 * with prefers-reduced-motion.
 */
export function Reveal({
  className,
  delay = 0,
  y,
  as: Tag = "div",
  children,
  ...rest
}: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);

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
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = {
    ...(y !== undefined ? { "--reveal-y": `${y}px` } : null),
    ...(delay ? { "--reveal-delay": `${delay}s` } : null),
  } as React.CSSProperties;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      data-reveal=""
      style={style}
      {...rest}>
      {children}
    </Tag>
  );
}
