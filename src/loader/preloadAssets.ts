
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

export const MIN_CUBE_MS = 3200;
export const MIN_CUBE_MS_MOBILE = 2100;

function defaultMinCubeMs(): number {
  if (typeof window === "undefined") return MIN_CUBE_MS;
  const phone = window.matchMedia(
    "(max-width: 768px), (max-height: 500px) and (pointer: coarse)",
  ).matches;
  return phone ? MIN_CUBE_MS_MOBILE : MIN_CUBE_MS;
}

export async function waitForAppAssets(minMs?: number): Promise<void> {
  const floor = minMs ?? defaultMinCubeMs();
  const started = performance.now();

  await Promise.all([
    waitFonts(),
    waitWindowLoad(),
    Promise.all(CRITICAL_ASSETS.map(loadUrl)),
  ]);

  const elapsed = performance.now() - started;
  if (elapsed < floor) {
    await new Promise((r) => setTimeout(r, floor - elapsed));
  }
}
