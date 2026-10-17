# RCN website — audit & redesign notes

## 1. Audit findings (before the redesign)

Prioritised; ✅ = fixed in this redesign.

### Critical — credibility & correctness
- ✅ **Contradictory statistics.** Hero claimed 500 Mbps peak / 99.7 % uptime / 28+ areas; `data/business.ts` said 200 Mbps / 99.9 % / 25+; About hard-coded "14 yrs"; Coverage page had its own copies. All figures now come from `business.stats` / `business.plans`.
- ✅ **Fabricated live telemetry.** "Network live — all operational", "< 8 ms latency", "25+ nodes", pulsing "Live" badges and a globe with invented international exchange points (Tokyo, London, São Paulo…). Removed.
- ✅ **Content from another template.** About page mentioned *West Bengal*, *Digital India* and a non-existent "Raghunathpur district"; a team section listed placeholder staff with `#` links and an email on a different domain (`hello@raghunathpurcable.com`). Removed.
- ✅ **Two conflicting sets of plan benefits** (home vs `/plans`) and two yearly-price conventions. Unified into `business.plans` with derived yearly maths.
- ✅ **Fake language switch.** "NP" toggle showed identical English copy and could set `<html lang="ne">` on English content. Removed (re-add when real Nepali copy exists).

### High — UX, accessibility, engineering
- ✅ Hero/page text hidden until JavaScript hydrated (framer-motion `opacity: 0`) → slow LCP.
- ✅ Desktop globe canvas animated every frame on mobile while hidden; About loaded three.js + drei on page load.
- ✅ Mobile menu had no focus management or Esc handling.
- ✅ FAQ answers missing from the HTML until opened (not crawlable); tab-based categories.
- ✅ Duplicate contact details hard-coded across pages; dead `#` links.
- ✅ Unused dependencies: antd, @ant-design/nextjs-registry, ogl, postprocessing, @radix-ui/react-accordion, framer-motion, @react-three/drei.
- ✅ Contrast failures on secondary text; invalid `aria-label` on plain spans; heading-order issues.
- ✅ Whole pages were Client Components (large hydration cost).

### Medium — design
- ✅ Inconsistent radii, glassmorphism and glow on every card, many pill buttons, mixed hard-coded hex colours, three display fonts.

## 2. Design system

Defined in `app/globals.css`.

| Token group | Notes |
|---|---|
| Colour | `--bg`, `--surface(-2/-3)`, `--line(-strong)`, `--fg(-muted/-subtle)`, `--signal` (fiber green), `--pulse` (HQ amber). Dark is default; `.light` redefines the same tokens. All text pairs meet WCAG AA. Exposed to Tailwind as `bg-surface`, `text-fg-muted`, `border-line`, `text-signal`, … |
| Type | Geist (variable) for UI and display, Geist Mono for labels and figures, Instrument Serif *italic* for one accent word per headline. Scale: `.t-display`, `.t-h1`, `.t-h2`, `.t-h3`, `.t-lead`, `.eyebrow`. |
| Space | `--gutter`, `--container` (1200px), `--section-y`, `--header-h`. |
| Radii | 6 / 10 / 16 / 24 px (`--radius-sm…xl`). |
| Motion | `--ease-out-quart`, `--ease-out-expo`, `--ease-in-out-cubic`; durations 120 / 200 / 400 / 800 ms; stagger 70 ms. |
| Breakpoints | Tailwind defaults: sm 640 · md 768 · lg 1024 · xl 1280. |

Components: `.btn` (+ `-primary`, `-secondary`, `-ghost`, `-sm`, `aria-busy` loading state), `.card` / `.card-interactive`, `.icon-tile`, `.chip`, `.input`, `.field-*`, `.faq-item`, `.billing-switch`, `.nav-link`, `.mobile-menu`.

## 3. Motion principles
- **Entrance**: `.mask-line` headline lines slide up behind a clip; `.enter` fades and slides supporting content in with `--d` delays. Large text uses `.enter-rise` (slide only) so it paints on the first frame.
- **Scroll**: `<Reveal>` toggles `[data-reveal]`; children with `stagger(i)` cascade. CSS only; IntersectionObserver flips the state.
- **Light flow**: `.flow` (SVG stroke-dash pulses) and `.step-light` represent signal travelling along fiber. Paused off-screen (`.paused`).
- Everything respects `prefers-reduced-motion`, and content is visible without JavaScript (`<noscript>` override).
- No GSAP/Lenis: the sequences are short and CSS-driven, so an extra animation runtime isn't justified.

## 4. Hero 3D scene
`components/hero/`: fibers fan out from the amber core (Sabaila HQ) to the homes it serves.
- `fiber-geometry.ts`: shared, deterministic geometry.
- `fiber-poster.tsx`: server-rendered SVG version. Instant paint, the mobile visual, and the fallback for reduced motion, no WebGL and no JS.
- `fiber-scene.tsx`: React Three Fiber, custom shader (guided glow plus travelling pulse with exponential trail), additive light in dark theme, ink strokes in light theme, pointer parallax, scroll drift, staggered draw-in. Disposes geometry, materials and textures; render loop stops off-screen; handles WebGL context loss.
- `hero-visual.tsx`: loads the scene only on ≥1024 px, non-reduced-motion, non-Save-Data devices with ≥4 cores and ≥4 GB, after the first interaction (or 5.5 s), then cross-fades it over the poster.

## 5. Content the business should confirm
- `business.stats`: **10,000+ customers** and **25+ areas** (carried over from the previous site). The 99.9 % uptime figure is no longer displayed.
- `business.serviceAreas`: the published list of served and expanding areas.
- Plan benefits (e.g. "Static IP included" on Premium, "Cable TV bundle included").
- Real milestones, team members and social links, if they should be added back.
- Nepali translations, if a language switch is wanted.
