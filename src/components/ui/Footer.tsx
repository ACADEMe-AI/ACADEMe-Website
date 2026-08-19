/**
 * Closer: logo left, legal right, huge half-cropped ACADEMe.
 * Letters always stay visible; stagger is polish only (never hides forever).
 */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** ACADEMe — last e lowercase */
const MEGA_LETTERS = ["A", "C", "A", "D", "E", "M", "e"] as const;

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const legal = root.querySelector<HTMLElement>(".footer-legal");
    const logo = root.querySelector<HTMLElement>(".footer-logo-link");
    const letters = root.querySelectorAll<HTMLElement>(".footer-mega-letter");
    if (!letters.length) return;

    const ctx = gsap.context(() => {
      // Always rest visible — never leave opacity 0 as a stuck state
      const showRest = () => {
        gsap.set(legal, { opacity: 1, y: 0, clearProps: "transform" });
        gsap.set(logo, { opacity: 1, y: 0, scale: 1, clearProps: "transform" });
        gsap.set(letters, { opacity: 1, yPercent: 0, clearProps: "transform" });
      };

      showRest();

      const playIn = () => {
        // Animate FROM below TO visible; end state always visible
        gsap.fromTo(
          legal,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", overwrite: true },
        );
        gsap.fromTo(
          logo,
          { opacity: 0, y: 10, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out", overwrite: true },
        );
        gsap.fromTo(
          letters,
          { opacity: 0, yPercent: 70 },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.65,
            stagger: 0.05,
            ease: "power3.out",
            overwrite: true,
            onComplete: showRest,
          },
        );
      };

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top 95%",
        end: "bottom top",
        onEnter: playIn,
        onEnterBack: playIn,
        // Do NOT hide on leave — only re-animate on re-enter
      });

      if (st.isActive) playIn();
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const t1 = window.setTimeout(refresh, 150);
    const t2 = window.setTimeout(refresh, 700);
    window.addEventListener("resize", refresh);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <footer ref={rootRef} className="site-footer" id="close">
      <div className="footer-row">
        <a className="footer-logo-link" href="#top" aria-label="ACADEMe home">
          <img
            className="footer-logo"
            src="/brand/logo-on-dark.png"
            alt=""
            width={56}
            height={56}
            decoding="async"
          />
        </a>
        <div className="footer-legal">
          <a href="/privacy-policy">Privacy</a>
          <a href="/delete">Delete data</a>
          <span>© {new Date().getFullYear()} ACADEMe</span>
        </div>
      </div>

      <div className="footer-mega-clip" aria-hidden>
        <p className="footer-mega">
          {MEGA_LETTERS.map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              className={
                ch === "e"
                  ? "footer-mega-letter footer-mega-e"
                  : "footer-mega-letter"
              }
            >
              {ch}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
