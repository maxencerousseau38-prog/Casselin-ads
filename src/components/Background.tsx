import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { floaty } from "../animations";

/**
 * Ambient aurora background.
 *
 * Two slow-drifting radial "light blobs" over a deep base, plus a soft top
 * vignette. This is what gives every frame depth and the high-end gradient
 * feel without ever looking like a flat template.
 */
export const Background: React.FC<{
  tint?: "brand" | "warm" | "cool";
  intensity?: number;
}> = ({ tint = "brand", intensity = 1 }) => {
  const frame = useCurrentFrame();

  const palettes = {
    brand: [COLORS.indigo, COLORS.violet, COLORS.cyan],
    warm: [COLORS.pink, COLORS.violet, COLORS.indigo],
    cool: [COLORS.cyan, COLORS.mint, COLORS.indigo],
  } as const;
  const [a, b, c] = palettes[tint];

  const blobA = {
    x: 30 + floaty(frame, 6, 0.012, 0),
    y: 26 + floaty(frame, 5, 0.01, 1.2),
  };
  const blobB = {
    x: 74 + floaty(frame, 7, 0.009, 2.4),
    y: 70 + floaty(frame, 6, 0.011, 0.6),
  };
  const blobC = {
    x: 50 + floaty(frame, 9, 0.007, 3.1),
    y: 96 + floaty(frame, 4, 0.013, 1.9),
  };

  const alpha = (v: number) => Math.min(1, v * intensity);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.base }}>
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(46% 38% at ${blobA.x}% ${blobA.y}%, ${rgba(a, alpha(0.55))} 0%, transparent 60%),
            radial-gradient(50% 42% at ${blobB.x}% ${blobB.y}%, ${rgba(b, alpha(0.45))} 0%, transparent 62%),
            radial-gradient(60% 50% at ${blobC.x}% ${blobC.y}%, ${rgba(c, alpha(0.4))} 0%, transparent 65%)
          `,
          filter: "blur(8px)",
        }}
      />
      {/* Subtle dark gradient to anchor text contrast top & bottom */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${rgba(COLORS.base, 0.55)} 0%, transparent 22%, transparent 72%, ${rgba(COLORS.base, 0.75)} 100%)`,
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
