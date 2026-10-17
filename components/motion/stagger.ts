import type { CSSProperties } from "react";

/**
 * Props for a staggered child inside a <Reveal> group: `<li {...stagger(i)}>`.
 * Lives outside the client module so Server Components can call it.
 */
export function stagger(i: number) {
  return {
    "data-stagger": "",
    style: { "--i": i } as CSSProperties,
  };
}
