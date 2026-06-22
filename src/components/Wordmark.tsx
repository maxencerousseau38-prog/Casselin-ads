import React from "react";
import { Img, staticFile } from "remotion";
import { COLORS, LOGO } from "../theme";
import { rgba } from "./Background";

/**
 * Casselin brand lockup — the real logo.
 *
 * The official white "CASSELIN" wordmark inside its tricolore bracket frame
 * (blue + red), as used on the brand's own site. Rendered from the downloaded
 * asset with a soft cold halo so it sits cleanly on the dark industrial canvas.
 * Native aspect ratio ≈ 4.99:1.
 */
export const Wordmark: React.FC<{
  width?: number;
  glow?: boolean;
  style?: React.CSSProperties;
}> = ({ width = 720, glow = true, style }) => {
  return (
    <div style={{ position: "relative", width, ...style }}>
      <Img
        src={staticFile(LOGO)}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          filter: glow
            ? `drop-shadow(0 6px 40px ${rgba(COLORS.cold, 0.35)}) drop-shadow(0 2px 10px ${rgba(
                COLORS.base,
                0.6,
              )})`
            : "none",
        }}
      />
    </div>
  );
};
