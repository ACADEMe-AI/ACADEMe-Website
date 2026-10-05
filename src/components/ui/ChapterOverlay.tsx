import { useEffect, useRef } from "react";
import { WAITLIST_URL } from "../../lib/constants";
import { registerPocket } from "../../loader/pocketRegistry";
import { openQrModal } from "./QrModal";

function Mee({ src, className = "chapter-mee" }: { src: string; className?: string }) {
  return (
    <img
      className={className}
      src={src}
      alt=""
      width={112}
      height={120}
      decoding="async"
      aria-hidden
    />
  );
}

export function ChapterOverlay() {
  const pocketRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerPocket(pocketRef.current);
    return () => registerPocket(null);
  }, []);

  return (
    <div className="chapter-layer" aria-live="polite">
      {}
      <div className="chapter chapter-hero" data-chapter="hero">
        <div className="hero-headline">
          <h1>
            <span className="hero-line">Study smarter.</span>
            <span className="hero-line">
              In your{" "}
              {}
              <span
                ref={pocketRef}
                className="hero-logo-mark"
                role="img"
                aria-label="ACADEMe"
                title="ACADEMe"
                tabIndex={0}
                data-pocket-logo="loader-live"
              />{" "}
              pocket.
            </span>
          </h1>
        </div>

        <div className="hero-bottom-left">
          <p className="hero-lede">
            Swipe lessons from your syllabus, Pebby when you&apos;re stuck, and
            board-style marks on your answers. Class 6 to 12, CBSE, ICSE and ISC.
          </p>
          <div className="hero-cta-row">
            <a className="btn-flow primary" href={WAITLIST_URL} target="_blank" rel="noreferrer">
              <span className="btn-flow-label">Start For Free</span>
            </a>
            <button
              type="button"
              className="btn-flow icon"
              id="hero-qr-trigger"
              aria-label="Show QR code"
              title="Scan to join"
              onClick={(e) => openQrModal(e.currentTarget)}
            >
              <span className="btn-flow-label" aria-hidden>
                <svg className="btn-flow-icon" viewBox="0 0 24 24" fill="none">
                  <rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
                  <rect x="13.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
                  <rect x="3.5" y="13.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M14 14h2.5v2.5H14V14zm4 0H20v2.5h-2V14zm-4 4H16.5V20H14v-2zm4 0H20V20h-2v-2z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </button>
          </div>
          <p className="hero-micro">No credit card required</p>
        </div>
      </div>

      {}
      <div className="chapter chapter-feature chapter-upload" data-chapter="upload">
        <div className="chapter-stage stage-left">
          <div className="type-block">
            <Mee src="/mascot/upload.png" />
            <h2 className="display">
              Your chapters,
              <br />
              one swipe at a time.
            </h2>
            <p className="lede tight">
              Your board&apos;s 2026-27 syllabus, chapter by chapter. Each lesson
              is a few cards: an idea, a worked example, a quick check.
            </p>
          </div>
        </div>
      </div>

      {}
      <div className="chapter chapter-feature chapter-chat" data-chapter="chat">
        <div className="chapter-stage stage-right">
          <div className="type-block type-right">
            <Mee src="/mascot/chat.png" />
            <h2 className="display">
              Stuck?
              <br />
              Ask Pebby.
            </h2>
            <p className="lede tight">
              Explain it simply, solve it with hints first, or quiz me. Pebby
              answers for your class and board, in English, हिन्दी, తెలుగు,
              தமிழ் or বাংলা.
            </p>
          </div>
        </div>
      </div>

      {}
      <div className="chapter chapter-cinematic chapter-practice" data-chapter="practice">
        <div className="chapter-stage stage-practice">
          <div className="type-block type-practice">
            <Mee src="/mascot/practice.png" />
            <h2 className="display display-cinematic">
              Snap it.
              <br />
              Get marked.
            </h2>
            <p className="lede tight">
              Snap your written answer and see the marks it would get under the
              CBSE or ICSE scheme, point by point. Stuck on homework? Get hints,
              not just answers.
            </p>
          </div>
        </div>
      </div>

      {}
      <div className="chapter chapter-feature chapter-adaptive" data-chapter="adaptive">
        <div className="chapter-stage stage-right">
          <div className="type-block type-right">
            <Mee src="/mascot/adaptive.png" />
            <h2 className="display">
              Miss it once.
              <br />
              Master it later.
            </h2>
            <p className="lede tight">
              Keep any card. Every question you miss comes back in your
              revision: tomorrow, then a few days later, until you&apos;ve got it.
            </p>
          </div>
        </div>
      </div>

      {}
      <div className="chapter chapter-feature chapter-mastery" data-chapter="mastery">
        <div className="chapter-stage stage-left stage-mastery">
          <div className="type-block">
            <Mee src="/mascot/mastery.png" />
            <h2 className="display">
              Test on Friday?
              <br />
              Make a folder.
            </h2>
            <p className="lede tight">
              Add the chapters and the date. ACADEMe spreads the lessons over the
              days left, adds revision and reminds you.
            </p>
          </div>
        </div>
      </div>

      {}
      <div className="chapter chapter-feature chapter-cta" data-chapter="cta">
        <div className="chapter-stage stage-cta">
          <div className="type-block type-cta">
            <div className="cta-row cta-row-center">
              <a className="btn-flow primary" href={WAITLIST_URL} target="_blank" rel="noreferrer">
                <span className="btn-flow-label">Join the community</span>
              </a>
              <button
                type="button"
                className="btn-flow icon"
                id="cta-qr-trigger"
                aria-label="Show QR code"
                title="Scan to join"
                onClick={(e) => openQrModal(e.currentTarget)}
              >
                <span className="btn-flow-label" aria-hidden>
                  <svg className="btn-flow-icon" viewBox="0 0 24 24" fill="none">
                    <rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
                    <rect x="13.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
                    <rect x="3.5" y="13.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
                    <path
                      d="M14 14h2.5v2.5H14V14zm4 0H20v2.5h-2V14zm-4 4H16.5V20H14v-2zm4 0H20V20h-2v-2z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
