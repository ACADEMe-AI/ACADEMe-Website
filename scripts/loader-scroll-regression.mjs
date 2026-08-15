/**
 * Regression: after park, loader canvas stays 720@360 through scroll down + force up.
 * Run: pnpm dev (port 3010) then `node scripts/loader-scroll-regression.mjs`
 * Exit 0 = pass, 1 = fail.
 */
import { chromium } from "playwright";

const BASE = process.env.QA_URL || "http://127.0.0.1:3010";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function measure(page) {
  return page.evaluate(() => {
    const canvas = document.querySelector(".brand-loader-stage canvas");
    const outer = document.querySelector(".brand-loader-stage");
    const pocket = document.querySelector("[data-pocket-logo]");
    if (!canvas || !outer) return { ok: false, reason: "missing stage/canvas" };
    const or = outer.getBoundingClientRect();
    const pr = pocket?.getBoundingClientRect();
    return {
      ok: true,
      buf: canvas.width,
      cssW: canvas.style.width || getComputedStyle(canvas).width,
      outerW: Math.round(or.width),
      outerL: Math.round(or.left),
      pocketW: pr ? Math.round(pr.width) : null,
      parent: outer.parentElement?.tagName,
      parked: outer.classList.contains("brand-loader-stage--parked"),
    };
  });
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

try {
  await page.goto(`${BASE}/?loader=0&t=${Date.now()}`, {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.waitForTimeout(2000);

  const parked = await measure(page);
  assert(parked.ok, parked.reason || "park measure failed");
  assert(parked.parked, "stage should be parked");
  assert(parked.parent === "BODY", `expected BODY host, got ${parked.parent}`);
  assert(parked.buf === 720, `expected buffer 720, got ${parked.buf}`);
  assert(
    String(parked.cssW).includes("360"),
    `expected CSS 360px, got ${parked.cssW}`,
  );
  const size0 = parked.outerW;

  // scroll down a little
  for (let i = 0; i < 4; i++) {
    await page.mouse.wheel(0, 350);
    await page.waitForTimeout(100);
  }
  const down = await measure(page);
  assert(down.buf === 720, `after down: buffer ${down.buf}`);
  assert(down.outerW === size0, `after down: outerW ${down.outerW} vs ${size0}`);

  // force scroll up
  for (let i = 0; i < 20; i++) {
    await page.mouse.wheel(0, -600);
    await page.waitForTimeout(50);
  }
  const up = await measure(page);
  assert(up.buf === 720, `after force-up: buffer ${up.buf} (got shrink bug)`);
  assert(
    String(up.cssW).includes("360"),
    `after force-up: CSS ${up.cssW}`,
  );
  assert(up.outerW === size0, `after force-up: outerW ${up.outerW} vs ${size0}`);

  console.log("PASS loader-scroll-regression", {
    parked,
    down: { buf: down.buf, outerW: down.outerW },
    up: { buf: up.buf, outerW: up.outerW, cssW: up.cssW },
  });
  process.exitCode = 0;
} catch (e) {
  console.error("FAIL", e.message || e);
  process.exitCode = 1;
} finally {
  await browser.close();
}
