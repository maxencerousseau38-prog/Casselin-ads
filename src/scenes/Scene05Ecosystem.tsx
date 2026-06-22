import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, EASE, FONT } from "../theme";
import { Background, rgba } from "../components/Background";
import { Grain, Vignette } from "../components/Grain";
import { Stage } from "../components/Stage";
import { EquipmentIcon, EquipmentName } from "../components/Equipment";
import { Headline } from "../components/AnimatedText";
import { eased, springScale } from "../animations";

/**
 * SCENE 5 — COMPLETE ECOSYSTEM (15–20s)
 * "Cooking. Preparation. Cold. Hygiene." The full Casselin range, segmented like
 * a digital catalogue: four ranges reveal in sequence, each a steel row of its
 * core units, with the matching word igniting as its row lands.
 */
const RANGES: {
  word: string;
  accent: string;
  items: EquipmentName[];
}[] = [
  { word: "Cooking.", accent: COLORS.red, items: ["fryer", "grill", "oven"] },
  { word: "Preparation.", accent: COLORS.cold, items: ["slicer", "mixer", "panini"] },
  { word: "Cold.", accent: COLORS.coldBright, items: ["fridge", "display"] },
  { word: "Hygiene.", accent: COLORS.steel, items: ["dishwasher"] },
];

const ROW_DELAY = 18;

export const Scene05Ecosystem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background tint="cold" intensity={0.8} />
      <Stage>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "stretch",
            flexDirection: "column",
            gap: 26,
            padding: "150px 90px",
          }}
        >
          <Headline
            text="One complete ecosystem."
            delay={2}
            size={70}
            tone="steel"
            style={{ marginBottom: 24 }}
          />

          {RANGES.map((r, i) => {
            const delay = 14 + i * ROW_DELAY;
            const op = eased(frame, [delay, delay + 12], [0, 1], EASE.expo);
            const x = eased(frame, [delay, delay + 16], [60, 0], EASE.expo);
            return (
              <div
                key={r.word}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 28,
                  padding: "20px 28px",
                  borderRadius: 18,
                  background: `linear-gradient(120deg, ${rgba(r.accent, 0.07)}, ${rgba(
                    COLORS.steelHi,
                    0.03,
                  )})`,
                  border: `1px solid ${rgba(COLORS.steel, 0.14)}`,
                  borderLeft: `4px solid ${r.accent}`,
                  opacity: op,
                  transform: `translateX(${x}px)`,
                }}
              >
                <div
                  style={{
                    width: 320,
                    fontFamily: FONT.family,
                    fontSize: 52,
                    fontWeight: 800,
                    letterSpacing: -1.5,
                    color: COLORS.ink,
                  }}
                >
                  {r.word}
                </div>
                <div style={{ display: "flex", gap: 8, flex: 1, justifyContent: "flex-end" }}>
                  {r.items.map((name, j) => {
                    const id = delay + 6 + j * 5;
                    const s = springScale(frame, fps, { delay: id, from: 0.6, to: 1 });
                    return (
                      <div
                        key={name}
                        style={{
                          opacity: eased(frame, [id, id + 10], [0, 1], EASE.expo),
                          transform: `scale(${s})`,
                        }}
                      >
                        <EquipmentIcon name={name} size={118} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </AbsoluteFill>
      </Stage>
      <Vignette strength={0.55} />
      <Grain />
    </AbsoluteFill>
  );
};
