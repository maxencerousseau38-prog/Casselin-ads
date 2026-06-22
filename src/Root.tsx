import React from "react";
import { Composition } from "remotion";
import { AdVideo } from "./Video";
import { VIDEO, VIDEO_WIDE } from "./theme";
import { loadInter } from "./font";

// Preload self-hosted Inter so text metrics are correct on the very first frame.
loadInter();

/**
 * Two masters from one timeline:
 *   AdVideo      — vertical 9:16 (TikTok / Reels / Shorts, in-store displays)
 *   AdVideoWide  — 16:9 (YouTube, web, trade-show loops)
 * Both share the adaptive Stage, so the film stays identical and on-brand.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AdVideo"
        component={AdVideo}
        durationInFrames={VIDEO.durationInFrames}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />
      <Composition
        id="AdVideoWide"
        component={AdVideo}
        durationInFrames={VIDEO_WIDE.durationInFrames}
        fps={VIDEO_WIDE.fps}
        width={VIDEO_WIDE.width}
        height={VIDEO_WIDE.height}
      />
    </>
  );
};
