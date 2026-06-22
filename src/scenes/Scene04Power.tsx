import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, EASE, FONT, PHOTOS } from "../theme";
import { rgba } from "../components/Background";
import { Grain, Vignette } from "../components/Grain";
import { Stage } from "../components/Stage";
import { Photo, CornerTicks } from "../components/Photo";
import { Headline, Kicker } from "../components/AnimatedText";
import { eased } from "../animations";

/**
 * SCENE 4 — INDUSTRIAL POWER (10–15s)
 * "Designed for professionals." A real Casselin Ligne 700 range fills the frame
 * under a slow cinematic push-in, framed like a spec sheet with engineering
 * corner ticks and a restrained material/duty caption. The proof is the product.
 */
export const Scene04Power: React.FC = () => {
  const frame = useCurrentFrame();

  const specs = [
    { k: "Material", v: "Inox 304" },
    { k: "Build", v: "Heavy-duty" },
    { k: "Service", v: "Non-stop" },
  ];

  return (
    <AbsoluteFill>
      <Stage>
        <Photo src={PHOTOS.ligne700} zoom={1.16} span={150} pan={{ x: -20 }} />
        <CornerTicks inset={40} size={40} />

        {/* Caption block */}
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-start",
            padding: "0 80px 230px",
          }}
        >
          <div>
            <Kicker text="Built to run all service" delay={6} color={COLORS.red} />
            <div style={{ height: 22 }} />
            <Headline
              text="Designed for professionals."
              delay={10}
              size={88}
              tone="ink"
              align="left"
              maxWidth={840}
            />
          </div>
        </AbsoluteFill>

        {/* Spec strip */}
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 130,
            opacity: eased(frame, [40, 56], [0, 1], EASE.expo),
          }}
        >
          <div style={{ display: "flex", gap: 14 }}>
            {specs.map((s, i) => (
              <div
                key={s.k}
                style={{
                  fontFamily: FONT.family,
                  padding: "14px 22px",
                  borderRadius: 12,
                  background: rgba(COLORS.base, 0.55),
                  border: `1px solid ${rgba(COLORS.steel, 0.22)}`,
                  backdropFilter: "blur(6px)",
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: COLORS.inkFaint,
                  }}
                >
                  {s.k}
                </div>
                <div
                  style={{
                    fontSize: 30,
                    fontWeight: 800,
                    letterSpacing: -0.5,
                    color: i === 1 ? COLORS.redBright : COLORS.ink,
                    marginTop: 4,
                  }}
                >
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </AbsoluteFill>
      </Stage>
      <Vignette strength={0.55} />
      <Grain />
    </AbsoluteFill>
  );
};
