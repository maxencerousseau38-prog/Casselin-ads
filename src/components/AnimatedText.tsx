import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, EASE, FONT, GRADIENTS } from "../theme";
import { fadeUp } from "../animations";

type Tone = "ink" | "steel" | "cold" | "accent";

const toneFill: Record<Exclude<Tone, "ink">, string> = {
  steel: GRADIENTS.textSteel,
  cold: GRADIENTS.cold,
  accent: GRADIENTS.accent,
};

/**
 * Word-by-word headline reveal with a precise settle.
 * Each word fades up on a small stagger so the line "assembles" itself —
 * controlled and engineered, never bouncy.
 */
export const Headline: React.FC<{
  text: string;
  delay?: number;
  size?: number;
  weight?: number;
  tone?: Tone;
  stagger?: number;
  lineHeight?: number;
  maxWidth?: number;
  align?: "center" | "left";
  letterSpacing?: number;
  style?: React.CSSProperties;
}> = ({
  text,
  delay = 0,
  size = 88,
  weight = 700,
  tone = "ink",
  stagger = 4,
  lineHeight = 1.05,
  maxWidth = 900,
  align = "center",
  letterSpacing = -1.5,
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
        letterSpacing,
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
              distance: 34,
              ease: EASE.expo,
            }),
            ...(tone === "ink"
              ? { color: COLORS.ink }
              : {
                  backgroundImage: toneFill[tone],
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }),
          }}
        >
          {w}
        </span>
      ))}
    </div>
  );
};

/** Small uppercase eyebrow / system kicker label. */
export const Kicker: React.FC<{
  text: string;
  delay?: number;
  color?: string;
  letterSpacing?: number;
}> = ({ text, delay = 0, color = COLORS.cold, letterSpacing = 6 }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        ...fadeUp(frame, { delay, duration: 20, distance: 16 }),
        fontFamily: FONT.family,
        fontSize: 24,
        fontWeight: 600,
        letterSpacing,
        textTransform: "uppercase",
        color,
      }}
    >
      {text}
    </div>
  );
};
