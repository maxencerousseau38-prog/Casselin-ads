import React from "react";
import { COLORS } from "../theme";
import { rgba } from "./Background";

/**
 * Stainless-steel equipment illustrations.
 *
 * Clean, schematic line-drawings of real Casselin gear rendered like an
 * engineering catalogue: cool steel strokes, a faint inox fill and one precise
 * red control accent. Drawn on a shared 120×120 grid so they line up perfectly
 * in product rows and range segmentation. No bitmaps — everything is vector, so
 * it stays razor sharp at any scale and renders identically on the farm.
 */

export type EquipmentName =
  | "fryer"
  | "grill"
  | "oven"
  | "toaster"
  | "bainmarie"
  | "slicer"
  | "mixer"
  | "fridge"
  | "dishwasher"
  | "display"
  | "griddle"
  | "panini";

const S = COLORS.steel; // stroke
const F = rgba(COLORS.steelHi, 0.05); // inox body fill
const A = COLORS.red; // control accent

const stroke = {
  stroke: S,
  strokeWidth: 3,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};
const line = { ...stroke, fill: "none" as const };

const Dot: React.FC<{ cx: number; cy: number; r?: number; on?: boolean }> = ({
  cx,
  cy,
  r = 3,
  on = true,
}) => <circle cx={cx} cy={cy} r={r} fill={on ? A : S} />;

