/**
 * Visual QA for marketing-v2 — captures hero → mid → late scroll on desktop + mobile.
 * Usage: pnpm qa  (uses :3011 unless QA_URL is set)
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "qa-shots");
const BASE = process.env.QA_URL || "http://127.0.0.1:3011";

async function waitForServer(url, ms = 60000) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      const r = await fetch(url);
      if (r.ok || r.status === 404) return true;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

async function ensureServer() {
  if (await waitForServer(BASE, 2000)) return null;
  const child = spawn("pnpm", ["exec", "vite", "--port", "3011", "--host", "127.0.0.1", "--strictPort"], {
    cwd: ROOT,
    stdio: "pipe",
    env: { ...process.env },
  });
  const ok = await waitForServer(BASE, 90000);
  if (!ok) {
    child.kill();
    throw new Error("Server failed to start on " + BASE);
  }
  return child;
}

async function capture(page, name) {
  const file = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  return file;
}

async function runViewport(browser, label, size, isMobile = false) {
  const context = await browser.newContext({
    viewport: size,
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
    isMobile,
    hasTouch: isMobile,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  // Wait for WebGL canvas
  await page.waitForSelector("#story .story-pin canvas", { timeout: 20000 });
  await page.waitForTimeout(1200);
  await capture(page, `${label}-01-hero`);

  const heights = await page.evaluate(() => {
    const story = document.querySelector(".story");
    return {
      story: story ? story.getBoundingClientRect().height + window.scrollY + story.scrollHeight : 5000,
      pin: document.querySelector(".story-pin")?.clientHeight || window.innerHeight,
      doc: document.documentElement.scrollHeight,
    };
  });

  // Scroll through story pin range (story height is pin + scroll length)
  const maxScroll = Math.max(heights.doc - size.height, 1);
  const fractions = [
    ["02-upload", 0.22],
    ["03-chat", 0.48],
    ["04-practice", 0.64],
    ["05-adaptive", 0.76],
    ["06-mastery", 0.86],
    ["07-cta", 0.97],
  ];

  for (const [name, f] of fractions) {
    await page.evaluate((y) => window.scrollTo(0, y), maxScroll * f);
    await page.waitForTimeout(900);
    await capture(page, `${label}-${name}`);
  }

  // Full page
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(OUT, `${label}-full.png`),
    fullPage: true,
  });

  await context.close();
  return errors;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const child = await ensureServer();
  const browser = await chromium.launch({ headless: true });
  const allErrors = [];

  try {
    allErrors.push(
      ...(await runViewport(browser, "desktop", { width: 1440, height: 900 }))
    );
    allErrors.push(
      ...(await runViewport(browser, "mobile", { width: 390, height: 844 }, true)),
      ...(await runViewport(browser, "mobile-landscape", { width: 844, height: 390 }, true))
    );
  } finally {
    await browser.close();
    if (child) child.kill();
  }

  const report = {
    base: BASE,
    errors: allErrors,
    shots: existsSync(OUT) ? (await import("node:fs")).readdirSync(OUT).filter((f) => f.endsWith(".png")) : [],
  };
  await writeFile(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (allErrors.length) {
    console.error("QA errors:", allErrors.length);
    process.exitCode = 1;
  } else {
    console.log("QA clean — shots in", OUT);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
