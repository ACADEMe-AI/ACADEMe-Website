import type { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

export type StorySection = {
  id: string;
  label: string;
    t: number;
};

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
const progressListeners = new Set<(progress: number) => void>();

export function registerStoryScrollTrigger(st: ScrollTrigger | null) {
  storyST = st;
}

export function registerLenis(instance: Lenis | null) {
  lenisRef = instance;
}

export function onStoryProgress(fn: (progress: number) => void) {
  progressListeners.add(fn);
  return () => progressListeners.delete(fn);
}

export function notifyStoryProgress(progress: number) {
  progressListeners.forEach((fn) => fn(progress));
}

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
    if (typeof st.scroll === "function") {
      try {
        st.scroll(y);
      } catch {
              }
    }
    st.update();
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

  requestAnimationFrame(settle);
}

export function goToSection(index: number) {
  const i = Math.max(0, Math.min(STORY_SECTIONS.length - 1, index));
  scrollToProgress(STORY_SECTIONS[i].t);
  return i;
}

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
