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
import { BrowserFrame } from "../components/BrowserFrame";
import { Headline, Kicker } from "../components/AnimatedText";
import { eased, floaty, springScale } from "../animations";

/**
 * SCENE 4 — MAGIC AI (10–15s)
 * The reveal of value. Inside a real browser frame the site assembles itself
 * live: hero, imagery, copy and a brand palette materialize block-by-block with
 * a shimmer pass. A floating "AI" status chip narrates the work.
 */
export const Scene04MagicAI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelScale = springScale(frame, fps, { delay: 8, from: 0.9, to: 1 });
  const panelOp = eased(frame, [8, 22], [0, 1], EASE.expo);

  const progress = eased(frame, [24, 132], [0, 100], EASE.soft);

  const stages = ["Layout", "Imagery", "Copywriting", "Branding"];
  const activeStage = Math.min(
    stages.length - 1,
    Math.floor(interpolate(progress, [0, 100], [0, stages.length])),
  );

  return (
    <AbsoluteFill>
      <Background tint="brand" intensity={1} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 46,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Kicker text="Generating" delay={6} color={COLORS.violet} />
          <div style={{ height: 22 }} />
          <Headline text="Our AI builds everything for you." delay={10} size={74} maxWidth={780} />
        </div>

        <div style={{ transform: `scale(${panelScale})`, opacity: panelOp }}>
          <BrowserFrame url="yourbrand.com" accent={COLORS.violet} style={{ width: 860 }}>
            <GeneratingSite progress={progress} />
            {/* Shimmer sweep that follows the build */}
            <ShimmerSweep progress={progress} />
          </BrowserFrame>
        </div>

        {/* Floating AI status chip */}
        <FloatingStatus
          frame={frame}
          progress={progress}
          stage={stages[activeStage]}
        />
      </AbsoluteFill>

      <Vignette strength={0.5} />
      <Grain />
    </AbsoluteFill>
  );
};

const GeneratingSite: React.FC<{ progress: number }> = ({ progress }) => {
  // Each element reveals over its own slice of the 0–100 progress.
  const reveal = (start: number, end: number) =>
    interpolate(progress, [start, end], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const hero = reveal(4, 26);
  const headline = reveal(28, 44);
  const sub = reveal(40, 56);
  const cards = [reveal(54, 66), reveal(60, 72), reveal(66, 80)];
  const palette = reveal(82, 100);

  return (
    <div style={{ height: 720, padding: 30, display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Hero image */}
      <div
        style={{
          height: 280,
          borderRadius: 16,
          background: GRADIENTS.brand,
          opacity: 0.2 + hero * 0.8,
          transform: `scale(${0.98 + hero * 0.02})`,
          boxShadow: `inset 0 1px 0 ${COLORS.glassStrokeBright}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 80% at 30% 20%, rgba(255,255,255,0.35), transparent 60%)",
            opacity: hero,
          }}
        />
      </div>

      {/* Copy */}
      <Bar w={0.7} h={34} op={headline} bright />
      <Bar w={0.92} h={16} op={sub} />
      <Bar w={0.82} h={16} op={sub} />

      {/* Feature cards */}
      <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
        {cards.map((c, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 120,
              borderRadius: 12,
              background: rgba("#FFFFFF", 0.05),
              border: `1px solid ${COLORS.glassStroke}`,
              opacity: 0.2 + c * 0.8,
              transform: `translateY(${(1 - c) * 16}px)`,
              padding: 14,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: [COLORS.cyan, COLORS.violet, COLORS.pink][i],
                opacity: c,
              }}
            />
            <Bar w={0.8} h={10} op={c} />
            <Bar w={0.6} h={10} op={c} />
          </div>
        ))}
      </div>

      {/* Brand palette appears last */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 6, opacity: palette }}>
        <span style={{ fontFamily: FONT.family, color: COLORS.inkSoft, fontSize: 18 }}>
          Brand palette
        </span>
        {[COLORS.indigo, COLORS.violet, COLORS.cyan, COLORS.pink, COLORS.mint].map((c, i) => (
          <div
            key={c}
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: c,
              transform: `scale(${interpolate(palette, [i * 0.18, i * 0.18 + 0.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
              boxShadow: `0 0 16px ${rgba(c, 0.6)}`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Bar: React.FC<{ w: number; h: number; op: number; bright?: boolean }> = ({
  w,
  h,
  op,
  bright,
}) => (
  <div
    style={{
      width: `${w * 100}%`,
      height: h,
      borderRadius: h / 2,
      background: bright ? rgba("#FFFFFF", 0.85) : rgba("#FFFFFF", 0.22),
      opacity: op,
      transform: `translateX(${(1 - op) * -12}px)`,
    }}
  />
);

const ShimmerSweep: React.FC<{ progress: number }> = ({ progress }) => {
  const x = interpolate(progress, [0, 100], [-30, 130]);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(105deg, transparent ${x - 14}%, ${rgba("#FFFFFF", 0.12)} ${x}%, transparent ${x + 14}%)`,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
};

const FloatingStatus: React.FC<{ frame: number; progress: number; stage: string }> = ({
  frame,
  progress,
  stage,
}) => {
  const op = eased(frame, [20, 32], [0, 1], EASE.expo);
  return (
    <div
      style={{
        opacity: op,
        transform: `translateY(${floaty(frame, 6, 0.05)}px)`,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 26px",
        borderRadius: 99,
        background: rgba("#0A0C17", 0.7),
        border: `1px solid ${rgba(COLORS.violet, 0.4)}`,
        boxShadow: `0 0 50px ${rgba(COLORS.violet, 0.35)}`,
        backdropFilter: "blur(14px)",
        fontFamily: FONT.family,
      }}
    >
      <Spinner frame={frame} />
      <span style={{ color: COLORS.ink, fontSize: 26, fontWeight: 600 }}>
        {stage}…
      </span>
      <span style={{ color: COLORS.cyan, fontSize: 26, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
        {Math.round(progress)}%
      </span>
    </div>
  );
};

const Spinner: React.FC<{ frame: number }> = ({ frame }) => (
  <div
    style={{
      width: 26,
      height: 26,
      borderRadius: "50%",
      border: `3px solid ${rgba("#FFFFFF", 0.15)}`,
      borderTopColor: COLORS.cyan,
      transform: `rotate(${frame * 14}deg)`,
    }}
  />
);
