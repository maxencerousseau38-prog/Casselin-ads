import React from "react";
import { COLORS, FONT } from "../theme";
import { rgba } from "./Background";

/**
 * Engineering-dashboard telemetry primitives.
 *
 * Small, precise readouts (radial gauge, value block, progress bar) that make
 * Casselin gear feel instrumented and intensive — the live console language of
 * a premium industrial brand. Driven by a normalised 0→1 value so scenes can
 * animate them with spring/eased curves.
 */

export const Gauge: React.FC<{
  value: number; // 0..1
  size?: number;
  label?: string;
  read?: string;
  accent?: string;
}> = ({ value, size = 200, label, read, accent = COLORS.cold }) => {
  const r = 42;
  const c = 2 * Math.PI * r;
  const sweep = 0.75; // 270°
  const v = Math.max(0, Math.min(1, value));
  return (
    <div style={{ width: size, textAlign: "center", fontFamily: FONT.family }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle
          cx={50}
          cy={50}
          r={r}
          fill="none"
          stroke={rgba(COLORS.steel, 0.16)}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={`${c * sweep} ${c}`}
          transform="rotate(135 50 50)"
        />
        <circle
          cx={50}
          cy={50}
          r={r}
          fill="none"
          stroke={accent}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={`${c * sweep * v} ${c}`}
          transform="rotate(135 50 50)"
          style={{ filter: `drop-shadow(0 0 6px ${rgba(accent, 0.6)})` }}
        />
      </svg>
      <div
        style={{
          marginTop: -size * 0.62,
          marginBottom: size * 0.28,
          fontSize: size * 0.2,
          fontWeight: 800,
          color: COLORS.ink,
          letterSpacing: -1,
        }}
      >
        {read}
      </div>
      {label && (
        <div
          style={{
            fontSize: size * 0.085,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: COLORS.inkSoft,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export const Readout: React.FC<{
  label: string;
  value: string;
  unit?: string;
  accent?: string;
  width?: number;
}> = ({ label, value, unit, accent = COLORS.cold, width }) => (
  <div
    style={{
      width,
      fontFamily: FONT.family,
      padding: "18px 22px",
      borderRadius: 14,
      background: rgba(COLORS.steelHi, 0.04),
      border: `1px solid ${rgba(COLORS.steel, 0.16)}`,
    }}
  >
    <div
      style={{
        fontSize: 18,
        fontWeight: 600,
        letterSpacing: 2.5,
        textTransform: "uppercase",
        color: COLORS.inkFaint,
      }}
    >
      {label}
    </div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 8 }}>
      <span style={{ fontSize: 46, fontWeight: 800, color: COLORS.ink, letterSpacing: -1.5 }}>
        {value}
      </span>
      {unit && (
        <span style={{ fontSize: 24, fontWeight: 700, color: accent }}>{unit}</span>
      )}
    </div>
  </div>
);

export const Bar: React.FC<{ value: number; accent?: string; height?: number }> = ({
  value,
  accent = COLORS.cold,
  height = 8,
}) => (
  <div
    style={{
      height,
      borderRadius: 99,
      background: rgba(COLORS.steel, 0.14),
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${Math.max(0, Math.min(1, value)) * 100}%`,
        height: "100%",
        borderRadius: 99,
        background: `linear-gradient(90deg, ${rgba(accent, 0.6)}, ${accent})`,
        boxShadow: `0 0 14px ${rgba(accent, 0.5)}`,
      }}
    />
  </div>
);
