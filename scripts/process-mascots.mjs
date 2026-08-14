/**
 * Strip near-black plates + Grok corner watermarks from mascot PNGs.
 * Seeds from ../public/mascot when available, writes cleaned files in place.
 * Raw originals kept in public/mascot/_raw/
 */
import sharp from "sharp";
import { readdirSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, "../public/mascot");
const RAW = path.join(DIR, "_raw");
const PARENT = path.resolve(__dirname, "../../public/mascot");

async function processOne(file) {
  const src = path.join(DIR, file);
  const rawPath = path.join(RAW, file);
  const parentPath = path.join(PARENT, file);

  // Prefer parent repo original once for raw backup
  if (existsSync(parentPath) && !existsSync(rawPath)) {
    copyFileSync(parentPath, rawPath);
  } else if (!existsSync(rawPath) && existsSync(src)) {
    copyFileSync(src, rawPath);
  }

  const input = existsSync(rawPath) ? rawPath : src;
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Knock out near-black background
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max < 28) {
      data[i + 3] = 0;
      continue;
    }
    if (max < 55 && max - min < 16) {
      data[i + 3] = Math.min(data[i + 3], Math.floor(max * 3));
    }
  }

  // Hard wipe bottom-right watermark box
  const x0 = Math.floor(width * 0.72);
  const y0 = Math.floor(height * 0.88);
  for (let y = y0; y < height; y++) {
    for (let x = x0; x < width; x++) {
      data[(y * width + x) * channels + 3] = 0;
    }
  }
  // Slightly higher band — clear non-purple residual logo pixels
  const x1 = Math.floor(width * 0.78);
  const y1 = Math.floor(height * 0.84);
  for (let y = y1; y < y0; y++) {
    for (let x = x1; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const sat = Math.max(r, g, b) - Math.min(r, g, b);
      if (sat < 50 || b < 140) data[i + 3] = 0;
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(src);

  console.log("cleaned", file);
}

async function main() {
  mkdirSync(RAW, { recursive: true });
  const files = readdirSync(DIR).filter((f) => f.endsWith(".png"));
  for (const f of files) await processOne(f);
  console.log("Done", files.length, "mascots");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
