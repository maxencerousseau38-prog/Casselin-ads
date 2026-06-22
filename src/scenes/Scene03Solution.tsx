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
import { DashboardFrame } from "../components/DashboardFrame";
import { Headline } from "../components/AnimatedText";
import { eased, springScale } from "../animations";

/**
 * SCENE 3 — SOLUTION (5–10s)
 * "Everything your kitchen needs." A Casselin catalogue console: real product
 * photography snaps into a steel grid in rapid sequence — snacking, cooking,
 * preparation, buffet, cold, washing — each a graded tile with a range label.
 */
const TILES: { src: string; label: string }[] = [
  { src: PHOTOS.snack, label: "Snacking" },
  { src: PHOTOS.ligne700, label: "Cooking" },
  { src: PHOTOS.preparation, label: "Preparation" },
  { src: PHOTOS.buffet, label: "Buffet" },
  { src: PHOTOS.froid, label: "Cold" },
  { src: PHOTOS.laverie, label: "Washing" },
];

export const Scene03Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background tint="cold" intensity={0.75} />
      <Stage>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 64,
            padding: 70,
          }}
        >
          <Headline
            text="Everything your kitchen needs."
            delay={4}
            size={84}
            tone="steel"
            maxWidth={860}
            stagger={3}
          />

          <DashboardFrame
            label="CASSELIN · CATALOGUE"
            status="IN STOCK"
            style={{
              width: 900,
              opacity: eased(frame, [10, 22], [0, 1], EASE.expo),
              transform: `scale(${springScale(frame, fps, { delay: 10, from: 0.95, to: 1 })})`,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                padding: 22,
              }}
            >
              {TILES.map((t, i) => {
                const delay = 20 + i * 7;
                const s = springScale(frame, fps, {
                  delay,
                  from: 0.78,
                  to: 1,
                  preset: SPRING.snappy,
                });
                const op = eased(frame, [delay, delay + 10], [0, 1], EASE.expo);
                return (
                  <div
                    key={t.label}
                    style={{
                      position: "relative",
                      height: 220,
                      borderRadius: 14,
                      overflow: "hidden",
                      border: `1px solid ${rgba(COLORS.steel, 0.2)}`,
                      opacity: op,
                      transform: `scale(${s})`,
                    }}
                  >
                    <Img
                      src={staticFile(t.src)}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "saturate(0.8) contrast(1.05) brightness(0.9)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(180deg, transparent 40%, ${rgba(
                          COLORS.base,
                          0.85,
                        )} 100%)`,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: 16,
                        bottom: 14,
                        fontFamily: FONT.family,
                        fontSize: 24,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        color: COLORS.ink,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 8,
                          borderRadius: 99,
                          background: i % 2 ? COLORS.red : COLORS.cold,
                          marginRight: 10,
                          verticalAlign: "middle",
                          boxShadow: `0 0 10px ${i % 2 ? COLORS.red : COLORS.cold}`,
                        }}
                      />
                      {t.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </DashboardFrame>
        </AbsoluteFill>
      </Stage>
      <Vignette strength={0.55} />
      <Grain />
    </AbsoluteFill>
  );
};
