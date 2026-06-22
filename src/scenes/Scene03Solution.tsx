import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, EASE, FONT, GRADIENTS } from "../theme";
import { Background, rgba } from "../components/Background";
import { Grain, Vignette } from "../components/Grain";
import { GlassCard } from "../components/GlassCard";
import { Headline, Kicker } from "../components/AnimatedText";
import { eased, springScale } from "../animations";

/**
 * SCENE 3 — SOLUTION (5–10s)
 * A single, beautiful prompt field. The idea types itself in, a cursor blinks,
 * then the "Generate" button pulses with light as the user commits — the
 * emotional turn from "hard" to "effortless".
 */
export const Scene03Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const typed = "A premium studio for handmade ceramics";
  // Typewriter mapped across frames 30 → 96.
  const chars = Math.round(
    interpolate(frame, [30, 96], [0, typed.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: (t) => t, // typing reads better roughly linear, but we cut to it softly
    }),
  );
  const caretOn = Math.floor(frame / 8) % 2 === 0;

  const panelScale = springScale(frame, fps, { delay: 6, from: 0.92, to: 1 });
  const panelOp = eased(frame, [6, 22], [0, 1], EASE.expo);

  // Button "commit" pulse near the end of the scene.
  const press = eased(frame, [104, 112], [0, 1], EASE.soft);
  const pulse = Math.max(0, Math.sin(interpolate(frame, [108, 150], [0, Math.PI])));
  const buttonScale = 1 - press * 0.04 + pulse * 0.02;

  return (
    <AbsoluteFill>
      <Background tint="cool" intensity={0.9} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 56,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Kicker text="Step one" delay={8} />
          <div style={{ height: 24 }} />
          <Headline text="Just paste your idea or URL." delay={12} size={78} maxWidth={760} />
        </div>

        <div
          style={{
            transform: `scale(${panelScale})`,
            opacity: panelOp,
            width: 820,
          }}
        >
          <GlassCard
            style={{ padding: 32 }}
            glow={rgba(COLORS.cyan, 0.35 + pulse * 0.35)}
          >
            {/* Field */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                height: 96,
                padding: "0 26px",
                borderRadius: 18,
                background: rgba("#FFFFFF", 0.04),
                border: `1px solid ${rgba(COLORS.cyan, 0.25 + pulse * 0.4)}`,
                boxShadow: `inset 0 0 40px ${rgba(COLORS.cyan, 0.06 + pulse * 0.1)}`,
              }}
            >
              <SparkIcon color={COLORS.cyan} />
              <div
                style={{
                  fontFamily: FONT.family,
                  fontSize: 34,
                  color: COLORS.ink,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {typed.slice(0, chars)}
                <span
                  style={{
                    display: "inline-block",
                    width: 3,
                    height: 38,
                    transform: "translateY(6px)",
                    marginLeft: 4,
                    background: COLORS.cyan,
                    opacity: caretOn && chars < typed.length + 2 ? 1 : 0,
                    boxShadow: `0 0 12px ${COLORS.cyan}`,
                  }}
                />
              </div>
            </div>

            {/* Action row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 26,
              }}
            >
              <div style={{ display: "flex", gap: 12 }}>
                {["URL", "Idea", "Brand"].map((c, i) => (
                  <Chip key={c} label={c} active={i === 1} />
                ))}
              </div>

              <div
                style={{
                  transform: `scale(${buttonScale})`,
                  padding: "20px 38px",
                  borderRadius: 16,
                  background: GRADIENTS.brand,
                  color: "#fff",
                  fontFamily: FONT.family,
                  fontWeight: 700,
                  fontSize: 30,
                  letterSpacing: 0.2,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  boxShadow: `0 18px 50px ${rgba(COLORS.violet, 0.5)}, 0 0 ${40 + pulse * 60}px ${rgba(COLORS.cyan, 0.5 + pulse * 0.4)}`,
                }}
              >
                Generate
                <ArrowIcon />
              </div>
            </div>
          </GlassCard>
        </div>
      </AbsoluteFill>

      {/* Radial pulse of light on commit */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            width: 1200,
            height: 1200,
            borderRadius: "50%",
            border: `2px solid ${rgba(COLORS.cyan, 0.4)}`,
            transform: `scale(${0.3 + press * 1.1})`,
            opacity: press * (1 - press),
          }}
        />
      </AbsoluteFill>

      <Vignette strength={0.55} />
      <Grain />
    </AbsoluteFill>
  );
};

const Chip: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <div
    style={{
      padding: "12px 22px",
      borderRadius: 12,
      fontFamily: FONT.family,
      fontSize: 24,
      fontWeight: 600,
      color: active ? COLORS.ink : COLORS.inkSoft,
      background: active ? rgba(COLORS.cyan, 0.14) : rgba("#FFFFFF", 0.04),
      border: `1px solid ${active ? rgba(COLORS.cyan, 0.4) : COLORS.glassStroke}`,
    }}
  >
    {label}
  </div>
);

const SparkIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2l1.8 5.6L19.5 9l-5.7 1.4L12 16l-1.8-5.6L4.5 9l5.7-1.4L12 2z"
      fill={color}
      opacity={0.9}
    />
  </svg>
);

const ArrowIcon: React.FC = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
