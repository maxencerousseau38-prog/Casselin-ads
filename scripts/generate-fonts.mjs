// Regenerates src/fonts.ts by base64-encoding the vendored Inter woff2 weights.
// Run from the project root:  node scripts/generate-fonts.mjs
import { readFileSync, writeFileSync } from "fs";

const WEIGHTS = [400, 500, 600, 700, 800];

let ts =
  "// Auto-generated: self-hosted Inter as base64 woff2 data URIs. Do not edit by hand.\n" +
  "// Regenerate with: node scripts/generate-fonts.mjs\n\n" +
  "export const INTER_FACES: { weight: number; dataUrl: string }[] = [\n";

for (const w of WEIGHTS) {
  const b64 = readFileSync(`public/fonts/inter-latin-${w}-normal.woff2`).toString("base64");
  ts += `  { weight: ${w}, dataUrl: "data:font/woff2;base64,${b64}" },\n`;
}
ts += "];\n";

writeFileSync("src/fonts.ts", ts);
console.log("Wrote src/fonts.ts");
