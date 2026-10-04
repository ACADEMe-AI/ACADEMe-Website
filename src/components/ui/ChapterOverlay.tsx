import { useEffect, useRef } from "react";
import { registerPocket } from "../../loader/pocketRegistry";
import { goToSection } from "../../lib/sectionNav";
import { PlayCta } from "./PlayCta";

function Pebby({ pose }: { pose: string }) {
  return (
    <img
      className="pebby-pose"
      src={`/pebby/${pose}.png`}
      alt=""
      width={112}
      height={112}
      decoding="async"
      aria-hidden
    />
  );
}

const USPS = ["Your syllabus", "Swipe lessons", "Pebby, your tutor", "Board-style marking"];

export function ChapterOverlay() {
  const pocketRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerPocket(pocketRef.current);
    return () => registerPocket(null);
  }, []);

  return (
    <div className="chapter-layer" aria-live="polite">
      <div className="chapter chapter-hero" data-chapter="hero">
        <div className="hero-headline">
          <h1>
            <span className="hero-line">Your syllabus.</span>
            <span className="hero-line">
              In your{" "}
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
          <ul className="usp-row" aria-label="What ACADEMe does">
            {USPS.map((usp) => (
              <li key={usp}>{usp}</li>
            ))}
          </ul>
          <p className="hero-lede">
            The study app for Class 6 to 12, CBSE, ICSE and ISC. Short swipe
            lessons from your chapters, Pebby when you&apos;re stuck, and marks
            on your written answers the way your board gives them.
          </p>
          <div className="hero-cta-row">
            <PlayCta id="hero-qr-trigger" />
          </div>
          <button type="button" className="hero-micro hero-more" onClick={() => goToSection(1)}>
            See how it works
          </button>
        </div>
      </div>

      <div className="chapter chapter-feature chapter-lessons" data-chapter="lessons">
        <div className="chapter-stage stage-left">
          <div className="type-block">
            <Pebby pose="reading" />
            <h2 className="display">
              Your chapters.
              <br />
              One swipe at a time.
            </h2>
            <p className="lede tight">
              Your board&apos;s 2026-27 syllabus, chapter by chapter. Each lesson
              is a few cards: an idea, a worked example, a quick check. New
              lessons arrive chapter by chapter, starting with Class 10.
            </p>
          </div>
        </div>
      </div>

      <div className="chapter chapter-feature chapter-pebby" data-chapter="pebby">
        <div className="chapter-stage stage-right">
          <div className="type-block type-right">
            <Pebby pose="chat" />
            <h2 className="display">
              Stuck?
              <br />
              Ask Pebby.
            </h2>
            <p className="lede tight">
              Explain it simply, solve it with hints first, or quiz me. Pebby
              answers for your class and board, in English,{" "}
              <span lang="hi">हिन्दी</span>, <span lang="te">తెలుగు</span>,{" "}
              <span lang="ta">தமிழ்</span> or <span lang="bn">বাংলা</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="chapter chapter-cinematic chapter-scan" data-chapter="scan">
        <div className="chapter-stage stage-scan">
          <div className="type-block type-scan">
            <Pebby pose="solving" />
            <h2 className="display display-cinematic">
              Your answer,
              <br />
              marked like the board.
            </h2>
            <p className="lede tight">
              Snap your written answer and see the marks it would get under the
              CBSE or ICSE scheme, point by point, with what it takes for full
              marks. Stuck on homework? Get hints, not just answers.
            </p>
          </div>
        </div>
      </div>

      <div className="chapter chapter-feature chapter-revision" data-chapter="revision">
        <div className="chapter-stage stage-right">
          <div className="type-block type-right">
            <Pebby pose="idea" />
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

      <div className="chapter chapter-feature chapter-plan" data-chapter="plan">
        <div className="chapter-stage stage-left stage-plan">
          <div className="type-block">
            <Pebby pose="determined" />
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

      <div className="chapter chapter-feature chapter-cta" data-chapter="cta">
        <div className="chapter-stage stage-cta">
          <div className="type-block type-cta">
            <p className="cta-line">Free to start. No ads, ever.</p>
            <div className="cta-row cta-row-center">
              <PlayCta id="cta-qr-trigger" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
