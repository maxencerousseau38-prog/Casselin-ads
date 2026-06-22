import React from "react";
import { COLORS, FONT, GRADIENTS } from "../theme";
import { rgba } from "./Background";

/**
 * Casselin wordmark lockup.
 *
 * Industrial uppercase type, wide engineered tracking, a milled steel finish
 * and a single red index mark — the kind of mark you'd see laser-etched on a
 * stainless unit. Used in the opening stamp and the closing brand lockup.
 */
export const Wordmark: React.FC<{
  size?: number;
  mark?: boolean;
  style?: React.CSSProperties;
}> = ({ size = 150, mark = true, style }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: size * 0.18,
        ...style,
      }}
    >
      {mark && (
        <div
          style={{
            width: size * 0.5,
            height: size * 0.5,
            borderRadius: size * 0.1,
            background: GRADIENTS.accent,
            boxShadow: `0 0 ${size * 0.3}px ${rgba(COLORS.red, 0.55)}, inset 0 2px 0 ${rgba(
              "#FFFFFF",
              0.3,
            )}`,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: size * 0.12,
              borderRadius: size * 0.04,
              border: `2px solid ${rgba("#FFFFFF", 0.8)}`,
            }}
          />
        </div>
      )}
      <span
        style={{
          fontFamily: FONT.family,
          fontWeight: 800,
          fontSize: size,
          letterSpacing: size * 0.04,
          lineHeight: 1,
          backgroundImage: GRADIENTS.textSteel,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textShadow: `0 2px 30px ${rgba(COLORS.cold, 0.18)}`,
        }}
      >
        CASSELIN
      </span>
    </div>
  );
};
