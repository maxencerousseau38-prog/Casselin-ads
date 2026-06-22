import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { floaty } from "../animations";

/**
 * Industrial premium background.
 *
 * A cold graphite canvas with a faint engineering blueprint grid, two slow
 * drifting cold-light pools and an anchoring top/bottom shade. This is what
 * gives every frame the controlled-lab depth of a Bosch / Siemens spot without
 * ever looking like a flat template. Fills the real frame, so it doubles as the
 * deliberate side framing in the 16:9 master.
 */
export const Background: React.FC<{
  tint?: "cold" | "steel" | "warm";
  intensity?: number;
  grid?: boolean;
}> = ({ tint = "cold", intensity = 1, grid = true }) => {
  const frame = useCurrentFrame();

  const palettes = {
    cold: [COLORS.cold, COLORS.coldBright],
    steel: [COLORS.steelMid, COLORS.cold],
    warm: [COLORS.red, COLORS.cold],
  } as const;
  const [a, b] = palettes[tint];

  const poolA = {
    x: 28 + floaty(frame, 4, 0.011, 0),
    y: 22 + floaty(frame, 4, 0.009, 1.2),
  };
  const poolB = {
    x: 76 + floaty(frame, 5, 0.008, 2.4),
    y: 78 + floaty(frame, 5, 0.01, 0.6),
  };

  const al = (v: number) => Math.min(1, v * intensity);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.base }}>
      {/* Cold light pools */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(44% 36% at ${poolA.x}% ${poolA.y}%, ${rgba(a, al(0.30))} 0%, transparent 60%),
            radial-gradient(52% 44% at ${poolB.x}% ${poolB.y}%, ${rgba(b, al(0.22))} 0%, transparent 64%)
          `,
          filter: "blur(6px)",
        }}
      />

      {/* Engineering blueprint grid */}
      {grid && (
        <AbsoluteFill
          style={{
            backgroundImage: `
              linear-gradient(${COLORS.steelLine} 1px, transparent 1px),
              linear-gradient(90deg, ${COLORS.steelLine} 1px, transparent 1px)
            `,
            backgroundSize: "96px 96px",
            maskImage:
              "radial-gradient(80% 70% at 50% 42%, #000 30%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(80% 70% at 50% 42%, #000 30%, transparent 90%)",
            opacity: 0.5,
          }}
        />
      )}

      {/* Top/bottom shade to anchor text contrast */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${rgba(COLORS.base, 0.7)} 0%, transparent 20%, transparent 70%, ${rgba(COLORS.base, 0.88)} 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

/** hex (#RRGGBB) → rgba() string. */
export const rgba = (hex: string, a: number) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
