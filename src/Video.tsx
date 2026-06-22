import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { SCENES } from "./theme";
import { fadeInOut } from "./animations";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02Problem } from "./scenes/Scene02Problem";
import { Scene03Solution } from "./scenes/Scene03Solution";
import { Scene04MagicAI } from "./scenes/Scene04MagicAI";
import { Scene05Result } from "./scenes/Scene05Result";
import { Scene06Emotion } from "./scenes/Scene06Emotion";
import { Scene07CTA } from "./scenes/Scene07CTA";

/** Frames each scene overruns into the next so they cross-fade cleanly. */
const OVERLAP = 12;

/**
 * Wraps a scene in an opacity envelope so adjacent scenes blend through their
 * shared dark canvas — a soft, premium cross-fade with zero hard cuts.
 */
const SceneWrapper: React.FC<{
  duration: number;
  last?: boolean;
  children: React.ReactNode;
}> = ({ duration, last, children }) => {
  const frame = useCurrentFrame();
  const opacity = fadeInOut(frame, duration, {
    fadeIn: 10,
    fadeOut: last ? 1 : 16,
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

/**
 * AD VIDEO — master timeline.
 * Seven scenes, 30s, vertical 9:16. Each scene is self-contained and receives a
 * frame counter local to its Sequence, so timings inside a scene always read
 * from 0. Cross-fades come from the small OVERLAP overrun.
 */
export const AdVideo: React.FC = () => {
  const order = [
    { key: "hook", node: <Scene01Hook /> },
    { key: "problem", node: <Scene02Problem /> },
    { key: "solution", node: <Scene03Solution /> },
    { key: "magic", node: <Scene04MagicAI /> },
    { key: "result", node: <Scene05Result /> },
    { key: "emotion", node: <Scene06Emotion /> },
    { key: "cta", node: <Scene07CTA /> },
  ] as const;

  return (
    <AbsoluteFill style={{ backgroundColor: "#05060B" }}>
      {order.map((scene, i) => {
        const s = SCENES[scene.key];
        const last = i === order.length - 1;
        const duration = s.duration + (last ? 0 : OVERLAP);
        return (
          <Sequence key={scene.key} from={s.from} durationInFrames={duration} name={scene.key}>
            <SceneWrapper duration={duration} last={last}>
              {scene.node}
            </SceneWrapper>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
