import React from "react";
import { COLORS } from "../theme";
import { rgba } from "./Background";

/**
 * Brushed stainless-steel panel.
 *
 * A fabricated metal surface: cool linear sheen, hairline grain, a crisp bright
 * top edge and a grounded drop shadow. This is the recurring industrial
 * material the whole film is built from — the inox of a real Casselin unit.
 */
export const SteelPanel: React.FC<{
  style?: React.CSSProperties;
  radius?: number;
  glow?: string;
  brushed?: boolean;
  children?: React.ReactNode;
}> = ({ style, radius = 22, glow, brushed = true, children }) => {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: radius,
        background: `linear-gradient(150deg, ${rgba(COLORS.steelHi, 0.10)} 0%, ${rgba(
          COLORS.steelMid,
          0.05,
        )} 46%, ${rgba(COLORS.steelDark, 0.10)} 100%), ${COLORS.panel}`,
        border: `1px solid ${rgba(COLORS.steel, 0.18)}`,
        boxShadow: `
          0 34px 90px rgba(0,0,0,0.55),
          inset 0 1px 0 ${rgba(COLORS.steelHi, 0.30)},
          inset 0 0 70px rgba(0,0,0,0.30)
          ${glow ? `, 0 0 90px ${glow}` : ""}
        `,
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Brushed-metal hairline grain */}
      {brushed && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(90deg, ${rgba(
              COLORS.steelHi,
              0.05,
            )} 0px, ${rgba(COLORS.steelHi, 0.05)} 1px, transparent 1px, transparent 3px)`,
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
      )}
      {/* Cool top sheen */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${rgba(COLORS.coldBright, 0.07)} 0%, transparent 22%)`,
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
};
