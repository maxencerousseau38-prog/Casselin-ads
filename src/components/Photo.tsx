import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { COLORS, EASE } from "../theme";
import { rgba } from "./Background";
import { eased } from "../animations";

/**
 * Graded brand photograph.
 *
 * Real Casselin product photography, run through one consistent cinematic grade
 * (cool contrast lift + a faint blue light wash + vignette) so the colour and
 * black-&-white source images read as a single premium campaign. A slow Ken
 * Burns push gives every still controlled, engineered motion — never static.
 */
export const Photo: React.FC<{
  src: string;
  /** push-in amount over the clip (1 = none). */
  zoom?: number;
  /** start frame for the push. */
  from?: number;
  /** clip length the push spans. */
  span?: number;
  pan?: { x?: number; y?: number };
  grade?: number; // 0..1 strength of the cool wash
  style?: React.CSSProperties;
}> = ({ src, zoom = 1.12, from = 0, span = 150, pan, grade = 1, style }) => {
  const frame = useCurrentFrame();
  const scale = eased(frame, [from, from + span], [zoom, 1], EASE.soft);
  const tx = pan?.x ? eased(frame, [from, from + span], [0, pan.x], EASE.soft) : 0;
  const ty = pan?.y ? eased(frame, [from, from + span], [0, pan.y], EASE.soft) : 0;

  return (
    <AbsoluteFill style={{ overflow: "hidden", ...style }}>
      <Img
        src={staticFile(src)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
          filter: "saturate(0.82) contrast(1.06) brightness(0.92)",
        }}
      />
      {/* cool light wash for cohesion */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(150deg, ${rgba(COLORS.cold, 0.18 * grade)} 0%, transparent 45%, ${rgba(
            COLORS.base,
            0.25 * grade,
          )} 100%)`,
          mixBlendMode: "soft-light",
        }}
      />
      {/* grounding vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 90% at 50% 42%, transparent 50%, ${rgba(
            COLORS.base,
            0.55,
          )} 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

/** Engineering corner ticks for framing a photo like a spec sheet. */
export const CornerTicks: React.FC<{ inset?: number; size?: number; color?: string }> = ({
  inset = 16,
  size = 26,
  color = COLORS.cold,
}) => {
  const corners = [
    { top: inset, left: inset, rot: 0 },
    { top: inset, right: inset, rot: 90 },
    { bottom: inset, right: inset, rot: 180 },
    { bottom: inset, left: inset, rot: 270 },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: c.top,
            left: c.left,
            right: c.right,
            bottom: c.bottom,
            width: size,
            height: size,
            borderTop: `2px solid ${color}`,
            borderLeft: `2px solid ${color}`,
            transform: `rotate(${c.rot}deg)`,
            opacity: 0.7,
          }}
        />
      ))}
    </>
  );
};
