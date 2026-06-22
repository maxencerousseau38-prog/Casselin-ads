import React from "react";
import { COLORS } from "../theme";

/**
 * Reusable glassmorphism surface: frosted fill, hairline stroke, a bright
 * top-edge highlight and a soft drop shadow for floating depth.
 */
export const GlassCard: React.FC<{
  style?: React.CSSProperties;
  radius?: number;
  glow?: string;
  children?: React.ReactNode;
}> = ({ style, radius = 28, glow, children }) => {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: radius,
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.025) 60%, rgba(255,255,255,0.04) 100%)",
        border: `1px solid ${COLORS.glassStroke}`,
        boxShadow: `
          0 30px 80px rgba(0,0,0,0.45),
          inset 0 1px 0 ${COLORS.glassStrokeBright},
          inset 0 0 60px rgba(255,255,255,0.02)
          ${glow ? `, 0 0 90px ${glow}` : ""}
        `,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Top sheen */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 18%)",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
};
