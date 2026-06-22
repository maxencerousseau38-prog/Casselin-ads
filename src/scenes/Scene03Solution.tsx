import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, EASE, FONT, SPRING } from "../theme";
import { Background, rgba } from "../components/Background";
import { Grain, Vignette } from "../components/Grain";
import { Stage } from "../components/Stage";
import { DashboardFrame } from "../components/DashboardFrame";
import { EquipmentIcon, EquipmentName } from "../components/Equipment";
import { Headline } from "../components/AnimatedText";
import { eased, springScale } from "../animations";

/**
 * SCENE 3 — SOLUTION (5–10s)
 * "Everything your kitchen needs." A Casselin catalogue console: core units snap
 * into a steel grid in rapid sequence — fryer, grill, oven, toaster, bain-marie
 * and more — each on its own milled tile with a part label.
 */
const ITEMS: { name: EquipmentName; label: string }[] = [
  { name: "fryer", label: "Fryer" },
  { name: "grill", label: "Grill" },
  { name: "oven", label: "Oven" },
  { name: "toaster", label: "Toaster" },
  { name: "bainmarie", label: "Bain-marie" },
  { name: "griddle", label: "Griddle" },
];

export const Scene03Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background tint="cold" intensity={0.8} />
      <Stage>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 70,
            padding: 80,
          }}
        >
          <Headline
            text="Everything your kitchen needs."
            delay={4}
            size={86}
            tone="steel"
            maxWidth={860}
            stagger={3}
          />

          <DashboardFrame
            label="CASSELIN · CATALOGUE"
            status="IN STOCK"
            style={{
              width: 880,
              opacity: eased(frame, [10, 22], [0, 1], EASE.expo),
              transform: `scale(${springScale(frame, fps, { delay: 10, from: 0.94, to: 1 })})`,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 22,
                padding: 30,
              }}
            >
              {ITEMS.map((it, i) => {
                const delay = 20 + i * 7;
                const s = springScale(frame, fps, {
                  delay,
                  from: 0.7,
                  to: 1,
                  preset: SPRING.snappy,
                });
                const op = eased(frame, [delay, delay + 10], [0, 1], EASE.expo);
                return (
                  <div
                    key={it.name}
                    style={{
                      borderRadius: 16,
                      padding: "26px 18px 20px",
                      background: `linear-gradient(160deg, ${rgba(COLORS.steelHi, 0.06)}, ${rgba(
                        COLORS.steelDark,
                        0.06,
                      )})`,
                      border: `1px solid ${rgba(COLORS.steel, 0.16)}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 10,
                      opacity: op,
                      transform: `scale(${s})`,
                    }}
                  >
                    <EquipmentIcon name={it.name} size={150} />
                    <div
                      style={{
                        fontFamily: FONT.family,
                        fontSize: 24,
                        fontWeight: 600,
                        letterSpacing: 1,
                        color: COLORS.inkSoft,
                      }}
                    >
                      {it.label}
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
