"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

import { CORE, STRANDS, type Strand } from "@/components/hero/fiber-geometry";

/* ── Shaders ──────────────────────────────────────────────────────────────
   Each fiber is a thin tube. Light is computed per fragment along the tube's
   length (uv.x: 0 at the core → 1 at the home): a dim guided glow plus a
   pulse with an exponential trail, like light travelling through glass.  */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uOffset;
  uniform float uReveal;
  uniform float uOpacity;
  uniform float uPulses;
  uniform vec3 uColor;
  uniform vec3 uPulseColor;
  varying vec2 vUv;

  void main() {
    float u = vUv.x;
    if (u > uReveal) discard;

    float head = fract(uTime * uSpeed + uOffset);
    float behind = head - u;
    float trail = behind >= 0.0 ? exp(-behind * 16.0) : 0.0;
    float spark = exp(-pow((u - head) * 70.0, 2.0));

    float guided = 0.16 + 0.3 * pow(1.0 - u, 2.0);
    float edge = smoothstep(0.0, 0.03, uReveal - u); // soft reveal front

    vec3 color = uColor * guided + uPulseColor * (trail * 0.8 + spark * 1.8) * uPulses;
    float alpha = (guided + (trail * 0.75 + spark) * uPulses) * uOpacity * edge;
    gl_FragColor = vec4(color, alpha);
  }
