import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, EASE } from "../theme";
import { Background } from "../components/Background";
import { Grain, Vignette } from "../components/Grain";
import { Stage } from "../components/Stage";
import { EuropeMap } from "../components/EuropeMap";
import { Readout } from "../components/Telemetry";
import { Headline, Kicker } from "../components/AnimatedText";
import { eased } from "../animations";

/**
 * SCENE 6 — LOGISTICS & RELIABILITY (20–25s)
 * "Stock. Fast delivery. Europe-wide service." A France hub dispatches cold-light
 * flows across Europe while live operational readouts build — deep stock,
 * 24–48h France, continent-wide coverage. The scale-and-reach proof beat.
 */
export const Scene06Logistics: React.FC = () => {
  const frame = useCurrentFrame();
  const mapProgress = eased(frame, [12, 110], [0, 1], EASE.soft);
  const units = Math.round(eased(frame, [16, 90], [0, 12000], EASE.soft));

  return (
    <AbsoluteFill>
      <Background tint="cold" intensity={0.95} grid />
      <Stage>
        {/* Map */}
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: eased(frame, [6, 20], [0, 1], EASE.expo),
            transform: `translateY(-120px)`,
          }}
        >
          <EuropeMap progress={mapProgress} size={820} />
        </AbsoluteFill>

        {/* Heading */}
        <AbsoluteFill
          style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 150 }}
        >
          <div style={{ textAlign: "center" }}>
            <Kicker text="Stock · Delivery · Service" delay={2} />
            <div style={{ height: 20 }} />
            <Headline text="Shipped across Europe." delay={6} size={78} tone="ink" maxWidth={820} />
          </div>
        </AbsoluteFill>

        {/* Operational readouts */}
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 210,
            flexDirection: "row",
            gap: 22,
            opacity: eased(frame, [40, 56], [0, 1], EASE.expo),
          }}
        >
          <Readout label="In stock" value={units.toLocaleString("en-US")} unit="+" accent={COLORS.red} width={300} />
          <Readout label="France" value="24–48" unit="H" accent={COLORS.cold} width={260} />
          <Readout label="Coverage" value="EU" unit="·wide" accent={COLORS.coldBright} width={260} />
        </AbsoluteFill>
      </Stage>
      <Vignette strength={0.6} />
      <Grain />
    </AbsoluteFill>
  );
};
