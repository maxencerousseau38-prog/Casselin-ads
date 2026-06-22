/**
 * Central design system for the ad.
 *
 * Everything visual references these tokens so the whole film keeps a single,
 * cohesive, Apple-keynote-grade look. No scene hardcodes a raw hex value.
 */

export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 900, // 30s
} as const;

/**
 * Scene map — single source of truth for timings (in frames @30fps).
 * Each scene cross-fades into the next via a short overlap handled in Video.tsx.
 */
export const SCENES = {
  hook: { from: 0, duration: 60 }, //        0.0s –  2.0s
  problem: { from: 60, duration: 90 }, //     2.0s –  5.0s
  solution: { from: 150, duration: 150 }, //  5.0s – 10.0s
  magic: { from: 300, duration: 150 }, //    10.0s – 15.0s
  result: { from: 450, duration: 150 }, //   15.0s – 20.0s
  emotion: { from: 600, duration: 150 }, //  20.0s – 25.0s
  cta: { from: 750, duration: 150 }, //      25.0s – 30.0s
} as const;

export const COLORS = {
  // Deep, slightly blue-black canvas — never pure #000 (feels cheap on OLED).
  base: "#05060B",
  baseSoft: "#0A0C17",
  ink: "#F6F8FF",
  inkSoft: "rgba(246, 248, 255, 0.62)",
  inkFaint: "rgba(246, 248, 255, 0.30)",

  // Premium brand spectrum: indigo → violet → cyan with a warm pink accent.
  indigo: "#6366F1",
  violet: "#8B5CF6",
  cyan: "#22D3EE",
  pink: "#F472B6",
  mint: "#34E5C0",

  glassFill: "rgba(255, 255, 255, 0.045)",
  glassStroke: "rgba(255, 255, 255, 0.12)",
  glassStrokeBright: "rgba(255, 255, 255, 0.28)",
} as const;

export const GRADIENTS = {
  brand: `linear-gradient(120deg, ${COLORS.indigo} 0%, ${COLORS.violet} 45%, ${COLORS.cyan} 100%)`,
  brandSoft: `linear-gradient(120deg, ${COLORS.violet} 0%, ${COLORS.cyan} 100%)`,
  warm: `linear-gradient(120deg, ${COLORS.pink} 0%, ${COLORS.violet} 60%, ${COLORS.indigo} 100%)`,
  text: `linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.72) 100%)`,
} as const;

export const FONT = {
  family:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
} as const;

/**
 * Easing curves. We deliberately never use linear motion.
 * `expo` is the signature "settle" curve used across hero transitions.
 */
export const EASE = {
  expo: [0.16, 1, 0.3, 1] as const, // easeOutExpo — smooth, premium settle
  soft: [0.22, 1, 0.36, 1] as const, // gentle deceleration
  inOut: [0.65, 0, 0.35, 1] as const, // balanced cut transitions
} as const;

/** Spring presets reused across scenes for consistent physicality. */
export const SPRING = {
  /** Confident hero entrance — minimal overshoot, fast settle. */
  hero: { damping: 18, mass: 0.9, stiffness: 120 },
  /** Soft, weighty reveal for cards and panels. */
  panel: { damping: 22, mass: 1.1, stiffness: 90 },
  /** Snappy micro-interaction (buttons, chips, cursor). */
  snappy: { damping: 14, mass: 0.6, stiffness: 200 },
} as const;
