import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, EASE, FONT } from "../theme";
import { Background, rgba } from "../components/Background";
import { Grain, Vignette } from "../components/Grain";
import { GlassCard } from "../components/GlassCard";
import { Headline } from "../components/AnimatedText";
import { eased, floaty, springScale } from "../animations";

/**
 * SCENE 2 — PROBLEM (2–5s)
 * Controlled chaos: scattered, slightly tilted tool panels (design / code /
 * no-code) crowd the frame and jitter. Three friction words punch in on cuts:
 * "Slow." "Expensive." "Complicated." Then it all collapses away.
 */
export const Scene02Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Everything crowds in, then implodes at the end (hand-off to solution).
  const collapse = eased(frame, [74, 88], [0, 1], EASE.inOut);

  const panels = [
    { label: "design.fig", x: -300, y: -380, rot: -8, tint: COLORS.pink, lines: 5 },
    { label: "index.tsx", x: 300, y: -300, rot: 7, tint: COLORS.cyan, lines: 7, code: true },
    { label: "builder.app", x: -330, y: 260, rot: 6, tint: COLORS.violet, lines: 4 },
    { label: "styles.css", x: 320, y: 320, rot: -6, tint: COLORS.indigo, lines: 6, code: true },
  ];

  return (
    <AbsoluteFill>
      <Background tint="warm" intensity={0.7} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${1 - collapse * 0.18})`,
          opacity: 1 - collapse,
          filter: `blur(${collapse * 10}px)`,
        }}
      >
        {panels.map((p, i) => (
          <ChaosPanel key={p.label} {...p} index={i} fps={fps} />
        ))}
      </AbsoluteFill>

      {/* Friction words, hard cuts */}
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Sequence from={4} durationInFrames={28} layout="none">
          <FrictionWord text="Slow." color={COLORS.pink} />
        </Sequence>
        <Sequence from={30} durationInFrames={26} layout="none">
          <FrictionWord text="Expensive." color={COLORS.violet} />
        </Sequence>
        <Sequence from={54} durationInFrames={30} layout="none">
          <FrictionWord text="Complicated." color={COLORS.cyan} />
        </Sequence>
      </AbsoluteFill>

      {/* Quiet subtitle reinforcing the line from the brief */}
      <AbsoluteFill
        style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 240 }}
      >
        <div style={{ opacity: 1 - collapse }}>
          <Headline
            text="Designing websites is slow, expensive, complicated."
            delay={2}
            size={50}
            weight={600}
            stagger={1.5}
            maxWidth={760}
            style={{ color: COLORS.inkSoft }}
          />
        </div>
      </AbsoluteFill>

      <Vignette strength={0.6} />
      <Grain />
    </AbsoluteFill>
  );
};

const ChaosPanel: React.FC<{
  label: string;
  x: number;
  y: number;
  rot: number;
  tint: string;
  lines: number;
  index: number;
  fps: number;
  code?: boolean;
}> = ({ label, x, y, rot, tint, lines, index, fps, code }) => {
  const frame = useCurrentFrame();
  const s = springScale(frame, fps, { delay: index * 4, from: 0.6, to: 1 });
  const op = eased(frame, [index * 4, index * 4 + 14], [0, 1], EASE.expo);
  const wob = floaty(frame, 5, 0.06, index);

  return (
    <div
      style={{
        position: "absolute",
        transform: `translate(${x}px, ${y + wob}px) rotate(${rot}deg) scale(${s})`,
        opacity: op,
      }}
    >
      <GlassCard style={{ width: 300, padding: 20 }} glow={rgba(tint, 0.25)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
            color: COLORS.inkSoft,
            fontFamily: FONT.family,
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 99,
              background: tint,
              boxShadow: `0 0 10px ${tint}`,
            }}
          />
          {label}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 12,
                width: `${(code ? 40 + ((i * 37) % 55) : 50 + ((i * 23) % 45))}%`,
                marginLeft: code ? (i % 3) * 16 : 0,
                borderRadius: 6,
                background: code ? rgba(tint, 0.6) : rgba("#FFFFFF", 0.14),
              }}
            />
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

const FrictionWord: React.FC<{ text: string; color: string }> = ({
  text,
  color,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 8], [1.25, 1], {
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 4),
  });
  const op = interpolate(frame, [0, 5, 20, 26], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        fontFamily: FONT.family,
        fontWeight: 800,
        fontSize: 130,
        letterSpacing: -3,
        color: COLORS.ink,
        opacity: op,
        transform: `scale(${scale})`,
        textShadow: `0 0 60px ${rgba(color, 0.8)}`,
      }}
    >
      {text}
    </div>
  );
};
