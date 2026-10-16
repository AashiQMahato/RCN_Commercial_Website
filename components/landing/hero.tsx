"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Zap, Shield, Wifi } from "lucide-react";
import { useRef, useEffect, useCallback, useState } from "react";
import { CountUp } from "@/components/ui/CountUp";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/lib/i18n";

// ─── Types ───────────────────────────────────────────────────────────────────

interface StatItem {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
}

// ─── Globe ───────────────────────────────────────────────────────────────────

function GlobeCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const angleRef = useRef(0);
  const tickRef = useRef(0);

  const NODES = [
    { lat: 26.8, lng: 87.2, label: "Sabaila HQ", primary: true },
    { lat: 27.7, lng: 85.3, label: "Kathmandu", primary: false },
    { lat: 26.5, lng: 86.7, label: "Gaur", primary: false },
    { lat: 27.0, lng: 88.1, label: "Dharan", primary: false },
    { lat: 26.6, lng: 87.9, label: "Chandrapur", primary: false },
    { lat: 25.4, lng: 81.9, label: "India Node", primary: false },
    { lat: 35.7, lng: 139.7, label: "Tokyo IX", primary: false },
    { lat: 37.8, lng: -122.4, label: "SF POP", primary: false },
    { lat: 51.5, lng: -0.1, label: "London IX", primary: false },
    { lat: 1.3, lng: 103.8, label: "Singapore IX", primary: false },
    { lat: 19.1, lng: 72.9, label: "Mumbai IX", primary: false },
    { lat: 48.9, lng: 2.3, label: "Paris IXP", primary: false },
    { lat: -33.9, lng: 151.2, label: "Sydney POP", primary: false },
    { lat: 55.7, lng: 37.6, label: "Moscow IXP", primary: false },
    { lat: 23.1, lng: 113.3, label: "Guangzhou IX", primary: false },
    { lat: 40.7, lng: -74.0, label: "NYC POP", primary: false },
    { lat: -23.5, lng: -46.6, label: "São Paulo IX", primary: false },
    { lat: 6.5, lng: 3.4, label: "Lagos IXP", primary: false },
  ];

  const CONNECTIONS = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 10],
    [10, 9],
    [9, 6],
    [9, 7],
    [10, 11],
    [11, 8],
    [8, 15],
    [7, 15],
    [9, 13],
    [13, 14],
    [6, 14],
    [11, 16],
    [8, 5],
    [5, 0],
    [14, 12],
    [16, 17],
  ];

  const toXYZ = useCallback((lat: number, lng: number, r: number) => {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lng + 180) * Math.PI) / 180;
    return {
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.cos(phi),
      z: r * Math.sin(phi) * Math.sin(theta),
    };
  }, []);

  const project = useCallback(
    (x: number, y: number, z: number, W: number, H: number, fov: number) => {
      const scale = fov / (fov + z);
      return { sx: W / 2 + x * scale, sy: H / 2 - y * scale, z, scale };
    },
    [],
  );

  const rotateY = useCallback((x: number, y: number, z: number, a: number) => {
    const cos = Math.cos(a),
      sin = Math.sin(a);
    return { x: x * cos + z * sin, y, z: -x * sin + z * cos };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 460;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let onScreen = true;
    const R = 168;
    const FOV = 460;

    // Pre-generate grid
    const LAT_LINES: number[][] = [];
    for (let lat = -75; lat <= 75; lat += 15) {
      const pts: number[] = [];
      for (let lng = 0; lng <= 360; lng += 2) pts.push(lat, lng);
      LAT_LINES.push(pts);
    }
    const LNG_LINES: number[][] = [];
    for (let lng = 0; lng < 360; lng += 15) {
      const pts: number[] = [];
      for (let lat = -90; lat <= 90; lat += 2) pts.push(lat, lng);
      LNG_LINES.push(pts);
    }

    // Continent polygon dots (simplified blob points for atmosphere)
    const DOTS: Array<[number, number]> = [];
    // Europe/Africa band
    for (let lat = -30; lat <= 65; lat += 4) {
      for (let lng = -20; lng <= 55; lng += 5) {
        if (Math.random() > 0.45)
          DOTS.push([
            lat + (Math.random() - 0.5) * 3,
            lng + (Math.random() - 0.5) * 3,
          ]);
      }
    }
    // Asia
    for (let lat = 10; lat <= 70; lat += 4) {
      for (let lng = 60; lng <= 150; lng += 5) {
        if (Math.random() > 0.4)
          DOTS.push([
            lat + (Math.random() - 0.5) * 3,
            lng + (Math.random() - 0.5) * 3,
          ]);
      }
    }
    // Americas
    for (let lat = -50; lat <= 70; lat += 4) {
      for (let lng = -170; lng <= -30; lng += 5) {
        if (Math.random() > 0.5)
          DOTS.push([
            lat + (Math.random() - 0.5) * 3,
            lng + (Math.random() - 0.5) * 3,
          ]);
      }
    }
    // Australia
    for (let lat = -40; lat <= -15; lat += 4) {
      for (let lng = 112; lng <= 154; lng += 5) {
        if (Math.random() > 0.4)
          DOTS.push([
            lat + (Math.random() - 0.5) * 3,
            lng + (Math.random() - 0.5) * 3,
          ]);
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      const angle = angleRef.current;
      const t = tickRef.current;
      const W = SIZE,
        H = SIZE;

      // Theme colors
      const primary = isDark ? "16,185,129" : "16,140,90";
      const gold = "212,168,83";
      const gridAlpha = isDark ? 0.14 : 0.12;
      const dotAlpha = isDark ? 0.25 : 0.18;

      // Atmosphere halo
      const atmo = ctx.createRadialGradient(
        W / 2,
        H / 2,
        R * 0.7,
        W / 2,
        H / 2,
        R * 1.28,
      );
      if (isDark) {
        atmo.addColorStop(0, "rgba(16,185,129,0.0)");
        atmo.addColorStop(0.5, "rgba(16,185,129,0.07)");
        atmo.addColorStop(0.85, "rgba(6,182,212,0.04)");
        atmo.addColorStop(1, "rgba(0,0,0,0)");
      } else {
        atmo.addColorStop(0, "rgba(16,140,90,0.0)");
        atmo.addColorStop(0.5, "rgba(16,140,90,0.06)");
        atmo.addColorStop(0.85, "rgba(6,182,212,0.03)");
        atmo.addColorStop(1, "rgba(255,255,255,0)");
      }
      ctx.fillStyle = atmo;
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, R * 1.28, 0, Math.PI * 2);
      ctx.fill();

      // Globe base
      const grad = ctx.createRadialGradient(
        W / 2 - 50,
        H / 2 - 50,
        0,
        W / 2,
        H / 2,
        R,
      );
      if (isDark) {
        grad.addColorStop(0, "rgba(15,32,20,0.97)");
        grad.addColorStop(0.6, "rgba(8,18,11,0.99)");
        grad.addColorStop(1, "rgba(4,10,6,1)");
      } else {
        grad.addColorStop(0, "rgba(240,255,246,0.98)");
        grad.addColorStop(0.6, "rgba(220,248,234,0.99)");
        grad.addColorStop(1, "rgba(195,240,215,1)");
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, R, 0, Math.PI * 2);
      ctx.fill();

      // Clip sphere
      ctx.save();
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, R, 0, Math.PI * 2);
      ctx.clip();

      // Land dots
      for (const [lat, lng] of DOTS) {
        const raw = toXYZ(lat, lng, R * 0.99);
        const rot = rotateY(raw.x, raw.y, raw.z, angle);
        if (rot.z < 0) continue;
        const p = project(rot.x, rot.y, rot.z, W, H, FOV);
        const fade = Math.max(0, rot.z / R);
        ctx.fillStyle = `rgba(${primary},${dotAlpha * fade})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Grid lines
      const drawGrid = (lines: number[][], alpha: number) => {
        ctx.lineWidth = 0.35;
        for (const pts of lines) {
          ctx.beginPath();
          let first = true;
          for (let i = 0; i < pts.length - 1; i += 2) {
            const raw = toXYZ(pts[i], pts[i + 1], R);
            const rot = rotateY(raw.x, raw.y, raw.z, angle);
            const p = project(rot.x, rot.y, rot.z, W, H, FOV);
            const fade = Math.max(0, rot.z / R) * alpha;
            ctx.strokeStyle = `rgba(${primary},${fade})`;
            if (first) {
              ctx.moveTo(p.sx, p.sy);
              first = false;
            } else ctx.lineTo(p.sx, p.sy);
          }
          ctx.stroke();
        }
      };
      drawGrid(LAT_LINES, gridAlpha * 1.4);
      drawGrid(LNG_LINES, gridAlpha);

      ctx.restore();

      // Sphere border
      const borderGrad = ctx.createLinearGradient(
        W / 2 - R,
        H / 2,
        W / 2 + R,
        H / 2,
      );
      if (isDark) {
        borderGrad.addColorStop(0, "rgba(16,185,129,0.08)");
        borderGrad.addColorStop(0.5, "rgba(16,185,129,0.4)");
        borderGrad.addColorStop(1, "rgba(6,182,212,0.1)");
      } else {
        borderGrad.addColorStop(0, "rgba(16,140,90,0.08)");
        borderGrad.addColorStop(0.5, "rgba(16,140,90,0.35)");
        borderGrad.addColorStop(1, "rgba(6,182,212,0.1)");
      }
      ctx.strokeStyle = borderGrad;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, R, 0, Math.PI * 2);
      ctx.stroke();

      // Rotated nodes
      const rotatedNodes = NODES.map((n) => {
        const raw = toXYZ(n.lat, n.lng, R);
        const rot = rotateY(raw.x, raw.y, raw.z, angle);
        const p = project(rot.x, rot.y, rot.z, W, H, FOV);
        return { ...n, ...p, visible: rot.z > -10, depth: rot.z };
      });

      // Arcs
      ctx.setLineDash([3, 5]);
      for (const [ai, bi] of CONNECTIONS) {
        const a = rotatedNodes[ai];
        const b = rotatedNodes[bi];
        if (!a.visible && !b.visible) continue;
        const fadeA = Math.max(0, a.depth / R);
        const fadeB = Math.max(0, b.depth / R);
        const alpha = Math.min(fadeA, fadeB) * 0.4;
        ctx.strokeStyle = `rgba(${primary},${alpha})`;
        ctx.lineWidth = 0.7;
        const mx = (a.sx + b.sx) / 2;
        const my = (a.sy + b.sy) / 2 - 20;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.quadraticCurveTo(mx, my, b.sx, b.sy);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Animated data packet
      const connIdx = Math.floor(t / 90) % CONNECTIONS.length;
      const [ai, bi] = CONNECTIONS[connIdx];
      const pa = rotatedNodes[ai],
        pb = rotatedNodes[bi];
      if (pa.visible || pb.visible) {
        const frac = (t % 90) / 90;
        const mx = (pa.sx + pb.sx) / 2;
        const my = (pa.sy + pb.sy) / 2 - 20;
        const ix =
          (1 - frac) * (1 - frac) * pa.sx +
          2 * (1 - frac) * frac * mx +
          frac * frac * pb.sx;
        const iy =
          (1 - frac) * (1 - frac) * pa.sy +
          2 * (1 - frac) * frac * my +
          frac * frac * pb.sy;
        const packetAlpha =
          frac < 0.1 ? frac * 10 : frac > 0.9 ? (1 - frac) * 10 : 1;
        ctx.shadowBlur = 12;
        ctx.shadowColor = isDark ? "#86efac" : "#16a35a";
        ctx.fillStyle = isDark
          ? `rgba(134,239,172,${packetAlpha})`
          : `rgba(22,163,90,${packetAlpha})`;
        ctx.beginPath();
        ctx.arc(ix, iy, 3, 0, Math.PI * 2);
        ctx.fill();
        // Trailing glow
        for (let trail = 1; trail <= 3; trail++) {
          const tf = Math.max(0, frac - trail * 0.03);
          const tx =
            (1 - tf) * (1 - tf) * pa.sx +
            2 * (1 - tf) * tf * mx +
            tf * tf * pb.sx;
          const ty =
            (1 - tf) * (1 - tf) * pa.sy +
            2 * (1 - tf) * tf * my +
            tf * tf * pb.sy;
          ctx.fillStyle = isDark
            ? `rgba(134,239,172,${packetAlpha * (0.4 - trail * 0.12)})`
            : `rgba(22,163,90,${packetAlpha * (0.35 - trail * 0.1)})`;
          ctx.beginPath();
          ctx.arc(tx, ty, 2 - trail * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      // Node rendering
      for (const n of rotatedNodes) {
        if (!n.visible) continue;
        const pulse = Math.sin(t * 0.045 + n.lat * 0.3) * 0.5 + 0.5;
        const fade = Math.max(0, n.depth / R);

        if (n.primary) {
          // HQ star node
          ctx.shadowBlur = 16 + pulse * 10;
          ctx.shadowColor = `rgba(${gold},0.9)`;
          ctx.fillStyle = `rgba(${gold},${0.85 + pulse * 0.15})`;
          ctx.beginPath();
          ctx.arc(n.sx, n.sy, 5.5, 0, Math.PI * 2);
          ctx.fill();
          // Inner bright spot
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(255,230,140,${0.7 + pulse * 0.3})`;
          ctx.beginPath();
          ctx.arc(n.sx, n.sy, 2, 0, Math.PI * 2);
          ctx.fill();
          // Pulse rings
          for (let ring = 1; ring <= 2; ring++) {
            const rAlpha =
              Math.max(0, 0.55 - pulse * 0.45 - (ring - 1) * 0.2) * fade;
            ctx.strokeStyle = `rgba(${gold},${rAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(n.sx, n.sy, 6 + pulse * 12 * ring, 0, Math.PI * 2);
            ctx.stroke();
          }
        } else {
          const r = 2.8 + pulse * 0.9;
          const gA = (0.75 + pulse * 0.25) * fade;
          ctx.shadowBlur = 8 + pulse * 5;
          ctx.shadowColor = `rgba(${primary},0.8)`;
          ctx.fillStyle = `rgba(${primary},${gA})`;
          ctx.beginPath();
          ctx.arc(n.sx, n.sy, r, 0, Math.PI * 2);
          ctx.fill();
          // Inner dot
          ctx.fillStyle = isDark
            ? `rgba(200,255,225,${gA * 0.8})`
            : `rgba(255,255,255,${gA * 0.9})`;
          ctx.beginPath();
          ctx.arc(n.sx, n.sy, r * 0.38, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Specular highlight
      const spec = ctx.createRadialGradient(
        W / 2 - 55,
        H / 2 - 55,
        0,
        W / 2 - 55,
        H / 2 - 55,
        R * 0.7,
      );
      spec.addColorStop(
        0,
        isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.18)",
      );
      spec.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = spec;
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, R, 0, Math.PI * 2);
      ctx.fill();

      angleRef.current += 0.0025;
      tickRef.current++;
      frameRef.current = 0;
      schedule();
    };

    // Only animate while the globe is visible and the tab is in the foreground.
    function schedule() {
      if (reduceMotion || !onScreen || document.hidden || frameRef.current)
        return;
      frameRef.current = requestAnimationFrame(draw);
    }

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      schedule();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", schedule);

    draw();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", schedule);
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, [isDark, toXYZ, rotateY, project]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        borderRadius: "50%",
      }}
    />
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

const STAT_META = [
  {
    icon: Zap,
    colorDark: "#10b981",
    colorLight: "#059669",
    accent: "10,185,129",
  },
  {
    icon: Shield,
    colorDark: "#06b6d4",
    colorLight: "#0891b2",
    accent: "6,182,212",
  },
  {
    icon: Wifi,
    colorDark: "#d4a853",
    colorLight: "#b7811a",
    accent: "212,168,83",
  },
];

function StatPill({
  stat,
  i,
  isDark,
}: {
  stat: StatItem;
  i: number;
  isDark: boolean;
}) {
  const m = STAT_META[i];
  const Icon = m.icon;
  const color = isDark ? m.colorDark : m.colorLight;

  return (
    <div
      className="rcn-enter rcn-stat-pill"
      style={{
        ["--enter-delay" as string]: `${0.4 + 0.08 * i}s`,
        ["--pill-glow" as string]: `0 8px 28px rgba(${m.accent},${isDark ? 0.22 : 0.16}), inset 0 1px 0 rgba(255,255,255,${isDark ? 0.08 : 0.7})`,
        background: isDark
          ? `rgba(${m.accent},0.08)`
          : `rgba(${m.accent},0.06)`,
        border: `1px solid rgba(${m.accent},${isDark ? 0.28 : 0.22})`,
        borderRadius: 14,
        padding: "12px 18px",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: `0 4px 20px rgba(${m.accent},${isDark ? 0.12 : 0.08}), inset 0 1px 0 rgba(255,255,255,${isDark ? 0.05 : 0.6})`,
        cursor: "default",
      }}>
      <span
        style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: `rgba(${m.accent},${isDark ? 0.15 : 0.12})`,
          border: `1px solid rgba(${m.accent},${isDark ? 0.25 : 0.2})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
        <Icon style={{ width: 16, height: 16, color }} />
      </span>
      <div>
        <div
          style={{
            fontFamily: "'DM Mono', 'Fira Code', ui-monospace, monospace",
            fontSize: "1.2rem",
            fontWeight: 700,
            color,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}>
          <CountUp value={stat.value} decimals={stat.decimals} />
          <span style={{ fontSize: "0.78rem", marginLeft: 2, fontWeight: 600 }}>
            {stat.suffix}
          </span>
        </div>
        <div
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: isDark ? "rgba(160,200,175,0.6)" : "rgba(60,100,75,0.55)",
            marginTop: 2,
            fontWeight: 600,
          }}>
          {stat.label}
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const { lang } = useLanguage();

  const [isDark, setIsDark] = useState(true);
  // The globe is desktop-only decoration: mount it after first paint and
  // only when the viewport is wide enough to show it.
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    let timer = 0;
    const update = () => {
      window.clearTimeout(timer);
      if (!mq.matches) return setShowGlobe(false);
      timer = window.setTimeout(() => setShowGlobe(true), 600);
    };
    update();
    mq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      window.clearTimeout(timer);
    };
  }, []);

  // Detect system / class theme
  useEffect(() => {
    const check = () =>
      setIsDark(!document.documentElement.classList.contains("light"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  // ── Data ─────────────────────────────────────────────────────
  const statsData: StatItem[] = [
    { value: 500, decimals: 0, suffix: " Mbps", label: "Peak Speed" },
    { value: 99.7, decimals: 1, suffix: "%", label: "Network Uptime" },
    { value: 28, decimals: 0, suffix: "+", label: "Service Areas" },
  ];

  // ── Theme ─────────────────────────────────────────────────────
  const T = {
    bg: isDark ? "rgb(8,15,10)" : "rgb(242,252,246)",
    surface: isDark ? "rgba(13,26,16,0.8)" : "rgba(255,255,255,0.8)",
    badge_bg: isDark ? "rgba(16,185,129,0.1)" : "rgba(16,140,90,0.08)",
    badge_bd: isDark ? "rgba(16,185,129,0.3)" : "rgba(16,140,90,0.25)",
    badge_txt: isDark ? "rgb(52,211,153)" : "rgb(5,120,65)",
    h1: isDark ? "rgb(240,253,244)" : "rgb(10,40,22)",
    sub: isDark ? "rgba(187,247,208,0.75)" : "rgba(30,80,50,0.65)",
    loc: isDark ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.04)",
    loc_bd: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
    loc_txt: isDark ? "rgba(160,200,175,0.6)" : "rgba(40,90,60,0.55)",
    live_bg: isDark ? "rgba(8,18,11,0.8)" : "rgba(245,255,250,0.9)",
    live_bd: isDark ? "rgba(16,185,129,0.28)" : "rgba(16,140,90,0.28)",
    live_txt: isDark ? "rgb(220,252,231)" : "rgb(10,60,30)",
    glow: isDark ? "rgba(16,185,129,0.14)" : "rgba(16,140,90,0.1)",
    primary: isDark ? "rgb(16,185,129)" : "rgb(5,120,65)",
    cta_bg: isDark ? "rgba(16,185,129,0.14)" : "rgba(5,120,65,0.1)",
    cta_bd: isDark ? "rgba(16,185,129,0.45)" : "rgba(5,120,65,0.4)",
    cta2_bg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    cta2_bd: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
    cta2_txt: isDark ? "rgba(200,240,215,0.65)" : "rgba(30,70,45,0.6)",
    ghost_txt: isDark ? "rgba(160,200,175,0.5)" : "rgba(30,90,55,0.45)",
    legend_txt: isDark ? "rgba(150,185,165,0.55)" : "rgba(30,80,50,0.45)",
    node_hq: "#d4a853",
    node_net: isDark ? "#10b981" : "#059669",
    node_pkt: isDark ? "#86efac" : "#16a35a",
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "calc(100svh - 68px)",
        background: T.bg,
      }}>
      {/* ── Ambient background ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: isDark
            ? `radial-gradient(ellipse 60% 55% at 70% 45%, rgba(16,185,129,0.09) 0%, transparent 65%),
               radial-gradient(ellipse 40% 45% at 15% 75%, rgba(6,182,212,0.05) 0%, transparent 60%),
               radial-gradient(ellipse 50% 40% at 50% 0%, rgba(16,185,129,0.04) 0%, transparent 55%)`
            : `radial-gradient(ellipse 60% 55% at 70% 45%, rgba(16,140,90,0.08) 0%, transparent 65%),
               radial-gradient(ellipse 40% 45% at 15% 75%, rgba(6,182,212,0.04) 0%, transparent 60%),
               radial-gradient(ellipse 80% 50% at 50% -10%, rgba(16,140,90,0.06) 0%, transparent 55%)`,
        }}
      />

      {/* Subtle dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: isDark
            ? "radial-gradient(circle, rgba(16,185,129,0.08) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(16,140,90,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* ── Main content ── */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-300 items-center px-4 sm:px-6 lg:px-8"
        style={{ minHeight: "calc(100svh - 68px)" }}>
        <div className="grid w-full items-center gap-10 py-12 sm:py-16 min-[900px]:grid-cols-2 min-[900px]:gap-12 min-[900px]:py-20">
          {/* ── Left ── */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Eyebrow badge */}
            <div
              className="rcn-enter"
              style={{
                ["--enter-y" as string]: "-10px",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                alignSelf: "flex-start",
                background: T.badge_bg,
                border: `1px solid ${T.badge_bd}`,
                borderRadius: 9999,
                padding: "5px 16px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: T.primary,
                  boxShadow: `0 0 8px ${T.primary}`,
                  animation: "rcn-pulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  color: T.badge_txt,
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontFamily: "'DM Mono', ui-monospace, monospace",
                }}>
                Raghunathpur Cable Network — Est. 2010
              </span>
            </div>

            {/* H1 */}
            <div className="rcn-rise">
              <h1
                className="mt-5 font-bold leading-[1.05] tracking-tight"
                style={{
                  fontFamily: "var(--font-heading), ui-serif, Georgia, serif",
                  fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
                  color: "rgb(var(--text))",
                }}>
                {t(lang, "heroHeadlineA")}{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    fontFamily: "var(--font-heading), ui-serif, Georgia, serif",
                    background:
                      "linear-gradient(120deg, #00d4ff 0%, #4f8bff 50%, #39d98a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                  {t(lang, "heroHeadlineB")}
                </em>
              </h1>
            </div>

            {/* Divider line */}
            <div
              className="rcn-grow-x"
              style={{
                height: 2,
                width: 80,
                marginTop: 24,
                background: `linear-gradient(90deg, ${T.primary}, transparent)`,
                borderRadius: 2,
                transformOrigin: "left",
              }}
            />

            {/* Sub */}
            <p
              className="rcn-rise"
              style={{
                marginTop: 20,
                maxWidth: 460,
                fontSize: "1.06rem",
                lineHeight: 1.75,
                color: T.sub,
                fontFamily: "'DM Sans', 'Segoe UI', ui-sans-serif, system-ui",
              }}>
              High-speed broadband across the Madhesh Province. Blazing speeds,
              rock-solid reliability, and local 24/7 support — from Sabaila to
              the world.
            </p>

            {/* CTAs */}
            <div
              className="rcn-enter"
              style={{
                ["--enter-delay" as string]: "0.2s",
                marginTop: 32,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 12,
              }}>
              {/* Primary */}
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 26px",
                  borderRadius: 12,
                  background: T.cta_bg,
                  border: `1px solid ${T.cta_bd}`,
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  color: T.primary,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  fontFamily: "'DM Sans', ui-sans-serif, system-ui",
                  boxShadow: `0 0 24px rgba(16,185,129,0.18), inset 0 1px 0 rgba(255,255,255,${isDark ? 0.06 : 0.5})`,
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "translateY(-2px) scale(1.02)";
                  el.style.boxShadow = `0 0 40px rgba(16,185,129,0.35), inset 0 1px 0 rgba(255,255,255,${isDark ? 0.1 : 0.6})`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "translateY(0) scale(1)";
                  el.style.boxShadow = `0 0 24px rgba(16,185,129,0.18), inset 0 1px 0 rgba(255,255,255,${isDark ? 0.06 : 0.5})`;
                }}>
                Get Connected
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>

              {/* Secondary */}
              <Link
                href="/plans"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 26px",
                  borderRadius: 12,
                  background: T.cta2_bg,
                  border: `1px solid ${T.cta2_bd}`,
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  color: T.cta2_txt,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  fontFamily: "'DM Sans', ui-sans-serif, system-ui",
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,${isDark ? 0.04 : 0.5})`,
                  textDecoration: "none",
                  transition: "all 0.22s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "translateY(-2px)";
                  el.style.color = T.h1;
                  el.style.borderColor = isDark
                    ? "rgba(255,255,255,0.22)"
                    : "rgba(0,0,0,0.2)";
                  el.style.background = isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = "translateY(0)";
                  el.style.color = T.cta2_txt;
                  el.style.borderColor = T.cta2_bd;
                  el.style.background = T.cta2_bg;
                }}>
                View Plans
              </Link>

              {/* Ghost */}
              <Link
                href="/coverage"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: T.ghost_txt,
                  fontFamily: "'DM Sans', ui-sans-serif, system-ui",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    T.primary)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    T.ghost_txt)
                }>
                Check availability
                <ArrowRight style={{ width: 13, height: 13 }} />
              </Link>
            </div>

            {/* Location chip */}
            <div
              className="rcn-enter"
              style={{
                ["--enter-delay" as string]: "0.3s",
                ["--enter-y" as string]: "0px",
                marginTop: 20,
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                alignSelf: "flex-start",
                background: T.loc,
                border: `1px solid ${T.loc_bd}`,
                borderRadius: 9999,
                padding: "6px 14px",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}>
              <MapPin style={{ width: 13, height: 13, color: T.primary }} />
              <span
                style={{
                  fontSize: "0.75rem",
                  color: T.loc_txt,
                  fontFamily: "'DM Mono', ui-monospace, monospace",
                }}>
                Sabaila, Madhesh Province, Nepal
              </span>
            </div>

            {/* Stats */}
            <div
              style={{
                marginTop: 28,
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}>
              {statsData.map((s, i) => (
                <StatPill
                  key={i}
                  stat={s}
                  i={i}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>

          {/* ══════ RIGHT: GLOBE ══════ */}
          <div
            aria-hidden="true"
            className="rcn-enter hidden min-[900px]:flex flex-col items-center"
            style={{ ["--enter-delay" as string]: "0.15s" }}>
            {/* Live badge */}
            <div
              className="rcn-enter"
              style={{
                ["--enter-delay" as string]: "0.9s",
                ["--enter-y" as string]: "-10px",
                alignSelf: "flex-start",
                marginBottom: 16,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: T.live_bg,
                border: `1px solid ${T.live_bd}`,
                borderRadius: 10,
                padding: "8px 14px",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow: isDark
                  ? "0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)"
                  : "0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
              }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 8px #10b981",
                  animation: "rcn-pulse 1.8s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "0.73rem",
                  fontWeight: 700,
                  color: T.live_txt,
                  fontFamily: "'DM Mono', ui-monospace, monospace",
                  letterSpacing: "0.04em",
                }}>
                NETWORK LIVE — ALL OPERATIONAL
              </span>
              <span
                style={{
                  marginLeft: 2,
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: T.primary,
                  background: isDark
                    ? "rgba(16,185,129,0.12)"
                    : "rgba(5,120,65,0.1)",
                  border: `1px solid rgba(16,185,129,0.2)`,
                  borderRadius: 6,
                  padding: "1px 7px",
                }}>
                25+ nodes
              </span>
            </div>

            {/* Globe wrapper */}
            <div
              style={{
                position: "relative",
                width: "clamp(360px, 40vw, 460px)",
                height: "clamp(360px, 40vw, 460px)",
                animation: "heroFloat 5s ease-in-out infinite",
              }}>
              {/* Multi-layer glow rings */}
              <div
                style={{
                  position: "absolute",
                  inset: -16,
                  borderRadius: "50%",
                  background: isDark
                    ? "radial-gradient(circle, rgba(16,185,129,0.07) 50%, transparent 75%)"
                    : "radial-gradient(circle, rgba(16,140,90,0.06) 50%, transparent 75%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: -2,
                  borderRadius: "50%",
                  boxShadow: isDark
                    ? "0 0 0 1px rgba(16,185,129,0.18), 0 0 60px 8px rgba(16,185,129,0.1), 0 0 120px 24px rgba(16,185,129,0.05)"
                    : "0 0 0 1px rgba(16,140,90,0.15), 0 0 60px 8px rgba(16,140,90,0.08), 0 0 120px 24px rgba(16,140,90,0.04)",
                  pointerEvents: "none",
                }}
              />

              {/* Glass frame ring */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: isDark
                    ? "1px solid rgba(16,185,129,0.18)"
                    : "1px solid rgba(16,140,90,0.15)",
                  background: "transparent",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />

              {/* Canvas */}
              {showGlobe ? <GlobeCanvas isDark={isDark} /> : null}

              {/* HQ label */}
              <div
                className="rcn-enter"
                style={{
                  ["--enter-delay" as string]: "1.3s",
                  ["--enter-y" as string]: "0px",
                  position: "absolute",
                  top: "35%",
                  left: "60%",
                  background: isDark
                    ? "rgba(8,16,10,0.9)"
                    : "rgba(240,255,246,0.92)",
                  border: "1px solid rgba(212,168,83,0.5)",
                  borderRadius: 10,
                  padding: "7px 12px",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  whiteSpace: "nowrap",
                  zIndex: 10,
                  boxShadow:
                    "0 4px 20px rgba(212,168,83,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#d4a853",
                    boxShadow: "0 0 8px rgba(212,168,83,0.8)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#d4a853",
                    fontFamily: "'DM Mono', ui-monospace, monospace",
                    letterSpacing: "0.04em",
                  }}>
                  Sabaila HQ
                </span>
              </div>

              {/* Latency badge */}
              <div
                className="rcn-enter"
                style={{
                  ["--enter-delay" as string]: "1.5s",
                  ["--enter-y" as string]: "0px",
                  position: "absolute",
                  bottom: "22%",
                  left: "4%",
                  background: isDark
                    ? "rgba(6,18,22,0.9)"
                    : "rgba(235,252,255,0.92)",
                  border: "1px solid rgba(6,182,212,0.35)",
                  borderRadius: 10,
                  padding: "7px 12px",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  whiteSpace: "nowrap",
                  zIndex: 10,
                  boxShadow: "0 4px 20px rgba(6,182,212,0.12)",
                }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#06b6d4",
                    boxShadow: "0 0 8px rgba(6,182,212,0.8)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "#06b6d4",
                    fontFamily: "'DM Mono', ui-monospace, monospace",
                  }}>
                  &lt; 8ms latency
                </span>
              </div>
            </div>

            {/* Legend */}
            <div
              className="rcn-enter"
              style={{
                ["--enter-delay" as string]: "1.6s",
                ["--enter-y" as string]: "8px",
                marginTop: 18,
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}>
              {[
                { color: "#d4a853", label: "RCN HQ" },
                {
                  color: isDark ? "#10b981" : "#059669",
                  label: "Network nodes",
                },
                {
                  color: isDark ? "#86efac" : "#16a35a",
                  label: "Live packets",
                },
              ].map((l) => (
                <div
                  key={l.label}
                  style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: l.color,
                      boxShadow: `0 0 6px ${l.color}`,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.68rem",
                      color: T.legend_txt,
                      fontFamily: "'DM Mono', ui-monospace, monospace",
                      letterSpacing: "0.04em",
                    }}>
                    {l.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Float animation */}
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes rcnGrowX {
          from { transform: scaleX(0); opacity: 0; }
        }
        .rcn-grow-x {
          animation: rcnGrowX 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both;
        }
        .rcn-stat-pill { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .rcn-stat-pill:hover { transform: translateY(-3px); box-shadow: var(--pill-glow) !important; }
        @media (prefers-reduced-motion: reduce) {
          .rcn-grow-x { animation: none; }
        }
        @keyframes rcn-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }
      `}</style>
    </section>
  );
}

export default Hero;
