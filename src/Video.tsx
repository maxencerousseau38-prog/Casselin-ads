import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { COLORS, SCENES } from "./theme";
import { fadeInOut } from "./animations";
import { Scene01Impact } from "./scenes/Scene01Impact";
import { Scene02Promise } from "./scenes/Scene02Promise";
import { Scene03Solution } from "./scenes/Scene03Solution";
import { Scene04Power } from "./scenes/Scene04Power";
import { Scene05Ecosystem } from "./scenes/Scene05Ecosystem";
import { Scene06Logistics } from "./scenes/Scene06Logistics";
import { Scene07Brand } from "./scenes/Scene07Brand";

/** Frames each scene overruns into the next so they cross-fade cleanly. */
const OVERLAP = 12;

/**
 * Wraps a scene in an opacity envelope so adjacent scenes blend through their
 * shared dark canvas — a clean, premium cross-fade with zero hard cuts.
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
 * CASSELIN AD — master timeline.
 *
 * Seven scenes, 30s. Each scene is self-contained, composes on the adaptive
 * Stage (so the identical code drives both the 9:16 and 16:9 masters) and
 * receives a frame counter local to its Sequence. Cross-fades come from the
 * small OVERLAP overrun through the shared industrial canvas.
 */
export const AdVideo: React.FC = () => {
  const order = [
    { key: "impact", node: <Scene01Impact /> },
    { key: "promise", node: <Scene02Promise /> },
    { key: "solution", node: <Scene03Solution /> },
    { key: "power", node: <Scene04Power /> },
    { key: "ecosystem", node: <Scene05Ecosystem /> },
    { key: "logistics", node: <Scene06Logistics /> },
    { key: "brand", node: <Scene07Brand /> },
  ] as const;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.base }}>
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
