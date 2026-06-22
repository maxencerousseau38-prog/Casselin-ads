import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, EASE, FONT, GRADIENTS } from "../theme";
import { Background, rgba } from "../components/Background";
import { Grain, Vignette } from "../components/Grain";
import { BrowserFrame } from "../components/BrowserFrame";
import { Headline, Kicker } from "../components/AnimatedText";
import { eased, springScale } from "../animations";

/**
 * SCENE 5 — RESULT (15–20s)
 * The payoff. A finished, genuinely premium landing page scrolls smoothly
 * inside the browser frame, proving the output is real and ready to sell.
 */
export const Scene05Result: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelScale = springScale(frame, fps, { delay: 4, from: 0.94, to: 1 });
  const panelOp = eased(frame, [4, 18], [0, 1], EASE.expo);

  // Smooth eased auto-scroll of the rendered page.
  const scroll = eased(frame, [24, 140], [0, 980], EASE.inOut);

  // "Published" toast lands near the end.
  const toast = springScale(frame, fps, { delay: 118, from: 0.7, to: 1 });
  const toastOp = eased(frame, [118, 130], [0, 1], EASE.expo);

  return (
    <AbsoluteFill>
      <Background tint="cool" intensity={0.85} />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 40 }}>
        <div style={{ textAlign: "center" }}>
          <Kicker text="Done" delay={4} color={COLORS.mint} />
          <div style={{ height: 20 }} />
          <Headline text="Ready-to-sell website. Instantly." delay={8} size={76} maxWidth={780} gradient />
        </div>

        <div style={{ transform: `scale(${panelScale})`, opacity: panelOp, position: "relative" }}>
          <BrowserFrame url="ateliernoir.com" accent={COLORS.mint} style={{ width: 840 }}>
            <div style={{ height: 760, overflow: "hidden", position: "relative" }}>
              <div style={{ transform: `translateY(${-scroll}px)` }}>
                <FinishedSite />
              </div>
              {/* top & bottom fade to sell the "scroll" depth */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(180deg, ${rgba(COLORS.base, 0.5)} 0%, transparent 12%, transparent 90%, ${rgba(COLORS.base, 0.4)} 100%)`,
                  pointerEvents: "none",
                }}
              />
            </div>
          </BrowserFrame>

          {/* Published toast */}
          <div
            style={{
              position: "absolute",
              right: -24,
              bottom: 60,
              transform: `scale(${toast})`,
              opacity: toastOp,
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 24px",
              borderRadius: 16,
              background: rgba("#0A0C17", 0.85),
              border: `1px solid ${rgba(COLORS.mint, 0.5)}`,
              boxShadow: `0 0 50px ${rgba(COLORS.mint, 0.45)}`,
              fontFamily: FONT.family,
              color: COLORS.ink,
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            <CheckBadge />
            Published
          </div>
        </div>
      </AbsoluteFill>

      <Vignette strength={0.5} />
      <Grain />
    </AbsoluteFill>
  );
};

/** A tall, polished landing page that scrolls past. */
const FinishedSite: React.FC = () => (
  <div style={{ width: "100%", background: COLORS.baseSoft }}>
    {/* Nav */}
    <div
      style={{
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 36px",
        borderBottom: `1px solid ${rgba("#FFFFFF", 0.06)}`,
      }}
    >
      <span style={{ fontFamily: FONT.family, fontWeight: 800, fontSize: 26, color: COLORS.ink, letterSpacing: 0.5 }}>
        Atelier&nbsp;Noir
      </span>
      <div style={{ display: "flex", gap: 26 }}>
        {["Shop", "Story", "Contact"].map((n) => (
          <span key={n} style={{ fontFamily: FONT.family, color: COLORS.inkSoft, fontSize: 20 }}>
            {n}
          </span>
        ))}
      </div>
    </div>

    {/* Hero */}
    <div style={{ padding: "70px 44px 56px" }}>
      <div style={{ fontFamily: FONT.family, fontSize: 72, fontWeight: 800, color: COLORS.ink, letterSpacing: -2, lineHeight: 1.02 }}>
        Handmade ceramics,
        <br />
        <span style={{ backgroundImage: GRADIENTS.brand, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
          made to last.
        </span>
      </div>
      <div style={{ fontFamily: FONT.family, fontSize: 26, color: COLORS.inkSoft, marginTop: 22, maxWidth: 560 }}>
        Small-batch pieces, fired by hand in our Paris studio. Designed for everyday rituals.
      </div>
      <div
        style={{
          display: "inline-block",
          marginTop: 32,
          padding: "18px 34px",
          borderRadius: 14,
          background: GRADIENTS.brand,
          color: "#fff",
          fontFamily: FONT.family,
          fontWeight: 700,
          fontSize: 24,
        }}
      >
        Shop the collection
      </div>
    </div>

    {/* Product grid */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, padding: "0 44px 56px" }}>
      {[COLORS.indigo, COLORS.violet, COLORS.cyan, COLORS.pink, COLORS.mint, COLORS.indigo].map((c, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              height: 220,
              borderRadius: 16,
              background: `linear-gradient(160deg, ${rgba(c, 0.85)}, ${rgba(COLORS.baseSoft, 1)})`,
              border: `1px solid ${COLORS.glassStroke}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 60% at 30% 25%, rgba(255,255,255,0.25), transparent 60%)" }} />
          </div>
          <span style={{ fontFamily: FONT.family, color: COLORS.ink, fontSize: 22, fontWeight: 600 }}>
            Vessel No.{i + 1}
          </span>
          <span style={{ fontFamily: FONT.family, color: COLORS.inkSoft, fontSize: 20 }}>€{48 + i * 12}</span>
        </div>
      ))}
    </div>

    {/* Banner */}
    <div style={{ margin: "0 44px 60px", padding: 48, borderRadius: 20, background: GRADIENTS.warm, position: "relative", overflow: "hidden" }}>
      <div style={{ fontFamily: FONT.family, fontSize: 44, fontWeight: 800, color: "#fff" }}>Free shipping across Europe.</div>
      <div style={{ fontFamily: FONT.family, fontSize: 24, color: rgba("#FFFFFF", 0.85), marginTop: 12 }}>On every order, every season.</div>
    </div>
  </div>
);

const CheckBadge: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill={COLORS.mint} opacity={0.25} />
    <path d="M7 12.5l3 3 7-7" stroke={COLORS.mint} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
