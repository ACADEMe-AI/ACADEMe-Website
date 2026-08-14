import { useEffect } from "react";
import { scrollState } from "../../lib/scrollState";

/**
 * v3-style top progress line.
 * Uses GPU transform: scaleX(progress) from the left — not width%.
 * Same pattern as v3 `story-progress` + rAF tick on scrollState.progress.
 */
export function ScrollProgress() {
  useEffect(() => {
    let raf = 0;
    const bar = document.getElementById("story-progress");
    if (!bar) return;

    const tick = () => {
      const p = Math.max(0, Math.min(1, scrollState.progress));
      bar.style.transform = `scaleX(${p})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      id="story-progress"
      className="story-progress"
      role="progressbar"
      aria-label="Story scroll progress"
      aria-hidden
    />
  );
}
