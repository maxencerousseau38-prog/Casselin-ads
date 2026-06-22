import { Config } from "@remotion/cli/config";

/**
 * Render configuration tuned for crisp, high-bitrate vertical output
 * suitable for TikTok / Reels / Shorts upload pipelines.
 */
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setOverwriteOutput(true);
Config.setColorSpace("bt709");
Config.setCodec("h264");
Config.setCrf(17);
