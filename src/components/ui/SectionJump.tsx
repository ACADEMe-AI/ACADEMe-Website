import { useEffect, useState } from "react";
import {
  STORY_SECTIONS,
  getCurrentSectionIndex,
  goNextFrom,
  goToSection,
} from "../../lib/sectionNav";

/**
 * Bottom-right scroll control — glass blur, continuous arrow motion.
 */
export function SectionJump() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const sync = () => setIndex(getCurrentSectionIndex());
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    const id = window.setInterval(sync, 180);
    return () => {
      window.removeEventListener("scroll", sync);
      window.clearInterval(id);
    };
  }, []);

  const next = STORY_SECTIONS[Math.min(index + 1, STORY_SECTIONS.length - 1)];
  const isLast = index >= STORY_SECTIONS.length - 1;

  return (
    <div className="section-jump-corner">
      <button
        type="button"
        className={`section-jump-btn ${isLast ? "is-up" : "is-down"}`}
        onClick={() => {
          if (isLast) {
            setIndex(goToSection(0));
            return;
          }
          setIndex(goNextFrom(index));
        }}
        aria-label={isLast ? "Back to top" : `Next section: ${next?.label ?? "next"}`}
        title={isLast ? "Back to top" : `Next: ${next?.label}`}
      >
        <span className="section-jump-icon" aria-hidden>
          {isLast ? (
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 19V5m0 0l-5 5m5-5l5 5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14m0 0l5-5m-5 5l-5-5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
