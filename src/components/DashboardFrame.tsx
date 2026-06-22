import React from "react";
import { COLORS, FONT } from "../theme";
import { rgba } from "./Background";

/**
 * Engineering dashboard chrome.
 *
 * The B2B equivalent of a product window: a titled control surface with a live
 * status dot and a monospace system label. Used to present equipment, ranges
 * and logistics as if read off a Casselin operations console.
 */
export const DashboardFrame: React.FC<{
  label?: string;
  status?: string;
  accent?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({
  label = "CASSELIN · SYSTEM",
  status = "ONLINE",
  accent = COLORS.cold,
  style,
  children,
}) => {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        background: COLORS.panelSoft,
        border: `1px solid ${rgba(COLORS.steel, 0.16)}`,
        boxShadow: `0 40px 110px rgba(0,0,0,0.6), inset 0 1px 0 ${rgba(COLORS.steelHi, 0.22)}`,
        ...style,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          background: `linear-gradient(180deg, ${rgba(COLORS.steelHi, 0.06)}, ${rgba(COLORS.steelHi, 0.015)})`,
          borderBottom: `1px solid ${rgba(COLORS.steel, 0.12)}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: FONT.family,
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: 3,
            color: COLORS.inkSoft,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 99,
              background: accent,
              boxShadow: `0 0 12px ${accent}`,
            }}
          />
          {label}
        </div>
        <div
          style={{
            fontFamily: FONT.family,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 2.5,
            color: accent,
            padding: "4px 10px",
            borderRadius: 6,
            border: `1px solid ${rgba(accent, 0.35)}`,
            background: rgba(accent, 0.08),
          }}
        >
          {status}
        </div>
      </div>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
};