const PARTS: Record<EquipmentName, React.ReactNode> = {
  fryer: (
    <>
      <rect x={26} y={40} width={68} height={62} rx={6} fill={F} {...stroke} />
      <rect x={34} y={48} width={52} height={30} rx={4} {...line} />
      <path d="M34 48 H86" {...line} />
      <line x1={48} y1={40} x2={48} y2={30} {...line} />
      <line x1={72} y1={40} x2={72} y2={30} {...line} />
      <path d="M44 30 H76" {...line} />
      <rect x={34} y={84} width={52} height={10} rx={3} fill={rgba(S, 0.12)} {...stroke} />
      <Dot cx={44} cy={89} r={3} />
      <Dot cx={58} cy={89} r={3} on={false} />
    </>
  ),
  grill: (
    <>
      <rect x={20} y={56} width={80} height={30} rx={5} fill={F} {...stroke} />
      <path d="M30 56 V46 H90 V56" {...line} />
      {[36, 48, 60, 72, 84].map((x) => (
        <line key={x} x1={x} y1={46} x2={x} y2={56} {...line} />
      ))}
      <line x1={20} y1={86} x2={100} y2={86} {...line} />
      <Dot cx={88} cy={71} />
    </>
  ),
  oven: (
    <>
      <rect x={24} y={28} width={72} height={76} rx={7} fill={F} {...stroke} />
      <rect x={34} y={48} width={52} height={46} rx={5} {...line} />
      <path d="M34 44 H86" {...line} />
      <line x1={40} y1={37} x2={56} y2={37} {...line} />
      <Dot cx={74} cy={37} />
      <Dot cx={84} cy={37} on={false} />
    </>
  ),
  toaster: (
    <>
      <rect x={28} y={44} width={64} height={40} rx={6} fill={F} {...stroke} />
      <line x1={28} y1={64} x2={92} y2={64} {...line} />
      <path d="M40 44 V36 H80 V44" {...line} />
      <line x1={84} y1={50} x2={84} y2={78} {...line} strokeWidth={5} />
      <Dot cx={62} cy={54} on={false} />
    </>
  ),
  bainmarie: (
    <>
      <rect x={22} y={50} width={76} height={46} rx={6} fill={F} {...stroke} />
      <rect x={30} y={42} width={60} height={16} rx={4} {...line} />
      <path
        d="M34 50 q7 -7 14 0 t14 0 t14 0"
        fill="none"
        stroke={COLORS.cold}
        strokeWidth={2.5}
      />
      <line x1={18} y1={50} x2={22} y2={50} {...line} />
      <line x1={98} y1={50} x2={102} y2={50} {...line} />
      <Dot cx={84} cy={86} />
    </>
  ),
  slicer: (
    <>
      <circle cx={52} cy={58} r={26} fill={F} {...stroke} />
      <circle cx={52} cy={58} r={11} {...line} />
      <rect x={70} y={40} width={26} height={48} rx={5} {...line} />
      <line x1={76} y1={52} x2={90} y2={52} {...line} />
      <line x1={76} y1={64} x2={90} y2={64} {...line} />
      <Dot cx={83} cy={78} />
    </>
  ),
  mixer: (
    <>
      <path d="M30 100 H78 L72 70 H36 Z" fill={F} {...stroke} />
      <path d="M40 70 V40 H86" {...line} />
      <rect x={78} y={32} width={18} height={20} rx={4} {...line} />
      <path d="M52 74 v18 M62 74 v18" {...line} strokeWidth={2.5} />
      <Dot cx={87} cy={42} />
    </>
  ),
  fridge: (
    <>
      <rect x={34} y={20} width={52} height={84} rx={7} fill={F} {...stroke} />
      <line x1={34} y1={60} x2={86} y2={60} {...line} />
      <line x1={44} y1={30} x2={44} y2={50} {...line} strokeWidth={5} />
      <line x1={44} y1={70} x2={44} y2={94} {...line} strokeWidth={5} />
      <Dot cx={76} cy={28} />
    </>
  ),
  dishwasher: (
    <>
      <rect x={28} y={26} width={64} height={78} rx={7} fill={F} {...stroke} />
      <rect x={36} y={48} width={48} height={48} rx={5} {...line} />
      <path d="M36 44 H84" {...line} />
      <circle cx={60} cy={72} r={9} {...line} />
      <Dot cx={44} cy={36} />
      <Dot cx={54} cy={36} on={false} />
    </>
  ),
  display: (
    <>
      <path d="M24 96 V58 L44 44 H100 V96 Z" fill={F} {...stroke} />
      <path d="M44 44 V96" {...line} />
      <line x1={44} y1={66} x2={100} y2={66} {...line} />
      <line x1={44} y1={82} x2={100} y2={82} {...line} />
      <Dot cx={92} cy={52} />
    </>
  ),
  griddle: (
    <>
      <ellipse cx={56} cy={62} rx={34} ry={12} fill={F} {...stroke} />
      <ellipse cx={56} cy={56} rx={34} ry={12} {...line} />
      <path d="M90 56 H104" {...line} strokeWidth={5} />
      <Dot cx={56} cy={56} r={3} on={false} />
    </>
  ),
  panini: (
    <>
      <path d="M30 72 H92 L86 84 H36 Z" fill={F} {...stroke} />
      <path d="M30 60 H92 L96 46 H34 Z" {...line} />
      <line x1={62} y1={46} x2={62} y2={32} {...line} />
      <path d="M52 32 H72" {...line} />
      <Dot cx={84} cy={78} />
    </>
  ),
};

export const EQUIPMENT: { name: EquipmentName; label: string }[] = [
  { name: "fryer", label: "Fryers" },
  { name: "grill", label: "Grills" },
  { name: "oven", label: "Ovens" },
  { name: "toaster", label: "Toasters" },
  { name: "bainmarie", label: "Bain-marie" },
  { name: "panini", label: "Panini" },
  { name: "griddle", label: "Crêpe" },
  { name: "slicer", label: "Slicers" },
  { name: "mixer", label: "Mixers" },
  { name: "fridge", label: "Cold" },
  { name: "display", label: "Display" },
  { name: "dishwasher", label: "Washing" },
];

export const EquipmentIcon: React.FC<{
  name: EquipmentName;
  size?: number;
  style?: React.CSSProperties;
}> = ({ name, size = 120, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    style={style}
    aria-hidden
  >
    {PARTS[name]}
  </svg>
);
