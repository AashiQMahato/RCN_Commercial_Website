import { CORE, STRANDS, project } from "@/components/hero/fiber-geometry";

/**
 * SVG rendition of the hero network. Server-rendered, so it paints instantly,
 * works without WebGL/JS and doubles as the mobile visual. Light pulses are
 * CSS stroke animations (disabled with prefers-reduced-motion).
 */
export function FiberPoster() {
  const [cx, cy] = project(CORE);

  return (
    <svg
      viewBox="0 0 600 600"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false">
      <defs>
        <radialGradient id="poster-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--pulse)" stopOpacity="0.9" />
          <stop offset="18%" stopColor="var(--pulse)" stopOpacity="0.35" />
          <stop offset="60%" stopColor="var(--pulse)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="var(--pulse)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="poster-home" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--signal)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {STRANDS.map((s, i) => {
        const [p0, p1, p2, p3] = s.points.map(project);
        const d = `M${p0[0]},${p0[1]} C${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`;
        const front = s.layer === "front";
        return (
          <g key={i}>
            <path
              d={d}
              fill="none"
              stroke="var(--signal)"
              strokeOpacity={front ? 0.32 : 0.13}
              strokeWidth={front ? 1.2 : 0.8}
            />
            {front ? (
              <path
                d={d}
                pathLength={1000}
                fill="none"
                stroke="var(--signal-strong)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="70 930"
                strokeDashoffset={0}
                className="flow"
                style={
                  {
                    "--flow-to": "-1000",
                    "--flow-dur": `${(1 / s.speed).toFixed(2)}s`,
                    "--flow-delay": `${(-s.offset / s.speed).toFixed(2)}s`,
                  } as React.CSSProperties
                }
              />
            ) : null}
            {front ? (
              <>
                <circle cx={p3[0]} cy={p3[1]} r={14} fill="url(#poster-home)" opacity={0.5} />
                <circle cx={p3[0]} cy={p3[1]} r={3} fill="var(--signal)" />
              </>
            ) : (
              <circle cx={p3[0]} cy={p3[1]} r={1.8} fill="var(--signal)" opacity={0.4} />
            )}
          </g>
        );
      })}

      <circle cx={cx} cy={cy} r={120} fill="url(#poster-core)" className="breathe" />
      <circle cx={cx} cy={cy} r={7} fill="var(--pulse)" />
      <circle cx={cx} cy={cy} r={3} fill="#fff7e6" />
    </svg>
  );
}
