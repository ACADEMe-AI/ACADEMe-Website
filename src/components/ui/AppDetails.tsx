import { PlayCta } from "./PlayCta";

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
        <img className="details-pebby" src="/pebby/encourage.png" alt="" width={120} height={120} loading="lazy" />
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
          <PlayCta id="pricing-qr-trigger" />
        </div>
      </section>
    </div>
  );
}
