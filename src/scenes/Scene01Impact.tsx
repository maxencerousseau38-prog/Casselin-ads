import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, EASE, GRADIENTS, PHOTOS } from "../theme";
import { rgba } from "../components/Background";
import { Grain, Vignette } from "../components/Grain";
import { Stage } from "../components/Stage";
import { Photo } from "../components/Photo";
import { Wordmark } from "../components/Wordmark";
import { Kicker } from "../components/AnimatedText";
import { eased, springScale } from "../animations";

/**
 * SCENE 1 — IMPACT (0–2s)
 * Black hold → a real Casselin pro kitchen (Ligne 700 range, signature red
 * knobs) pushes in under a cold specular sweep → the official logo stamps in
 * with a tricolore underline. Asserts "premium French industrial leader" in 2s.
 */
export const Scene01Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const blackout = interpolate(frame, [6, 18], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sweep = eased(frame, [8, 42], [-30, 140], EASE.expo);
  const markScale = springScale(frame, fps, { delay: 16, from: 1.12, to: 1 });
  const markOpacity = eased(frame, [16, 28], [0, 1], EASE.expo);
  const lineW = eased(frame, [28, 48], [0, 420], EASE.expo);

  return (
    <AbsoluteFill>
      <Stage>
        {/* Real kitchen, darkened */}
        <AbsoluteFill>
          <Photo src={PHOTOS.ligne700} zoom={1.18} span={70} grade={1.2} />
          <AbsoluteFill style={{ background: rgba(COLORS.base, 0.5) }} />
        </AbsoluteFill>

        {/* cold specular sweep */}
        <AbsoluteFill
          style={{
            background: `linear-gradient(112deg, transparent ${sweep - 16}%, ${rgba(
              COLORS.coldBright,
              0.22,
            )} ${sweep}%, transparent ${sweep + 16}%)`,
          }}
        />

        {/* Brand stamp */}
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 40,
            transform: `scale(${markScale})`,
            opacity: markOpacity,
          }}
        >
          <Wordmark width={760} />
          <div
            style={{
              width: lineW,
              height: 5,
              borderRadius: 99,
              background: GRADIENTS.brand,
              boxShadow: `0 0 24px ${rgba(COLORS.cold, 0.6)}`,
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
