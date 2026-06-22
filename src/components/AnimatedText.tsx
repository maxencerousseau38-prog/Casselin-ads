import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, EASE, FONT, GRADIENTS } from "../theme";
import { fadeUp } from "../animations";

/**
 * Word-by-word headline reveal with a premium settle.
 * Each word fades up on a small stagger so the line "assembles" itself.
 */
export const Headline: React.FC<{
  text: string;
  delay?: number;
  size?: number;
  weight?: number;
  gradient?: boolean;
  stagger?: number;
  lineHeight?: number;
  maxWidth?: number;
  align?: "center" | "left";
  style?: React.CSSProperties;
}> = ({
  text,
  delay = 0,
  size = 88,
  weight = 700,
  gradient = false,
  stagger = 4,
  lineHeight = 1.04,
  maxWidth = 900,
  align = "center",
  style,
}) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: `0 ${size * 0.26}px`,
        justifyContent: align === "center" ? "center" : "flex-start",
        maxWidth,
        margin: align === "center" ? "0 auto" : undefined,
        fontFamily: FONT.family,
        fontWeight: weight,
        fontSize: size,
        lineHeight,
        letterSpacing: -1.5,
        textAlign: align,
        ...style,
      }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{
            display: "inline-block",
            ...fadeUp(frame, {
              delay: delay + i * stagger,
              duration: 26,
              distance: 36,
              ease: EASE.expo,
            }),
            ...(gradient
              ? {
                  backgroundImage: GRADIENTS.brand,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }
              : { color: COLORS.ink }),
          }}
        >
          {w}
        </span>
      ))}
    </div>
  );
};

/** Small uppercase eyebrow / kicker label. */
export const Kicker: React.FC<{
  text: string;
  delay?: number;
  color?: string;
}> = ({ text, delay = 0, color = COLORS.cyan }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        ...fadeUp(frame, { delay, duration: 20, distance: 16 }),
        fontFamily: FONT.family,
        fontSize: 24,
        fontWeight: 600,
        letterSpacing: 6,
        textTransform: "uppercase",
        color,
      }}
    >
      {text}
    </div>
  );
};
