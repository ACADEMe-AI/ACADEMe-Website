import { WAITLIST_URL } from "../../lib/constants";
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

/**
 * Chapter type layouts vary — never all left-type / right-phone.
 * Distinct HQ Mee per section, above the headline on the type side.
 */
export function ChapterOverlay() {
  return (
    <div className="chapter-layer" aria-live="polite">
      {/* ===== HERO — type L / phone R ===== */}
      <div className="chapter chapter-hero" data-chapter="hero">
        <div className="hero-headline">
          <h1>
            <span className="hero-line">Study smarter.</span>
            <span className="hero-line">
              In your{" "}
              {/*
                Empty slot only — BrandLoader parks the SAME loader cube here.
                Do NOT mount PocketLogo3D / a second Three.js scene (causes a hard cut).
              */}
              <span
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
            Turn notes, PDFs, lectures and study material into personalized
            AI-powered practice with ACADEMe.
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

      {/* ===== UPLOAD — reading materials ===== */}
      <div className="chapter chapter-feature chapter-upload" data-chapter="upload">
        <div className="chapter-stage stage-left">
          <div className="type-block">
            <Mee src="/mascot/upload.png" />
            <h2 className="display">
              Put your material
              <br />
              to work.
            </h2>
            <p className="lede tight">
              Drop in notes, slides, PDFs, or lectures. ACADEMe turns what you
              already have into a study plan you can use.
            </p>
          </div>
        </div>
      </div>

      {/* ===== CHAT — idea / tutor ===== */}
      <div className="chapter chapter-feature chapter-chat" data-chapter="chat">
        <div className="chapter-stage stage-right">
          <div className="type-block type-right">
            <Mee src="/mascot/chat.png" />
            <h2 className="display">
              A tutor that sees
              <br />
              the context.
            </h2>
            <p className="lede tight">
              Ask the question in your own words. Mee responds from the material
              you&apos;re actually studying.
            </p>
          </div>
        </div>
      </div>

      {/* ===== PRACTICE — studying ===== */}
      <div className="chapter chapter-cinematic chapter-practice" data-chapter="practice">
        <div className="chapter-stage stage-practice">
          <div className="type-block type-practice">
            <Mee src="/mascot/practice.png" />
            <h2 className="display display-cinematic">
              Turn review
              <br />
              into recall.
            </h2>
            <p className="lede tight">
              Make flashcards, quiz yourself, and practise the ideas until you
              can retrieve them without looking.
            </p>
          </div>
        </div>
      </div>

      {/* ===== ADAPTIVE — thinking ===== */}
      <div className="chapter chapter-feature chapter-adaptive" data-chapter="adaptive">
        <div className="chapter-stage stage-right">
          <div className="type-block type-right">
            <Mee src="/mascot/adaptive.png" />
            <h2 className="display">
              Practice that
              <br />
              adjusts to you.
            </h2>
            <p className="lede tight">
              Wrong answers become the next useful question, not just another
              item in a random pool.
            </p>
          </div>
        </div>
      </div>

      {/* ===== MASTERY — trophy / achieved ===== */}
      <div className="chapter chapter-feature chapter-mastery" data-chapter="mastery">
        <div className="chapter-stage stage-left stage-mastery">
          <div className="type-block">
            <Mee src="/mascot/mastery.png" />
            <h2 className="display">
              Build a study loop
              <br />
              you can stick with.
            </h2>
            <p className="lede tight">
              Upload, understand, practise, improve. Every session moves your
              work forward.
            </p>
          </div>
        </div>
      </div>

      {/* ===== CTA — landscape phone + Join + barcode under product ===== */}
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
