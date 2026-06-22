import React from "react";
import { COLORS } from "../theme";
import { rgba } from "./Background";

/**
 * Europe logistics network.
 *
 * A stylised node-and-arc map: a France hub dispatching cold-light flows to
 * destination nodes laid out to read as Europe, over a faint coordinate field.
 * `progress` (0→1) draws the arcs and lights the nodes in sequence, so the
 * scene shows reach building out rather than a static graphic.
 */

const HUB = { x: 38, y: 52, label: "FR" };
const NODES = [
  { x: 30, y: 30, label: "UK" },
  { x: 52, y: 26, label: "DE" },
  { x: 46, y: 40, label: "BE" },
  { x: 24, y: 70, label: "ES" },
  { x: 56, y: 66, label: "IT" },
  { x: 70, y: 40, label: "PL" },
  { x: 78, y: 60, label: "AT" },
  { x: 64, y: 22, label: "NL" },
];

const arc = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - Math.hypot(b.x - a.x, b.y - a.y) * 0.32;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
};

export const EuropeMap: React.FC<{ progress: number; size?: number }> = ({
  progress,
  size = 760,
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={rgba(COLORS.cold, 0.5)} />
          <stop offset="100%" stopColor={rgba(COLORS.cold, 0)} />
        </radialGradient>
      </defs>

      {/* faint coordinate field */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={12 + i * 9}
          y1={12}
          x2={12 + i * 9}
          y2={88}
          stroke={COLORS.steelLine}
          strokeWidth={0.3}
        />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1={12}
          y1={12 + i * 9}
          x2={88}
          y2={12 + i * 9}
          stroke={COLORS.steelLine}
          strokeWidth={0.3}
        />
      ))}

      {/* dispatch arcs */}
      {NODES.map((n, i) => {
        const start = i / NODES.length;
        const local = Math.max(0, Math.min(1, (progress - start * 0.5) / 0.5));
        return (
          <path
            key={`a${i}`}
            d={arc(HUB, n)}
            fill="none"
            stroke={COLORS.cold}
            strokeWidth={0.7}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - local}
            opacity={0.85}
          />
        );
      })}

      {/* destination nodes */}
      {NODES.map((n, i) => {
        const start = i / NODES.length;
        const on = progress > start * 0.5 + 0.45;
        return (
          <g key={`n${i}`} opacity={on ? 1 : 0.35}>
            <circle
              cx={n.x}
              cy={n.y}
              r={1.5}
              fill={on ? COLORS.coldBright : COLORS.steelMid}
            />
            {on && (
              <circle
                cx={n.x}
                cy={n.y}
                r={3}
                fill="none"
                stroke={rgba(COLORS.cold, 0.5)}
                strokeWidth={0.5}
              />
            )}
          </g>
        );
      })}

      {/* hub */}
      <circle cx={HUB.x} cy={HUB.y} r={10} fill="url(#hubGlow)" />
      <circle cx={HUB.x} cy={HUB.y} r={2.6} fill={COLORS.red} />
      <circle
        cx={HUB.x}
        cy={HUB.y}
        r={2.6}
        fill="none"
        stroke={rgba(COLORS.redBright, 0.6)}
        strokeWidth={0.6}
      />
    </svg>
  );
};
