/**
 * Central design system for the Casselin ad.
 *
 * Direction: industrial premium — brushed stainless steel, cold controlled
 * light, engineering-dashboard UI and a single precise Casselin red accent.
 * The reference register is Bosch Professional / Siemens industrial / premium
 * equipment campaigns. Every visual reads from these tokens so the whole film
 * keeps one coherent, leader-grade voice. No scene hardcodes a raw hex value.
 */

export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 900, // 30s
} as const;

/** 16:9 master — same timeline, adapted via the scaled Stage. */
export const VIDEO_WIDE = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 900,
} as const;

/** The fixed design canvas all scenes are composed on (9:16). */
export const STAGE = { width: 1080, height: 1920 } as const;

/**
 * Scene map — single source of truth for timings (in frames @30fps).
 * Each scene cross-fades into the next via a short overlap handled in Video.tsx.
 */
export const SCENES = {
  impact: { from: 0, duration: 60 }, //        0.0s –  2.0s — brand impact
  promise: { from: 60, duration: 90 }, //      2.0s –  5.0s — speed/reliability/performance
  solution: { from: 150, duration: 150 }, //   5.0s – 10.0s — everything your kitchen needs
  power: { from: 300, duration: 150 }, //     10.0s – 15.0s — designed for professionals
  ecosystem: { from: 450, duration: 150 }, // 15.0s – 20.0s — full range
  logistics: { from: 600, duration: 150 }, // 20.0s – 25.0s — stock / delivery / Europe
  brand: { from: 750, duration: 150 }, //     25.0s – 30.0s — brand ending
} as const;

export const COLORS = {
  // Deep cold graphite canvas — never pure #000 (reads cheap, kills the steel).
  base: "#070A0E",
  baseSoft: "#0E141C",
  panel: "#121A23",
  panelSoft: "#0C1119",

  ink: "#F2F6FC",
  inkSoft: "rgba(242, 246, 252, 0.66)",
  inkFaint: "rgba(242, 246, 252, 0.34)",

  // Brushed stainless steel ramp.
  steelHi: "#EEF2F7",
  steel: "#AEB9C7",
  steelMid: "#76828F",
  steelDark: "#39424E",
  steelLine: "rgba(174, 185, 199, 0.16)",

  // Real Casselin brand spectrum (sampled from the logo): tricolore blue + red.
  brandBlue: "#234E9E", // logo bracket blue
  brandRed: "#DD1232", //  logo bracket red

  // Accent glows (brighter, for light on the dark canvas). `cold`/`red` names
  // are kept so shared components keep reading the same tokens.
  cold: "#3E73D6", // brand blue, brightened for glow
  coldBright: "#5E92F0",
  red: "#DD1232", // brand red
  redBright: "#FF3350",

  glassFill: "rgba(255, 255, 255, 0.04)",
  glassStroke: "rgba(255, 255, 255, 0.10)",
  glassStrokeBright: "rgba(255, 255, 255, 0.24)",
} as const;

export const GRADIENTS = {
  // Vertical brushed-metal sweep used for steel surfaces and text.
  steel: `linear-gradient(180deg, ${COLORS.steelHi} 0%, ${COLORS.steel} 38%, ${COLORS.steelMid} 62%, ${COLORS.steelHi} 100%)`,
  steelEdge: `linear-gradient(120deg, ${COLORS.steelHi} 0%, ${COLORS.steelMid} 30%, ${COLORS.steelDark} 55%, ${COLORS.steel} 78%, ${COLORS.steelHi} 100%)`,
  cold: `linear-gradient(120deg, ${COLORS.coldBright} 0%, ${COLORS.cold} 100%)`,
  accent: `linear-gradient(120deg, ${COLORS.redBright} 0%, ${COLORS.red} 100%)`,
  // Tricolore brand sweep (blue → red) — a nod to the logo / "fabricant français".
  brand: `linear-gradient(120deg, ${COLORS.cold} 0%, ${COLORS.coldBright} 42%, ${COLORS.redBright} 100%)`,
  text: `linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.74) 100%)`,
  textSteel: `linear-gradient(180deg, ${COLORS.steelHi} 0%, ${COLORS.steel} 55%, ${COLORS.steelMid} 100%)`,
} as const;

/** Real brand image assets (in /public/brand). */
export const PHOTOS = {
  snack: "brand/univers-snack.jpg",
  preparation: "brand/univers-preparation.jpg",
  buffet: "brand/univers-buffet.jpg",
  froid: "brand/univers-froid.jpg",
  laverie: "brand/univers-laverie.jpg",
  hygiene: "brand/univers-hygiene.jpg",
  ligne600: "brand/univers-ligne600.jpg",
  ligne700: "brand/univers-ligne700.jpg",
  familial: "brand/univers-familial.jpg",
} as const;

export const LOGO = "brand/logo-white.png";

export const FONT = {
  family:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
} as const;

/**
 * Easing curves. We deliberately never use linear motion.
 * `expo` is the signature precise "settle" curve used across hero transitions.
 */
export const EASE = {
  expo: [0.16, 1, 0.3, 1] as const, // easeOutExpo — precise, premium settle
  soft: [0.22, 1, 0.36, 1] as const, // gentle deceleration
  inOut: [0.65, 0, 0.35, 1] as const, // balanced cut transitions
} as const;

/** Spring presets reused across scenes for consistent, engineered physicality. */
export const SPRING = {
  /** Confident hero entrance — minimal overshoot, fast settle. */
  hero: { damping: 18, mass: 0.9, stiffness: 120 },
  /** Weighty reveal for panels and machinery — feels like real mass. */
  panel: { damping: 24, mass: 1.2, stiffness: 88 },
  /** Snappy micro-interaction (chips, indicators, cursor). */
  snappy: { damping: 15, mass: 0.6, stiffness: 210 },
} as const;
