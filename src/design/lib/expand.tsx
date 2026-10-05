import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal, flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_MARK, heroMarkFixedStyle } from "./heroMark";
import { dpath } from "./base";
import { tiles } from "./nav";
import { ExpandContext, type ExpandContextValue, type ExpandPayload } from "./expandContext";

gsap.registerPlugin(ScrollTrigger);

const EXPAND_MS = 620;
/** Logo mark → hero center: longer, softer fly */
const HOME_FLY_MS = 1100;
const HOME_HOLD_MS = 520;
const HOME_FADE_MS = 560;
const CARDS_MS = 900;
const CARDS_HOLD_MS = 320;

const LOGO_DARK = "/brand/logo-white-bg-removed.png";
const LOGO_LIGHT = "/brand/logo-black-bg-removed.png";

/** Off-screen start offsets for return assemble (left / right / top / bottom) */
const CARD_FROM: Record<string, { x: string; y: string }> = {
  "t-framework": { x: "-130%", y: "0%" },
  "t-voice": { x: "0%", y: "-130%" },
  "t-logo": { x: "130%", y: "-40%" },
  "t-type": { x: "130%", y: "0%" },
  "t-icon": { x: "-130%", y: "40%" },
  "t-color": { x: "-80%", y: "130%" },
  "t-imagery": { x: "40%", y: "130%" },
  "t-motion": { x: "130%", y: "80%" },
};

function isDark(hex: string) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 < 140;
}

/** Lock scroll while the full-screen card return covers the page. */
function lockReturnScroll() {
  document.body.classList.add("design-returning-home");
  document.body.style.overflow = "hidden";
}

function unlockReturnScroll() {
  document.body.classList.remove("design-returning-home");
  document.body.style.overflow = "";
}

type Phase =
  | "idle"
  | "from"
  | "to"
  | "hold"
  | "home-from"
  | "home-to"
  | "home-hold"
  | "home-fade"
  | "cards-active"
  | "cards-fade";

type HomePayload = {
  rect: DOMRect;
};