`;

type Palette = {
  signal: THREE.Color;
  pulse: THREE.Color;
  core: THREE.Color;
  spark: THREE.Color;
  blending: THREE.Blending;
};

// Additive light glows on the dark theme; on the light theme the same
// composition is drawn as ink-like strokes with normal blending.
const PALETTES: Record<"dark" | "light", Palette> = {
  dark: {
    signal: new THREE.Color("#3ddc9b"),
    pulse: new THREE.Color("#d9fff0"),
    core: new THREE.Color("#f2b65a"),
    spark: new THREE.Color("#fff3da"),
    blending: THREE.AdditiveBlending,
  },
  light: {
    signal: new THREE.Color("#0a8a5e"),
    pulse: new THREE.Color("#06704c"),
    core: new THREE.Color("#c27a12"),
    spark: new THREE.Color("#9a5a00"),
    blending: THREE.NormalBlending,
  },
};

function useTheme(): "dark" | "light" {
  const [theme, setTheme] = React.useState<"dark" | "light">(() =>
    document.documentElement.classList.contains("light") ? "light" : "dark",
  );
  React.useEffect(() => {
    const html = document.documentElement;
    const obs = new MutationObserver(() =>
      setTheme(html.classList.contains("light") ? "light" : "dark"),
    );
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return theme;
}

function makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.2, "rgba(255,255,255,0.45)");
  g.addColorStop(0.55, "rgba(255,255,255,0.08)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);

/* ── One fiber + the home it reaches ──────────────────────────────────── */

function Fiber({
  strand,
  index,
  glow,
  palette,
}: {
  strand: Strand;
  index: number;
  glow: THREE.Texture;
  palette: Palette;
}) {
  const front = strand.layer === "front";

  const geometry = React.useMemo(() => {
    const [a, b, c, d] = strand.points.map((p) => new THREE.Vector3(...p));
    const curve = new THREE.CubicBezierCurve3(a, b, c, d);
    return new THREE.TubeGeometry(curve, 140, front ? 0.011 : 0.007, 5, false);
  }, [strand, front]);

  const material = React.useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: palette.blending,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: strand.speed },
          uOffset: { value: strand.offset },
          uReveal: { value: 0 },
          uOpacity: { value: front ? 1 : 0.45 },
          uPulses: { value: front ? 1 : 0.35 },
          uColor: { value: palette.signal },
          uPulseColor: { value: palette.pulse },
        },
      }),
    [strand, front, palette],
  );

  const mesh = React.useRef<THREE.Mesh>(null);
  const home = React.useRef<THREE.Sprite>(null);
  const end = strand.points[3];

  React.useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const uniforms = (mesh.current?.material as THREE.ShaderMaterial | undefined)
      ?.uniforms;
    // Staggered entrance: each fiber draws out from the core.
    const reveal = easeOutCubic((t - 0.35 - index * 0.045) / 1.6) * 1.04;
    if (uniforms) {
      uniforms.uTime.value = t;
      uniforms.uReveal.value = reveal;
    }

    if (home.current) {
      // The home brightens as a pulse arrives.
      const head = (t * strand.speed + strand.offset) % 1;
      const arrival = Math.max(0, 1 - Math.abs(head - 0.985) / 0.07);
      const base = front ? 0.32 : 0.12;
      const s = (front ? 0.22 : 0.1) * (1 + arrival * 0.9) * Math.min(reveal, 1);
      home.current.scale.setScalar(s);
      (home.current.material as THREE.SpriteMaterial).opacity =
        (base + arrival * 0.6) * Math.min(reveal, 1);
    }
  });

  return (
    <group>
      <mesh ref={mesh} geometry={geometry} material={material} />
      <sprite ref={home} position={end} scale={0}>
        <spriteMaterial
          map={glow}
          color={palette.signal}
          transparent
          depthWrite={false}
          blending={palette.blending}
          opacity={0}
        />
      </sprite>
    </group>
  );
}

/* ── The core (RCN HQ) ────────────────────────────────────────────────── */

function Core({ glow, palette }: { glow: THREE.Texture; palette: Palette }) {
  const halo = React.useRef<THREE.Sprite>(null);
  const point = React.useRef<THREE.Sprite>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const intro = easeOutCubic(t / 1.1);
    const breathe = 1 + Math.sin(t * 1.4) * 0.05;
    halo.current?.scale.setScalar(2.4 * intro * breathe);
    point.current?.scale.setScalar(0.42 * intro);
  });

  return (
    <group position={CORE}>
      <sprite ref={halo} scale={0}>
        <spriteMaterial
          map={glow}
          color={palette.core}
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={palette.blending}
        />
      </sprite>
      <sprite ref={point} scale={0}>
        <spriteMaterial
          map={glow}
          color={palette.spark}
          transparent
          depthWrite={false}
          blending={palette.blending}
        />
      </sprite>
    </group>
  );
}

/* ── Camera: entrance dolly, pointer parallax, scroll drift ───────────── */

function CameraRig() {
  const pointer = React.useRef({ x: 0, y: 0 });
  const look = React.useMemo(() => new THREE.Vector3(0, -0.1, 0), []);

  React.useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock, camera }, delta) => {
    const intro = easeOutCubic(clock.elapsedTime / 2.2);
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    const k = 1 - Math.pow(0.04, delta); // frame-rate independent smoothing
    const tx = pointer.current.x * 0.45;
    const ty = -pointer.current.y * 0.3 + scroll * 0.6;
    camera.position.x += (tx - camera.position.x) * k;
    camera.position.y += (ty - camera.position.y) * k;
    camera.position.z = 8.2 - intro * 1.2 + scroll * 0.8;
    camera.lookAt(look);
  });

  return null;
}

/** Signals readiness after the first frames have rendered. */
function ReadySignal({ onReady }: { onReady: () => void }) {
  const frames = React.useRef(0);
  const done = React.useRef(false);
  useFrame(() => {
    if (done.current) return;
    if (++frames.current >= 3) {
      done.current = true;
      onReady();
    }
  });
  return null;
}

function Scene({ onReady }: { onReady: () => void }) {
  const glow = React.useMemo(() => makeGlowTexture(), []);
  React.useEffect(() => () => glow.dispose(), [glow]);
  const palette = PALETTES[useTheme()];

  return (
    <>
      <CameraRig />
      {STRANDS.map((s, i) => (
        <Fiber key={i} strand={s} index={i} glow={glow} palette={palette} />
      ))}
      <Core glow={glow} palette={palette} />
      <ReadySignal onReady={onReady} />
    </>
  );
}

export default function FiberScene({
  active,
  onReady,
  onError,
}: {
  /** Render loop runs only while the hero is on screen. */
  active: boolean;
  onReady: () => void;
  onError: () => void;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8.2], fov: 40, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onError();
        });
      }}
      fallback={null}
      aria-hidden="true">
      <Scene onReady={onReady} />
    </Canvas>
  );
}
