import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, EASE, GRADIENTS } from "../theme";
import { Background, rgba } from "../components/Background";
import { Grain, Vignette } from "../components/Grain";
import { GlassCard } from "../components/GlassCard";
import { Headline } from "../components/AnimatedText";
import { eased, springScale } from "../animations";

/**
 * SCENE 1 — HOOK (0–2s)
 * Black → a beam of light splits the screen → a futuristic UI snaps in with a
 * brief chromatic glitch and "builds" itself. Headline assembles instantly.
 * The whole job is to earn the next 28 seconds in under 3.
 */
export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Black hold → light beam reveal.
  const beam = eased(frame, [2, 12], [0, 1], EASE.expo);
  const beamWidth = eased(frame, [6, 22], [0.2, 140], EASE.expo); // vw
  const blackout = interpolate(frame, [10, 18], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glitch window (short, around the UI snap-in).
  const glitch = frame >= 14 && frame <= 22;
  const jitter = glitch ? (random(`g-${frame}`) - 0.5) * 10 : 0;
  const rgbSplit = glitch ? 6 : 0;

  const uiScale = springScale(frame, fps, {
    delay: 16,
    from: 0.86,
    to: 1,
  });
  const uiOpacity = eased(frame, [16, 26], [0, 1], EASE.expo);

  // "Build" progress sweeping across the mock site blocks.
  const build = eased(frame, [20, 44], [0, 1], EASE.soft);

  return (
    <AbsoluteFill>
      <Background tint="brand" intensity={1.05} />

      {/* Futuristic UI mock that snaps in */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: uiOpacity,
          transform: `translateX(${jitter}px) scale(${uiScale})`,
        }}
      >
        <div style={{ position: "relative", filter: glitch ? "saturate(1.4)" : "none" }}>
          {/* chromatic aberration ghosts during glitch */}
          {rgbSplit > 0 && (
            <>
              <MockUI build={build} tint={rgba(COLORS.cyan, 0.5)} offset={-rgbSplit} />
              <MockUI build={build} tint={rgba(COLORS.pink, 0.5)} offset={rgbSplit} />
            </>
          )}
          <MockUI build={build} />
        </div>
      </AbsoluteFill>

      {/* Headline */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 360,
        }}
      >
        <Headline
          text="Build a premium website in seconds."
          delay={20}
          size={92}
          stagger={3}
          gradient
          maxWidth={840}
        />
      </AbsoluteFill>

      {/* Light beam sweep */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            width: `${beamWidth}vw`,
            height: 3,
            background: GRADIENTS.brand,
            opacity: beam * (1 - build),
            filter: "blur(1px)",
            boxShadow: `0 0 40px ${COLORS.cyan}, 0 0 80px ${COLORS.violet}`,
          }}
        />
      </AbsoluteFill>

      {/* Initial blackout */}
      <AbsoluteFill style={{ backgroundColor: "#000", opacity: blackout }} />

      <Vignette strength={0.5} />
      <Grain />
    </AbsoluteFill>
  );
};

/** Minimal "site being built" wireframe → fills with brand gradient blocks. */
const MockUI: React.FC<{ build: number; tint?: string; offset?: number }> = ({
  build,
  tint,
  offset = 0,
}) => {
  const blocks = [
    { h: 64, w: 0.5 },
    { h: 240, w: 1 },
    { h: 40, w: 0.8 },
    { h: 40, w: 0.65 },
  ];
  return (
    <div
      style={{
        position: offset ? "absolute" : "relative",
        inset: 0,
        transform: `translateX(${offset}px)`,
        mixBlendMode: offset ? "screen" : "normal",
      }}
    >
      <GlassCard
        style={{ width: 560, padding: 34 }}
        glow={rgba(COLORS.violet, 0.35)}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {blocks.map((b, i) => {
            const local = interpolate(build, [i * 0.18, i * 0.18 + 0.5], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={i}
                style={{
                  height: b.h,
                  width: `${b.w * 100}%`,
                  borderRadius: 14,
                  background:
                    tint ??
                    `linear-gradient(120deg, ${rgba(COLORS.indigo, 0.85)}, ${rgba(
                      COLORS.cyan,
                      0.7,
                    )})`,
                  opacity: 0.25 + local * 0.75,
                  transform: `translateY(${(1 - local) * 14}px)`,
                  boxShadow: `inset 0 1px 0 ${COLORS.glassStrokeBright}`,
                }}
              />
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};
