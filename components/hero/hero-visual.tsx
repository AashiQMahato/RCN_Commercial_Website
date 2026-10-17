"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { FiberPoster } from "@/components/hero/fiber-poster";

const FiberScene = dynamic(() => import("@/components/hero/fiber-scene"), {
  ssr: false,
});

type SceneState = "off" | "loading" | "ready" | "failed";

const INTENT_EVENTS = ["pointermove", "scroll", "touchstart", "keydown"] as const;

function canRunWebGL() {
  const desktop = window.matchMedia("(min-width: 1024px)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (!desktop || reduced || nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 8) < 4 || (nav.deviceMemory ?? 8) < 4)
    return false;
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Hero visual. The SVG poster renders immediately (and is the mobile,
 * reduced-motion and no-WebGL experience). On capable desktops the WebGL
 * scene is loaded once the visitor engages (or after a short idle period)
 * and cross-fades in over the poster, so it never delays first paint.
 */
export function HeroVisual() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState<SceneState>("off");
  const [visible, setVisible] = React.useState(true);

  // Pause poster animation / 3D rendering when scrolled out of view.
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setVisible(Boolean(entry?.isIntersecting)),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!canRunWebGL()) return;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      cleanup();
      setState("loading");
    };
    const timer = window.setTimeout(start, 5500);
    INTENT_EVENTS.forEach((e) =>
      window.addEventListener(e, start, { once: true, passive: true }),
    );
    function cleanup() {
      window.clearTimeout(timer);
      INTENT_EVENTS.forEach((e) => window.removeEventListener(e, start));
    }
    return cleanup;
  }, []);

  const showScene = state === "loading" || state === "ready";

  return (
    <div
      ref={ref}
      className={`relative h-full w-full ${visible && state !== "ready" ? "" : "paused"}`}
      role="img"
      aria-label="Illustration: fiber-optic light flowing from RCN's network core to the homes it connects">
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms]"
        style={{ opacity: state === "ready" ? 0 : 1 }}>
        <FiberPoster />
      </div>
      {showScene ? (
        <div
          className="absolute inset-0 transition-opacity duration-[1200ms]"
          style={{ opacity: state === "ready" ? 1 : 0 }}>
          <FiberScene
            active={visible}
            onReady={() => setState("ready")}
            onError={() => setState("failed")}
          />
        </div>
      ) : null}
    </div>
  );
}
