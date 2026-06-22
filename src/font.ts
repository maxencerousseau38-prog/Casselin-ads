import { INTER_FACES } from "./fonts";

/**
 * Self-hosted Inter loader.
 *
 * The weights are embedded as base64 woff2 data URIs (see src/fonts.ts, built
 * from the vendored files in /public/fonts). Registering them through the
 * FontFace API from memory means there is no network dependency on the render
 * farm, where Google Fonts' CDN is unreachable. Remotion's built-in font
 * readiness check waits for these in-memory faces to decode before capturing a
 * frame, so we register and trigger the load without blocking the render
 * ourselves (a module-scoped delayRender proved flaky across long renders).
 */
let started = false;

export const loadInter = () => {
  if (started || typeof document === "undefined") return;
  started = true;

  for (const { weight, dataUrl } of INTER_FACES) {
    const face = new FontFace("Inter", `url(${dataUrl}) format("woff2")`, {
      weight: String(weight),
      style: "normal",
      display: "block",
    });
    (document.fonts as FontFaceSet).add(face);
    void face.load();
  }
};
