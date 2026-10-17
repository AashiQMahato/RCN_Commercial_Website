import type { SVGProps } from "react";
import type { IconName } from "@/data/content";

/**
 * RCN's custom line-icon set: 24px grid, 1.5px stroke, round joins.
 * Drawn to share one visual language (fiber strands, signal nodes).
 */
const PATHS: Record<IconName, React.ReactNode> = {
  fiber: (
    <>
      <path d="M4 20c0-6 4-11 12-13" />
      <path d="M8 20c0-4.5 3-8.5 8.5-10" opacity="0.7" />
      <path d="M12 20c0-3 2-5.5 5-6.5" opacity="0.45" />
      <circle cx="18" cy="6.5" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  infinity: (
    <path d="M7.5 15.5c-2 0-3.5-1.6-3.5-3.5s1.5-3.5 3.5-3.5c3.5 0 5.5 7 9 7 2 0 3.5-1.6 3.5-3.5S18.5 8.5 16.5 8.5c-3.5 0-5.5 7-9 7Z" />
  ),
  install: (
    <>
      <path d="M4 20h16" />
      <path d="M6 20V9l6-5 6 5v11" />
      <path d="M10 20v-5h4v5" />
      <path d="M12 4v-1" opacity="0.55" />
    </>
  ),
  support: (
    <>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19c0 1.5-2 2.5-5 2.5" />
    </>
  ),
  pricing: (
    <>
      <path d="M4 12.5V5a1 1 0 0 1 1-1h7.5L20 11.5 12.5 19 4 12.5Z" />
      <circle cx="8.5" cy="8.5" r="1.4" />
    </>
  ),
  business: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M3 12.5h18" opacity="0.55" />
    </>
  ),
  plan: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  signal: (
    <>
      <path d="M5 12a10 10 0 0 1 14 0" opacity="0.55" />
      <path d="M8 15a5.5 5.5 0 0 1 8 0" />
      <circle cx="12" cy="18.5" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  community: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M4.5 11.5a2.2 2.2 0 1 1 1.5-4M19.5 11.5a2.2 2.2 0 1 0-1.5-4" opacity="0.55" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.4 3 8.2 7 9.5 4-1.3 7-5.1 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  growth: (
    <>
      <path d="M4 19h16" />
      <path d="m5 15 4.5-4.5 3.5 3 6-6.5" />
      <path d="M15 7h4v4" />
    </>
  ),
};

export function Icon({
  name,
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      {PATHS[name]}
    </svg>
  );
}
