import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, EASE } from "../theme";
import { Background, rgba } from "../components/Background";
import { Grain, Vignette } from "../components/Grain";
import { Stage } from "../components/Stage";
import { Wordmark } from "../components/Wordmark";
import { Headline, Kicker } from "../components/AnimatedText";
import { eased, floaty, springScale } from "../animations";

/**
 * SCENE 7 — BRAND ENDING (25–30s)
 * "Casselin. Built for performance." The mark settles on a luminous industrial
 * field under a slow push-in, a red index line draws beneath it, the positioning
 * line resolves and the frame fades clean. The signature of a leader.
 */
export const Scene07Brand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const markScale = springScale(frame, fps, { delay: 6, from: 0.9, to: 1 });
  const push = eased(frame, [0, durationInFrames], [1.0, 1.05], EASE.soft);
  const lineW = eased(frame, [26, 50], [0, 420], EASE.expo);
  const bloom = 0.5 + Math.sin(frame * 0.06) * 0.1;

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 22, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <Background tint="cold" intensity={1.1} grid />
      <Stage>
        {/* central bloom */}
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              width: 1000,
              height: 1000,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${rgba(COLORS.cold, 0.22 * bloom)} 0%, transparent 62%)`,
              transform: `translateY(${floaty(frame, 8, 0.03)}px)`,
            }}
          />
        </AbsoluteFill>

        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 40,
            transform: `scale(${push})`,
          }}
        >
          <div style={{ transform: `scale(${markScale})`, opacity: eased(frame, [6, 18], [0, 1], EASE.expo) }}>
            <Wordmark size={150} />
          </div>

          <div
            style={{
              width: lineW,
              height: 4,
              borderRadius: 99,
              background: COLORS.red,
              boxShadow: `0 0 26px ${rgba(COLORS.red, 0.7)}`,
            }}
          />

          <Headline
            text="Built for performance."
            delay={30}
            size={76}
            tone="steel"
            maxWidth={820}
            style={{ marginTop: 8 }}
          />

          <div style={{ marginTop: 6 }}>
            <Kicker text="Professional kitchen equipment" delay={46} letterSpacing={8} />
          </div>
        </AbsoluteFill>
      </Stage>
      <Vignette strength={0.62} />
      <Grain />
    </AbsoluteFill>
  );
};
