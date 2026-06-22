import React from "react";
import { Composition } from "remotion";
import { AdVideo } from "./Video";
import { VIDEO } from "./theme";
import { loadInter } from "./font";

// Preload self-hosted Inter so text metrics are correct on the very first frame.
loadInter();

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AdVideo"
      component={AdVideo}
      durationInFrames={VIDEO.durationInFrames}
      fps={VIDEO.fps}
      width={VIDEO.width}
      height={VIDEO.height}
    />
  );
};