export function ExpandProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("idle");
  const [payload, setPayload] = useState<ExpandPayload | null>(null);
  const [home, setHome] = useState<HomePayload | null>(null);
  const [cardsActive, setCardsActive] = useState(false);
  const [cardsMobile, setCardsMobile] = useState(false);
  const [landingColor, setLandingColor] = useState<string | null>(null);
  const [preferAssembledBoard, setPreferAssembledBoard] = useState(false);
  const timers = useRef<number[]>([]);
  const cardsRootRef = useRef<HTMLDivElement | null>(null);
  const cardsTlRef = useRef<gsap.core.Timeline | null>(null);
  /** Bumps each goHomeCards call — ignores stale timers */
  const cardsGenRef = useRef(0);
  const cardsBusyRef = useRef(false);
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(
    () => () => {
      clearTimers();
      cardsTlRef.current?.kill();
      cardsGenRef.current += 1;
      cardsBusyRef.current = false;
      unlockReturnScroll();
    },
    []
  );

  const killScroll = () => {
    try {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      ScrollTrigger.clearScrollMemory?.();
    } catch {
      /* ignore */
    }
  };

  const startExpand = useCallback(
    (p: ExpandPayload) => {
      clearTimers();
      cardsTlRef.current?.kill();
      cardsGenRef.current += 1;
      cardsBusyRef.current = false;
      setHome(null);
      setCardsActive(false);
      unlockReturnScroll();
      setPreferAssembledBoard(false);
      setLandingColor(p.color);
      setPayload(p);
      setPhase("from");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("to"));
      });
      const t1 = window.setTimeout(() => {
        setPhase("hold");
        killScroll();
        navigate(dpath(p.path), {
          state: { fromExpand: true, color: p.color, label: p.label },
        });
      }, EXPAND_MS);
      const t2 = window.setTimeout(() => {
        setPhase("idle");
        setPayload(null);
      }, EXPAND_MS + 280);
      timers.current = [t1, t2];
    },
    [navigate]
  );

  /** Logo mark → flies to hero center */
  const goHome = useCallback(
    (logoRect: DOMRect) => {
      clearTimers();
      cardsTlRef.current?.kill();
      cardsGenRef.current += 1;
      cardsBusyRef.current = false;
      setPayload(null);
      setCardsActive(false);
      unlockReturnScroll();
      setLandingColor(null);
      setPreferAssembledBoard(false);
      setHome({ rect: logoRect });
      setPhase("home-from");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("home-to"));
      });

      // Navigate mid-flight so home is ready under the logo
      const tNav = window.setTimeout(() => {
        killScroll();
        window.scrollTo(0, 0);
        navigate(dpath("/"), { state: { fromHome: true } });
        setPhase("home-hold");
      }, HOME_FLY_MS);

      const tFade = window.setTimeout(() => {
        setPhase("home-fade");
      }, HOME_FLY_MS + HOME_HOLD_MS);

      const tDone = window.setTimeout(() => {
        setPhase("idle");
        setHome(null);
      }, HOME_FLY_MS + HOME_HOLD_MS + HOME_FADE_MS);

      timers.current = [tNav, tFade, tDone];
    },
    [navigate]
  );

  /**
   * Home tiles return (replaces side-drawer menu):
   * One shot only — flushSync mounts portal, GSAP runs once (no effect re-fire).
   */
  const goHomeCards = useCallback(() => {
    // One animation at a time (blocks double-tap / double fire)
    if (cardsBusyRef.current) return;
    cardsBusyRef.current = true;

    clearTimers();
    cardsTlRef.current?.kill();
    const gen = ++cardsGenRef.current;

    setPayload(null);
    setHome(null);
    setLandingColor(null);
    setPreferAssembledBoard(true);
    lockReturnScroll();

    // Mount portal in the same turn so we can animate immediately (once)
    flushSync(() => {
      setCardsMobile(window.matchMedia("(max-width: 900px)").matches);
      setCardsActive(true);
      setPhase("cards-active");
    });

    const root = cardsRootRef.current;
    if (!root || gen !== cardsGenRef.current) {
      cardsBusyRef.current = false;
      return;
    }

    const cardEls = Array.from(
      root.querySelectorAll<HTMLElement>(".home-return-card")
    );
    const center = root.querySelector<HTMLElement>(".home-return-center");

    gsap.set(root, { opacity: 1, visibility: "visible" });
    cardEls.forEach((el) => {
      gsap.set(el, {
        x: el.dataset.fromX ?? "0%",
        y: el.dataset.fromY ?? "100%",
        opacity: 0,
        scale: 0.92,
      });
    });
    if (center) {
      gsap.set(center, {
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
        scale: 0.86,
        opacity: 1,
      });
    }

    const tl = gsap.timeline();
    cardsTlRef.current = tl;

    if (center) {
      tl.to(center, { scale: 1, duration: 0.75, ease: "power3.out" }, 0);
    }
    cardEls.forEach((el, i) => {
      tl.to(
        el,
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
        },
        0.05 + i * 0.055
      );
    });

    const tNav = window.setTimeout(() => {
      if (gen !== cardsGenRef.current) return;
      killScroll();
      navigateRef.current(dpath("/"), {
        state: { fromHome: true, fromCards: true },
      });
      // Land on assembled board under the cover (no second fly-in)
      requestAnimationFrame(() => {
        const max =
          ScrollTrigger.maxScroll(window) ||
          document.documentElement.scrollHeight ||
          99999;
        window.scrollTo(0, max);
      });
    }, CARDS_MS);

    const tFade = window.setTimeout(() => {
      if (gen !== cardsGenRef.current) return;
      setPhase("cards-fade");
      gsap.to(root, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
        onComplete: () => {
          if (gen !== cardsGenRef.current) return;
          setCardsActive(false);
          setPhase("idle");
          unlockReturnScroll();
          cardsBusyRef.current = false;
        },
      });
    }, CARDS_MS + CARDS_HOLD_MS);

    timers.current = [tNav, tFade];
  }, []);

  const clearLanding = useCallback(() => setLandingColor(null), []);
  const clearPreferAssembled = useCallback(
    () => setPreferAssembledBoard(false),
    []
  );

  const expandStyle: CSSProperties | undefined =
    payload && (phase === "from" || phase === "to" || phase === "hold")
      ? phase === "from"
        ? {
            left: payload.rect.left,
            top: payload.rect.top,
            width: payload.rect.width,
            height: payload.rect.height,
            background: payload.color,
            borderRadius: 0,
          }
        : {
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
            background: payload.color,
            borderRadius: 0,
          }
      : undefined;

  const fg =
    payload?.fg ??
    (payload ? (isDark(payload.color) ? "#f4f1ea" : "#0f1115") : "#fff");

  const settled = heroMarkFixedStyle(HERO_MARK.imgSize);
  const homeLogoStyle: CSSProperties | undefined =
    home &&
    (phase === "home-from" ||
      phase === "home-to" ||
      phase === "home-hold" ||
      phase === "home-fade")
      ? phase === "home-from"
        ? {
            left: home.rect.left,
            top: home.rect.top,
            width: Math.max(home.rect.width, 1),
            height: Math.max(home.rect.height, 1),
            opacity: 1,
          }
        : {
            left: settled.left,
            top: settled.top,
            width: settled.width,
            height: settled.height,
            opacity: phase === "home-fade" ? 0 : 1,
          }
      : undefined;

  const homeActive = Boolean(homeLogoStyle);
  const homeHandoff: ExpandContextValue["homeHandoff"] =
    phase === "home-from" || phase === "home-to" || phase === "home-hold"
      ? "hide-mark"
      : phase === "home-fade"
        ? "crossfade"
        : "off";

  const homeWashOpacity =
    phase === "home-from"
      ? 0
      : phase === "home-to" || phase === "home-hold"
        ? 1
        : phase === "home-fade"
          ? 0
          : 0;

  // Portal overlay styles are inline so nothing (Tailwind, drawer z-index) can beat them
  const cardsOverlayStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 2147483646,
    pointerEvents: "auto",
    background: "#ffffff",
    opacity: 1,
    visibility: "visible",
  };

  return (
    <ExpandContext.Provider
      value={{
        startExpand,
        goHome,
        goHomeCards,
        landingColor,
        clearLanding,
        homeHandoff,
        preferAssembledBoard,
        clearPreferAssembled,
      }}
    >
      {children}

      {payload && expandStyle && (
        <div className="expand-veil" style={expandStyle} aria-hidden>
          <div
            className="expand-veil-label"
            style={{
              color: fg,
              opacity: phase === "to" || phase === "hold" ? 0 : 1,
            }}
          >
            {payload.label}
          </div>
        </div>
      )}

      {homeActive && home && homeLogoStyle && (
        <>
          <div
            className="home-return-wash"
            style={{ opacity: homeWashOpacity }}
            aria-hidden
          />
          <div className="home-return-logo" style={homeLogoStyle} aria-hidden>
            <img src={LOGO_DARK} alt="" />
          </div>
        </>
      )}

      {/*
        Portal to body + inline max z-index so the side drawer can never cover this.
        Logo sits in the center hole; cards fly in around it via GSAP.
      */}
      {cardsActive &&
        createPortal(
          <div
            ref={cardsRootRef}
            className="home-return-cards"
            style={cardsOverlayStyle}
            aria-hidden
          >
            <div
              className={`home-return-cards-stage tile-menu${
                cardsMobile ? " tile-menu--mobile" : ""
              }`}
            >
              <div
                className={`center-tab home-return-center${
                  cardsMobile ? " center-tab--mobile" : ""
                }`}
              >
                <img src={LOGO_LIGHT} alt="" />
              </div>
              {tiles.map((t) => {
                const from = CARD_FROM[t.className] ?? { x: "0%", y: "100%" };
                return (
                  <div
                    key={t.path}
                    className={`tile ${t.className} home-return-card`}
                    data-from-x={from.x}
                    data-from-y={from.y}
                    style={{
                      background: t.color,
                      color: isDark(t.color) ? "#f4f1ea" : "#0f1115",
                      // GSAP owns transform/opacity; kill CSS transition races
                      transition: "none",
                    }}
                  >
                    <div className="tile-title">{t.label}</div>
                  </div>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </ExpandContext.Provider>
  );
}
