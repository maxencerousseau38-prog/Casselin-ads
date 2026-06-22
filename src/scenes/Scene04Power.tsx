import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, EASE, FONT } from "../theme";
import { Background, rgba } from "../components/Background";
import { Grain, Vignette } from "../components/Grain";
import { Stage } from "../components/Stage";
import { SteelPanel } from "../components/SteelPanel";
import { EquipmentIcon } from "../components/Equipment";
import { Readout, Bar } from "../components/Telemetry";
import { Headline, Kicker } from "../components/AnimatedText";
import { eased, floaty, springScale } from "../animations";

/**
 * SCENE 4 — INDUSTRIAL POWER (10–15s)
 * "Designed for professionals." A single Casselin unit close-up runs under load:
 * temperature climbs, power draw holds at the line, a duty bar pulses — the
 * instrumented proof of intensive, all-service performance. Slow cinematic push.
 */
export const Scene04Power: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pushIn = eased(frame, [0, 150], [1.06, 1], EASE.soft);
  const temp = Math.round(eased(frame, [14, 70], [40, 320], EASE.soft));
  const power = eased(frame, [20, 60], [0, 0.86], EASE.soft);
  const duty = 0.7 + Math.sin(frame * 0.18) * 0.12;
  const heat = 0.5 + Math.sin(frame * 0.12) * 0.08;

  return (
    <AbsoluteFill>
      <Background tint="warm" intensity={0.7} />
      <Stage>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 56,
            padding: 70,
            transform: `scale(${pushIn})`,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Kicker text="Built to run all service" delay={2} color={COLORS.red} />
            <div style={{ height: 22 }} />
            <Headline text="Designed for professionals." delay={6} size={84} tone="ink" maxWidth={820} />
          </div>

          <SteelPanel
            radius={28}
            glow={rgba(COLORS.red, 0.22)}
            style={{
              width: 860,
              padding: 40,
              opacity: eased(frame, [10, 22], [0, 1], EASE.expo),
              transform: `scale(${springScale(frame, fps, { delay: 10, from: 0.95, to: 1 })})`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
              {/* Hero unit, running hot */}
              <div
                style={{
                  position: "relative",
                  transform: `translateY(${floaty(frame, 4, 0.05)}px)`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: -30,
                    borderRadius: 40,
                    background: `radial-gradient(circle, ${rgba(COLORS.red, 0.35 * heat)} 0%, transparent 70%)`,
                  }}
                />
                <EquipmentIcon name="oven" size={300} />
              </div>

              {/* Live telemetry column */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "flex", gap: 16 }}>
                  <Readout label="Core temp" value={`${temp}`} unit="°C" accent={COLORS.red} width={180} />
                  <Readout label="Power" value="9.0" unit="kW" accent={COLORS.cold} width={180} />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: FONT.family,
                      fontSize: 18,
                      fontWeight: 600,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: COLORS.inkFaint,
                      marginBottom: 10,
                    }}
                  >
                    <span>Power draw</span>
                    <span style={{ color: COLORS.cold }}>{Math.round(power * 100)}%</span>
                  </div>
                  <Bar value={power} accent={COLORS.cold} height={10} />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: FONT.family,
                      fontSize: 18,
                      fontWeight: 600,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: COLORS.inkFaint,
                      marginBottom: 10,
                    }}
                  >
                    <span>Duty cycle</span>
                    <span style={{ color: COLORS.red }}>HEAVY</span>
                  </div>
                  <Bar value={duty} accent={COLORS.red} height={10} />
                </div>
              </div>
            </div>
          </SteelPanel>
        </AbsoluteFill>
      </Stage>
      <Vignette strength={0.6} />
      <Grain />
    </AbsoluteFill>
  );
};
