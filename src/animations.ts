import { Easing, interpolate, spring } from "remotion";
import { EASE, SPRING } from "./theme";

type EaseTuple = readonly [number, number, number, number];

const bezier = (e: EaseTuple) => Easing.bezier(e[0], e[1], e[2], e[3]);

/**
 * Fade + translate-up reveal. The single most used motion in the film.
 * Returns inline style ready to spread onto an element.
 */
export const fadeUp = (
  frame: number,
  {
    delay = 0,
    duration = 22,
    distance = 48,
    ease = EASE.expo,
  }: {
    delay?: number;
    duration?: number;
    distance?: number;
    ease?: EaseTuple;
  } = {},
) => {
  const t = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: bezier(ease),
  });
  return {
    opacity: t,
    transform: `translateY(${(1 - t) * distance}px)`,
  };
};

/** Symmetric fade in/out around a clip — used for whole-scene framing. */
export const fadeInOut = (
  frame: number,
  durationInFrames: number,
  {
    fadeIn = 14,
    fadeOut = 14,
  }: { fadeIn?: number; fadeOut?: number } = {},
) =>
  interpolate(
    frame,
    [0, fadeIn, durationInFrames - fadeOut, durationInFrames],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: bezier(EASE.inOut),
    },
  );

/** Spring scale-in helper bound to a preset. */
export const springScale = (
  frame: number,
  fps: number,
  {
    delay = 0,
    from = 0.9,
    to = 1,
    preset = SPRING.panel,
  }: {
    delay?: number;
    from?: number;
    to?: number;
    preset?: { damping: number; mass: number; stiffness: number };
  } = {},
) => {
  const s = spring({
    frame: frame - delay,
    fps,
    config: preset,
    durationInFrames: 40,
  });
  return from + (to - from) * s;
};

/** Maps a value through a bezier ease — convenience around interpolate. */
export const eased = (
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number],
  ease: EaseTuple = EASE.expo,
) =>
  interpolate(frame, inputRange, outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: bezier(ease),
  });

/** Continuous gentle float for ambient depth (devices, glows). */
export const floaty = (frame: number, amplitude = 10, speed = 0.04, phase = 0) =>
  Math.sin(frame * speed + phase) * amplitude;
