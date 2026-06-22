import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, EASE } from "../theme";
import { Background, rgba } from "../components/Background";
import { Grain, Vignette } from "../components/Grain";
import { Stage } from "../components/Stage";
import { Wordmark } from "../components/Wordmark";
import { Kicker } from "../components/AnimatedText";
import { eased, springScale } from "../animations";

/**
 * SCENE 1 — IMPACT (0–2s)
 * Black hold → a cold specular light sweeps across a brushed-inox slab → the
 * CASSELIN mark stamps in like a laser etch with a red index line. The job is
 * to assert "premium European industrial leader" in under two seconds.
 */
export const Scene01Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const blackout = interpolate(frame, [6, 16], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Specular highlight sweeping across the steel slab.
  const sweep = eased(frame, [8, 40], [-40, 140], EASE.expo); // % position
  const markScale = springScale(frame, fps, { delay: 16, from: 1.14, to: 1 });
  const markOpacity = eased(frame, [16, 26], [0, 1], EASE.expo);
  const lineW = eased(frame, [26, 44], [0, 360], EASE.expo);

  return (
    <AbsoluteFill>
      <Background tint="cold" intensity={0.9} />

      <Stage>
        {/* Brushed inox slab (macro) */}
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(115deg, ${rgba(COLORS.steelDark, 0.5)} 0%, ${rgba(
                COLORS.steelMid,
                0.32,
              )} 38%, ${rgba(COLORS.steel, 0.18)} 55%, ${rgba(COLORS.steelDark, 0.5)} 100%)`,
            }}
          />
          {/* hairline brushed texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `repeating-linear-gradient(112deg, ${rgba(
                COLORS.steelHi,
                0.04,
              )} 0px, ${rgba(COLORS.steelHi, 0.04)} 1px, transparent 1px, transparent 4px)`,
              opacity: 0.6,
            }}
          />
          {/* moving specular sweep */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(112deg, transparent ${sweep - 18}%, ${rgba(
                COLORS.coldBright,
                0.28,
              )} ${sweep}%, transparent ${sweep + 18}%)`,
            }}
          />
        </AbsoluteFill>

        {/* Brand stamp */}
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 38,
            transform: `scale(${markScale})`,
            opacity: markOpacity,
          }}
        >
          <Wordmark size={132} />
          <div
            style={{
              width: lineW,
              height: 4,
              borderRadius: 99,
              background: COLORS.red,
              boxShadow: `0 0 24px ${rgba(COLORS.red, 0.7)}`,
            }}
          />
          <div style={{ opacity: eased(frame, [34, 48], [0, 1], EASE.expo) }}>
            <Kicker text="Professional kitchen equipment" letterSpacing={8} />
          </div>
        </AbsoluteFill>

        <AbsoluteFill style={{ backgroundColor: "#000", opacity: blackout }} />
      </Stage>

      <Vignette strength={0.6} />
      <Grain />
    </AbsoluteFill>
  );
};
