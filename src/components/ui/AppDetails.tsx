import { WAITLIST_URL } from "../../lib/constants";
import { openQrModal } from "./QrModal";

const LANGUAGES = [
  { label: "English", lang: "en" },
  { label: "हिन्दी", lang: "hi" },
  { label: "తెలుగు", lang: "te" },
  { label: "தமிழ்", lang: "ta" },
  { label: "বাংলা", lang: "bn" },
];

const PROMISES = [
  { title: "No ads, ever", body: "No ads and no advertising ID. Your study time isn't for sale." },
  { title: "Photos never stored", body: "Scan reads the page and lets the photo go." },
  { title: "Report any AI answer", body: "Every Pebby answer has a Report button if something looks wrong." },
  { title: "Delete anytime", body: "Delete your account in the app or on the web. Your data is erased after 30 days." },
];

export function AppDetails() {
  return (
    <div className="details">
      <section className="details-block" id="india" aria-labelledby="india-title">
        <img className="details-pebby" src="/mascot/cta.png" alt="" width={120} height={120} loading="lazy" />
        <h2 id="india-title" className="details-title">
          Made for students <em>in India.</em>
        </h2>
        <p className="details-lede">
          Your board, your syllabus, your language. Pebby answers in
        </p>
        <ul className="lang-row">
          {LANGUAGES.map((l) => (
            <li key={l.lang} lang={l.lang}>
              {l.label}
            </li>
          ))}
        </ul>
        <div className="promise-grid">
          {PROMISES.map((p) => (
            <div className="promise" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="details-block" id="pricing" aria-labelledby="pricing-title">
        <h2 id="pricing-title" className="details-title">
          Start free. <em>Go Pro when you&apos;re ready.</em>
        </h2>
        <div className="price-grid">
          <div className="price">
            <h3>Free</h3>
            <p className="price-amount">₹0</p>
            <ul>
              <li>Every lesson, revision, folder and reminder</li>
              <li>10 Pebby questions a day</li>
              <li>3 scans and 1 answer check a day</li>
              <li>No paywall when you sign up</li>
            </ul>
          </div>
          <div className="price is-pro">
            <h3>ACADEMe Pro</h3>
            <p className="price-amount">
              ₹200<span>/month</span>
            </p>
            <p className="price-note">First month ₹100. Or ₹1,999 a year, about ₹167 a month.</p>
            <ul>
              <li>Unlimited Pebby and Scan</li>
              <li>Unlimited answer checks</li>
              <li>Swipe lessons made from your own notes</li>
            </ul>
          </div>
        </div>
        <div className="cta-row details-cta">
          <a className="btn-flow primary" href={WAITLIST_URL} target="_blank" rel="noreferrer">
            <span className="btn-flow-label">Start For Free</span>
          </a>
          <button
            type="button"
            className="btn-flow icon"
            id="pricing-qr-trigger"
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
      </section>
    </div>
  );
}
