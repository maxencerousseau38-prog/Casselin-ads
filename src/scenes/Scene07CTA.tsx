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
import { Headline } from "../components/AnimatedText";
import { eased, floaty, springScale } from "../animations";

/**
 * SCENE 7 — CTA (25–30s)
 * The close. Brand lockup, a confident headline, and one luminous CTA button on
 * a living gradient. A cursor glides in and "clicks" — the last micro-interaction
 * that invites the viewer to do the same.
 */
export const Scene07CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoOp = eased(frame, [4, 18], [0, 1], EASE.expo);
  const logoY = springScale(frame, fps, { delay: 4, from: 0.9, to: 1 });

  const btnScale = springScale(frame, fps, { delay: 30, from: 0.85, to: 1 });
  const btnOp = eased(frame, [30, 44], [0, 1], EASE.expo);

  // Cursor approaches and clicks around frame 96.
  const cursorX = eased(frame, [70, 96], [260, 0], EASE.expo);
  const cursorY = eased(frame, [70, 96], [220, 0], EASE.expo);
  const click = frame >= 96 && frame <= 104;
  const press = click ? 0.95 : 1;
  const ring = eased(frame, [96, 124], [0, 1], EASE.expo);

  // Breathing glow on the button.
  const breathe = 0.5 + 0.5 * Math.sin(frame * 0.12);

  return (
    <AbsoluteFill>
      <Background tint="brand" intensity={1.15} />
      {/* Animated gradient sheen drifting behind everything */}
      <AbsoluteFill
        style={{
          background: GRADIENTS.brand,
          opacity: 0.12,
          transform: `translateX(${floaty(frame, 40, 0.02)}px) scale(1.4)`,
          filter: "blur(40px)",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 56,
        }}
      >
        {/* Brand lockup */}
        <div
          style={{
            opacity: logoOp,
            transform: `scale(${logoY})`,
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <LogoMark frame={frame} />
          <span style={{ fontFamily: FONT.family, fontWeight: 800, fontSize: 46, color: COLORS.ink, letterSpacing: -1 }}>
            Casselin
          </span>
        </div>

        <div style={{ textAlign: "center" }}>
          <Headline text="Create your website in seconds." delay={12} size={90} maxWidth={840} gradient />
          <div style={{ height: 22 }} />
          <div
            style={{
              ...fadeSub(frame),
              fontFamily: FONT.family,
              fontSize: 34,
              color: COLORS.inkSoft,
              fontWeight: 500,
            }}
          >
            Start now — no code, no agency, no limits.
          </div>
        </div>

        {/* CTA button + cursor */}
        <div style={{ position: "relative", transform: `scale(${btnScale})`, opacity: btnOp }}>
          <div
            style={{
              transform: `scale(${press})`,
              padding: "30px 64px",
              borderRadius: 22,
              background: GRADIENTS.brand,
              color: "#fff",
              fontFamily: FONT.family,
              fontWeight: 800,
              fontSize: 40,
              letterSpacing: 0.2,
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: `0 24px 70px ${rgba(COLORS.violet, 0.55)}, 0 0 ${60 + breathe * 70}px ${rgba(COLORS.cyan, 0.45 + breathe * 0.25)}`,
            }}
          >
            Build my website
            <ArrowIcon />
          </div>

          {/* Click ripple */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 80,
              height: 80,
              marginLeft: -40,
              marginTop: -40,
              borderRadius: "50%",
              border: `2px solid ${rgba("#FFFFFF", 0.6)}`,
              transform: `scale(${1 + ring * 6})`,
              opacity: ring * (1 - ring) * 3,
            }}
          />

          {/* Cursor */}
          <div
            style={{
              position: "absolute",
              right: 40,
              bottom: 6,
              transform: `translate(${cursorX}px, ${cursorY}px) scale(${click ? 0.9 : 1})`,
              filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.5))",
            }}
          >
            <CursorIcon />
          </div>
        </div>

        {/* Trust row */}
        <div style={{ ...fadeSub(frame, 60), display: "flex", gap: 30, alignItems: "center", color: COLORS.inkFaint, fontFamily: FONT.family, fontSize: 22 }}>
          <span>★★★★★ 12,000+ sites launched</span>
        </div>
      </AbsoluteFill>

      <Vignette strength={0.5} />
      <Grain />
    </AbsoluteFill>
  );
};

const fadeSub = (frame: number, delay = 26) => ({
  opacity: interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }),
  transform: `translateY(${interpolate(frame, [delay, delay + 16], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
});

const LogoMark: React.FC<{ frame: number }> = ({ frame }) => (
  <div
    style={{
      width: 64,
      height: 64,
      borderRadius: 18,
      background: GRADIENTS.brand,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 0 40px ${rgba(COLORS.violet, 0.6)}`,
      transform: `rotate(${floaty(frame, 4, 0.04)}deg)`,
    }}
  >
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l1.9 5.9L20 9.8l-6.1 1.9L12 18l-1.9-6.3L4 9.8l6.1-1.9L12 2z" fill="#fff" />
    </svg>
  </div>
);

const ArrowIcon: React.FC = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CursorIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <path d="M4 3l16 7-6.5 2.2L11 20 4 3z" fill="#fff" stroke="#0B0D18" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);
