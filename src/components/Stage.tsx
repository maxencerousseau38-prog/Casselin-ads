import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { STAGE } from "../theme";

/**
 * Adaptive design canvas.
 *
 * Every scene is composed against a fixed 1080×1920 (9:16) space. The Stage
 * scales that space to fit whatever composition it runs inside and centers it,
 * so the exact same scene code renders correctly in the vertical master and in
 * the 16:9 master — the industrial Background fills the surrounding frame as
 * deliberate side framing. One source of truth, two deliverables.
 */
export const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { width, height } = useVideoConfig();
  const scale = Math.min(width / STAGE.width, height / STAGE.height);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          width: STAGE.width,
          height: STAGE.height,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
