"use client";

import * as React from "react";

import { business, type ServiceArea } from "@/data/business";
import { cn } from "@/lib/utils";

const SIZE = 560;
const C = SIZE / 2;

type Node = ServiceArea & { x: number; y: number; angle: number };

function layout(): { hq: ServiceArea[]; nodes: Node[] } {
  const hq = business.serviceAreas.filter((a) => a.status === "hq");
  const ring = (areas: ServiceArea[], r: number, start: number) =>
    areas.map((a, i) => {
      const angle = start + (i / areas.length) * Math.PI * 2;
      return { ...a, angle, x: C + Math.cos(angle) * r, y: C + Math.sin(angle) * r };
    });
  const active = business.serviceAreas.filter((a) => a.status === "active");
  const expanding = business.serviceAreas.filter((a) => a.status === "expanding");
  return {
    hq,
    nodes: [...ring(active, 150, -Math.PI / 2), ...ring(expanding, 235, -Math.PI / 5)],
  };
}

// Static data, so the layout is computed once at module load.
const LAYOUT = layout();

const STATUS_LABEL: Record<ServiceArea["status"], string> = {
  hq: "Head office",
  active: "Served",
  expanding: "Expanding",
};

/**
 * Conceptual diagram of RCN's service areas around the Sabaila HQ.
 * Positions are illustrative (not geographic) and the list beside it is the
 * accessible source of truth. Pulses pause when off-screen.
 */
export function NetworkDiagram() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [focus, setFocus] = React.useState<string | null>(null);
  const { hq, nodes } = LAYOUT;

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(Boolean(e?.isIntersecting)));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure
      ref={ref}
      className={cn("card overflow-hidden p-6 sm:p-8", !visible && "paused")}>
      <div className="relative mx-auto aspect-square w-full max-w-[460px]">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id="diagram-hq" r="50%">
              <stop offset="0%" stopColor="var(--pulse)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--pulse)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {[150, 235].map((r) => (
            <circle
              key={r}
              cx={C}
              cy={C}
              r={r}
              fill="none"
              stroke="var(--line-strong)"
              strokeDasharray="2 6"
            />
          ))}

          {nodes.map((n, i) => {
            const active = n.status === "active";
            const highlighted = focus === n.id;
            return (
              <g key={n.id}>
                <line
                  x1={C}
                  y1={C}
                  x2={n.x}
                  y2={n.y}
                  stroke={active ? "var(--signal)" : "var(--pulse)"}
                  strokeOpacity={highlighted ? 0.9 : active ? 0.35 : 0.3}
                  strokeWidth={highlighted ? 1.6 : 1}
                  strokeDasharray={active ? undefined : "4 6"}
                  style={{ transition: "stroke-opacity 200ms, stroke-width 200ms" }}
                />
                {active ? (
                  <line
                    x1={C}
                    y1={C}
                    x2={n.x}
                    y2={n.y}
                    pathLength={1000}
                    stroke="var(--signal-strong)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeDasharray="60 940"
                    className="flow"
                    style={
                      {
                        "--flow-to": "-1000",
                        "--flow-dur": `${3 + (i % 3) * 0.7}s`,
                        "--flow-delay": `${-i * 0.45}s`,
                      } as React.CSSProperties
                    }
                  />
                ) : null}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={highlighted ? 8 : 6}
                  fill="var(--surface)"
                  stroke={active ? "var(--signal)" : "var(--pulse)"}
                  strokeWidth={2}
                  style={{ transition: "r 200ms" }}
                />
                <text
                  x={n.x}
                  y={n.y + (n.y > C ? 26 : -16)}
                  textAnchor="middle"
                  className="hidden fill-[var(--fg-muted)] text-[15px] font-medium sm:inline">
                  {n.name}
                </text>
              </g>
            );
          })}

          <circle cx={C} cy={C} r={70} fill="url(#diagram-hq)" className="breathe" />
          <circle cx={C} cy={C} r={11} fill="var(--pulse)" />
          <text
            x={C}
            y={C + 38}
            textAnchor="middle"
            className="fill-[var(--fg)] text-[15px] font-semibold">
            RCN · Sabaila HQ
          </text>
        </svg>
      </div>

      <figcaption className="mt-6 border-t border-line pt-6">
        <p className="text-sm text-fg-subtle">
          Conceptual diagram — positions are illustrative, not to scale.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Service areas">
          {[...hq, ...nodes].map((a) => (
            <li
              key={a.id}
              onPointerEnter={() => setFocus(a.id)}
              onPointerLeave={() => setFocus(null)}
              className={cn(
                "chip",
                a.status === "hq" && "chip-pulse",
                a.status === "active" && "chip-signal",
              )}>
              <span
                aria-hidden="true"
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  a.status === "expanding"
                    ? "border border-current"
                    : "bg-current",
                )}
              />
              {a.name}
              <span className="text-fg-subtle">· {STATUS_LABEL[a.status]}</span>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
