import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, EASE, FONT, SPRING } from "../theme";
import { Background, rgba } from "../components/Background";
import { Grain, Vignette } from "../components/Grain";
import { Stage } from "../components/Stage";
import { Gauge } from "../components/Telemetry";
import { eased, springScale } from "../animations";

/**
 * SCENE 2 — PROMISE (2–5s)
 * Three engineered guarantees punch in on weighted beats, each backed by a live
 * gauge climbing to full. Speed → Reliability → Performance. The contrast with a
 * slow, chaotic kitchen is implied by the relentless, instrumented confidence.
 */
const BEATS = [
  { word: "Speed.", read: "48H", label: "Delivery", value: 0.92, accent: COLORS.cold },
  { word: "Reliability.", read: "99.9%", label: "Uptime", value: 0.999, accent: COLORS.coldBright },
  { word: "Performance.", read: "MAX", label: "Output", value: 1, accent: COLORS.red },
] as const;

const BEAT_LEN = 30;

export const Scene02Promise: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const index = Math.min(BEATS.length - 1, Math.floor(frame / BEAT_LEN));

  return (
    <AbsoluteFill>
      <Background tint="steel" intensity={0.85} />
      <Stage>
        {BEATS.map((b, i) => {
          const start = i * BEAT_LEN;
          const local = frame - start;
          const active = i === index;
          if (frame < start - 2) return null;

          const enter = springScale(frame, fps, {
            delay: start,
            from: 1.22,
            to: 1,
            preset: SPRING.hero,
          });
          const op = active ? eased(frame, [start, start + 8], [0, 1], EASE.expo) : 0;
          const gv = eased(local, [6, 26], [0, b.value], EASE.soft);

          return (
            <AbsoluteFill
              key={b.word}
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 50,
                opacity: op,
                transform: `scale(${enter})`,
              }}
            >
              <Gauge value={gv} size={300} read={b.read} label={b.label} accent={b.accent} />
              <div
                style={{
                  fontFamily: FONT.family,
                  fontWeight: 800,
                  fontSize: 132,
                  letterSpacing: -3,
                  color: COLORS.ink,
                  textShadow: `0 0 50px ${rgba(b.accent, 0.3)}`,
                }}
              >
                {b.word}
              </div>
            </AbsoluteFill>
          );
        })}

        {/* progress ticks */}
        <AbsoluteFill
          style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 220 }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: 14 }}>
            {BEATS.map((b, i) => (
              <div
                key={i}
                style={{
                  width: i === index ? 56 : 22,
                  height: 6,
                  borderRadius: 99,
                  background: i <= index ? b.accent : rgba(COLORS.steel, 0.25),
                  boxShadow: i === index ? `0 0 16px ${rgba(b.accent, 0.6)}` : "none",
                  opacity: interpolate(frame, [2, 12], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              />
            ))}
          </div>
        </AbsoluteFill>
      </Stage>
      <Vignette strength={0.6} />
      <Grain />
    </AbsoluteFill>
  );
};
