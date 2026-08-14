/**
 * Wait until marketing assets are ready so the cube can keep solving
 * for the full load time instead of finishing early.
 */

const CRITICAL_ASSETS = [
  "/models/Iphone.glb",
  "/models/phone.glb",
  "/screens/home.png",
  "/screens/upload.png",
  "/screens/chat.png",
  "/screens/quiz.png",
  "/screens/practice.png",
  "/screens/mastery.png",
  "/screens/waitlist.png",
  "/screens/processing.png",
  "/mascot/chat.png",
  "/mascot/upload.png",
];

function loadUrl(url: string): Promise<void> {
  return new Promise((resolve) => {
    // Prefer fetch so GLB/binaries cache; images also fine
    fetch(url, { cache: "force-cache" })
      .then((res) => {
        if (!res.ok) {
          resolve();
          return;
        }
        return res.blob();
      })
      .then(() => resolve())
      .catch(() => resolve());
  });
}

function waitWindowLoad(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

function waitFonts(): Promise<void> {
  if (typeof document === "undefined" || !document.fonts?.ready) {
    return Promise.resolve();
  }
  return document.fonts.ready.then(() => undefined).catch(() => undefined);
}

/** Minimum time the cube should solve so the sequence never feels rushed */
export const MIN_CUBE_MS = 3200;

/**
 * Resolves when fonts, window load, critical assets, and min cube time are done.
 */
export async function waitForAppAssets(minMs = MIN_CUBE_MS): Promise<void> {
  const started = performance.now();

  await Promise.all([
    waitFonts(),
    waitWindowLoad(),
    Promise.all(CRITICAL_ASSETS.map(loadUrl)),
  ]);

  const elapsed = performance.now() - started;
  if (elapsed < minMs) {
    await new Promise((r) => setTimeout(r, minMs - elapsed));
  }
}
