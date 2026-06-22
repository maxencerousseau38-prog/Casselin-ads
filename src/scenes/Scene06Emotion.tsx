import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, EASE, GRADIENTS } from "../theme";
import { Background, rgba } from "../components/Background";
import { Grain, Vignette } from "../components/Grain";
import { Headline } from "../components/AnimatedText";
import { eased, floaty, springScale } from "../animations";

/**
 * SCENE 6 — EMOTION / IMPACT (20–25s)
 * Aspirational beat. The site lives across phone, laptop and tablet, floating
 * in light. A slow cinematic push-in plus a luminous bloom sells the feeling of
 * "you just launched something serious".
 */
export const Scene06Emotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow cinematic zoom across the whole scene.
  const zoom = eased(frame, [0, 150], [1.12, 1.0], EASE.inOut);
  // Light bloom that swells then settles.
  const bloom = eased(frame, [0, 40], [0, 1], EASE.expo);

  return (
    <AbsoluteFill>
      <Background tint="warm" intensity={1.1} />

      {/* Central bloom */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            width: 1100,
            height: 1100,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${rgba(COLORS.violet, 0.45)} 0%, transparent 62%)`,
            opacity: bloom,
            filter: "blur(20px)",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${zoom})`,
        }}
      >
        <div style={{ position: "relative", width: 900, height: 700 }}>
          {/* Tablet (back-left) */}
          <Device
            frame={frame}
            fps={fps}
            delay={6}
            style={{ left: -40, top: 120, width: 360, height: 470 }}
            rotate={-9}
            phase={0.4}
          >
            <DeviceContent variant="tablet" />
          </Device>

          {/* Laptop (center) */}
          <Device
            frame={frame}
            fps={fps}
            delay={0}
            style={{ left: 250, top: 70, width: 540, height: 360 }}
            rotate={3}
            phase={0}
            laptop
          >
            <DeviceContent variant="laptop" />
          </Device>

          {/* Phone (front-right) */}
          <Device
            frame={frame}
            fps={fps}
            delay={12}
            style={{ left: 600, top: 250, width: 230, height: 470 }}
            rotate={8}
            phase={1.1}
          >
            <DeviceContent variant="phone" />
          </Device>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 280 }}>
        <Headline
          text="Launch like a billion-dollar startup."
          delay={18}
          size={84}
          stagger={3}
          gradient
          maxWidth={820}
        />
      </AbsoluteFill>

      <Vignette strength={0.5} />
      <Grain />
    </AbsoluteFill>
  );
};

const Device: React.FC<{
  frame: number;
  fps: number;
  delay: number;
  rotate: number;
  phase: number;
  laptop?: boolean;
  style: React.CSSProperties;
  children: React.ReactNode;
}> = ({ frame, fps, delay, rotate, phase, laptop, style, children }) => {
  const s = springScale(frame, fps, { delay, from: 0.8, to: 1 });
  const op = eased(frame, [delay, delay + 16], [0, 1], EASE.expo);
  const y = floaty(frame, 10, 0.035, phase);

  return (
    <div
      style={{
        position: "absolute",
        transform: `translateY(${y}px) rotate(${rotate}deg) scale(${s})`,
        opacity: op,
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: laptop ? 18 : 34,
          background: "#0B0D18",
          border: `2px solid ${rgba("#FFFFFF", 0.16)}`,
          boxShadow: `0 50px 130px rgba(0,0,0,0.6), inset 0 1px 0 ${COLORS.glassStrokeBright}`,
          overflow: "hidden",
          padding: laptop ? 12 : 8,
        }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: laptop ? 8 : 26, overflow: "hidden" }}>
          {children}
        </div>
      </div>
      {laptop && (
        <div
          style={{
            width: "118%",
            height: 16,
            marginLeft: "-9%",
            marginTop: 4,
            borderRadius: "0 0 14px 14px",
            background: "linear-gradient(180deg, #20243A, #0B0D18)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          }}
        />
      )}
    </div>
  );
};

const DeviceContent: React.FC<{ variant: "phone" | "laptop" | "tablet" }> = ({ variant }) => {
  const big = variant === "laptop";
  return (
    <div style={{ width: "100%", height: "100%", background: COLORS.baseSoft, display: "flex", flexDirection: "column" }}>
      <div style={{ height: big ? 130 : 150, background: GRADIENTS.brand, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 80% at 30% 20%, rgba(255,255,255,0.3), transparent 60%)" }} />
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ height: 18, width: "70%", borderRadius: 6, background: rgba("#FFFFFF", 0.8) }} />
        <div style={{ height: 10, width: "90%", borderRadius: 5, background: rgba("#FFFFFF", 0.2) }} />
        <div style={{ height: 10, width: "82%", borderRadius: 5, background: rgba("#FFFFFF", 0.2) }} />
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          {[COLORS.cyan, COLORS.violet, COLORS.pink].map((c) => (
            <div key={c} style={{ flex: 1, height: big ? 60 : 70, borderRadius: 8, background: rgba(c, 0.7) }} />
          ))}
        </div>
      </div>
    </div>
  );
};
