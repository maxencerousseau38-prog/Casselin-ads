import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, EASE, FONT, PHOTOS, SPRING } from "../theme";
import { Background, rgba } from "../components/Background";
import { Grain, Vignette } from "../components/Grain";
import { Stage } from "../components/Stage";
import { Headline } from "../components/AnimatedText";
import { eased, springScale } from "../animations";

/**
 * SCENE 5 — COMPLETE ECOSYSTEM (15–20s)
 * "Cooking. Preparation. Cold. Hygiene." The four pillars of the Casselin range,
 * each a real graded photograph in a steel cell, igniting in sequence with its
 * word and an accent index — the whole CHR kitchen, end to end.
 */
const CELLS: { src: string; word: string; accent: string }[] = [
  { src: PHOTOS.ligne700, word: "Cooking.", accent: COLORS.red },
  { src: PHOTOS.preparation, word: "Preparation.", accent: COLORS.cold },
  { src: PHOTOS.froid, word: "Cold.", accent: COLORS.coldBright },
  { src: PHOTOS.laverie, word: "Hygiene.", accent: COLORS.steel },
];

export const Scene05Ecosystem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background tint="cold" intensity={0.7} />
      <Stage>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 44,
            padding: "120px 80px",
          }}
        >
          <Headline text="One complete ecosystem." delay={2} size={72} tone="steel" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: 18,
              width: "100%",
              flex: 1,
              maxHeight: 1180,
            }}
          >
            {CELLS.map((c, i) => {
              const delay = 14 + i * 12;
              const op = eased(frame, [delay, delay + 12], [0, 1], EASE.expo);
              const s = springScale(frame, fps, {
                delay,
                from: 0.9,
                to: 1,
                preset: SPRING.panel,
              });
              const kb = eased(frame, [delay, delay + 140], [1.12, 1], EASE.soft);
              return (
                <div
                  key={c.word}
                  style={{
                    position: "relative",
                    borderRadius: 18,
                    overflow: "hidden",
                    border: `1px solid ${rgba(COLORS.steel, 0.18)}`,
                    borderBottom: `4px solid ${c.accent}`,
                    opacity: op,
                    transform: `scale(${s})`,
                  }}
                >
                  <Img
                    src={staticFile(c.src)}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: `scale(${kb})`,
                      filter: "saturate(0.8) contrast(1.05) brightness(0.88)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(180deg, transparent 35%, ${rgba(
                        COLORS.base,
                        0.88,
                      )} 100%)`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 26,
                      bottom: 24,
                      fontFamily: FONT.family,
                      fontSize: 50,
                      fontWeight: 800,
                      letterSpacing: -1.5,
                      color: COLORS.ink,
                      textShadow: `0 2px 20px ${rgba(COLORS.base, 0.8)}`,
                    }}
                  >
                    {c.word}
                  </div>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </Stage>
      <Vignette strength={0.5} />
      <Grain />
    </AbsoluteFill>
  );
};
