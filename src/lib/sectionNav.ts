/**
 * Jump between story chapters by ScrollTrigger progress.
 * Targets mid-points of each chapter’s full-visibility window so text shows cleanly.
 */
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

export type StorySection = {
  id: string;
  label: string;
  /** Progress where that chapter is fully dominant (not mid-crossfade) */
  t: number;
};

/**
 * Must land mid exclusive hold (not in a crossfade gap).
 * Matches ScrollExperience fades:
 * hero 0–0.10 | upload 0.14–0.38 | chat 0.48–0.58
 * practice 0.62–0.72 | adaptive 0.76–0.84 | mastery 0.87–0.93 | cta 0.96–1
 */
export const STORY_SECTIONS: StorySection[] = [
  { id: "hero", label: "Hero", t: 0 },
  { id: "upload", label: "Upload", t: 0.26 },
  { id: "chat", label: "Ask Mee", t: 0.53 },
  { id: "practice", label: "Practice", t: 0.67 },
  { id: "adaptive", label: "Adaptive", t: 0.8 },
  { id: "mastery", label: "Mastery", t: 0.9 },
  { id: "cta", label: "Get started", t: 0.98 },
];

let storyST: ScrollTrigger | null = null;
let lenisRef: Lenis | null = null;

export function registerStoryScrollTrigger(st: ScrollTrigger | null) {
  storyST = st;
}

export function registerLenis(instance: Lenis | null) {
  lenisRef = instance;
}

/** Nearest section by current ST progress — last section whose t is at/before progress */
export function getCurrentSectionIndex(progress = storyST?.progress ?? 0): number {
  let idx = 0;
  for (let i = 0; i < STORY_SECTIONS.length; i++) {
    if (progress + 0.02 >= STORY_SECTIONS[i].t) idx = i;
  }
  return idx;
}

function scrollToProgress(t: number) {
  const st = storyST;
  if (!st) return;

  const clamped = Math.max(0, Math.min(1, t));
  const y = st.start + (st.end - st.start) * clamped;

  const settle = () => {
    // Force scrub/timeline to the exact progress after Lenis lands
    if (typeof st.scroll === "function") {
      try {
        st.scroll(y);
      } catch {
        /* ignore */
      }
    }
    st.update();
    // second tick after layout
    requestAnimationFrame(() => st.update());
  };

  if (lenisRef) {
    lenisRef.scrollTo(y, {
      duration: 0.85,
      force: true,
      lock: true,
      onComplete: settle,
    });
  } else {
    window.scrollTo({ top: y, behavior: "smooth" });
    window.setTimeout(settle, 500);
  }

  // Immediate ST nudge so pin doesn't lag a frame
  requestAnimationFrame(settle);
}

export function goToSection(index: number) {
  const i = Math.max(0, Math.min(STORY_SECTIONS.length - 1, index));
  scrollToProgress(STORY_SECTIONS[i].t);
  return i;
}

/** Explicit next from a known index (avoids mid-crossfade mis-detect) */
export function goNextFrom(index: number) {
  const next = index >= STORY_SECTIONS.length - 1 ? 0 : index + 1;
  return goToSection(next);
}

export function goNextSection() {
  return goNextFrom(getCurrentSectionIndex());
}

export function goPrevSection() {
  const cur = getCurrentSectionIndex();
  const prev = cur <= 0 ? STORY_SECTIONS.length - 1 : cur - 1;
  return goToSection(prev);
}
