import React, { useMemo } from "react";
import { AbsoluteFill, random } from "remotion";

/**
 * Ultra-subtle film grain + scanline-free noise overlay.
 *
 * Implemented as a static SVG fractal-noise data layer (deterministic, no
 * flicker) at very low opacity. This is the secret sauce that stops large
 * gradient fields from looking flat/banded — the same trick high-end ads use.
 */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.04 }) => {
  // Deterministic seed so the grain is stable across the render farm.
  const seed = useMemo(() => Math.floor(random("grain-seed") * 1000), []);
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='${seed}' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`;
  const url = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;

  return (
    <AbsoluteFill
      style={{
        backgroundImage: url,
        backgroundSize: "240px 240px",
        opacity,
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
    />
  );
};

/** Cinematic vignette to draw the eye toward the center. */
export const Vignette: React.FC<{ strength?: number }> = ({
  strength = 0.55,
}) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(120% 80% at 50% 45%, transparent 55%, rgba(0,0,0,${strength}) 100%)`,
      pointerEvents: "none",
    }}
  />
);
