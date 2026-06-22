import React from "react";
import { COLORS } from "../theme";
import { rgba } from "./Background";

/**
 * Realistic macOS-style browser chrome used to present generated websites.
 * Keeps the "real product" feeling — traffic lights, address pill, content slot.
 */
export const BrowserFrame: React.FC<{
  url?: string;
  style?: React.CSSProperties;
  accent?: string;
  children?: React.ReactNode;
}> = ({ url = "yourbrand.com", style, accent = COLORS.cyan, children }) => {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 22,
        overflow: "hidden",
        background: COLORS.baseSoft,
        border: `1px solid ${COLORS.glassStroke}`,
        boxShadow: `0 40px 110px rgba(0,0,0,0.55), inset 0 1px 0 ${COLORS.glassStrokeBright}`,
        ...style,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          height: 52,
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "0 22px",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          borderBottom: `1px solid ${rgba("#FFFFFF", 0.06)}`,
        }}
      >
        <div style={{ display: "flex", gap: 9 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div
              key={c}
              style={{
                width: 13,
                height: 13,
                borderRadius: 99,
                background: c,
                boxShadow: `0 0 8px ${rgba(c, 0.5)}`,
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            height: 30,
            borderRadius: 99,
            background: rgba("#FFFFFF", 0.05),
            border: `1px solid ${rgba("#FFFFFF", 0.07)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            color: COLORS.inkSoft,
            fontSize: 17,
            letterSpacing: 0.2,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 99,
              background: accent,
              boxShadow: `0 0 10px ${accent}`,
            }}
          />
          {url}
        </div>
      </div>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
};
