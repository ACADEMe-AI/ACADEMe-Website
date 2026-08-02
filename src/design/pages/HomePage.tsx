import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tiles } from "../lib/nav";
import TileArt from "../components/TileArt";
import { useExpand } from "../lib/expandContext";
import { HERO_MARK } from "../lib/heroMark";
import { dpath } from "../lib/base";

gsap.registerPlugin(ScrollTrigger);

/**
 * Desktop: 4-col Dropbox board + side fly-in.
 * Mobile: full-viewport 2-col board (fills screen) + left/right fly-in.
 */

const FLY_DESKTOP: Record<string, { x: number; y: number }> = {
  "t-framework": { x: -110, y: -8 },
  "t-voice": { x: -24, y: -105 },
  "t-logo": { x: 24, y: -105 },
  "t-type": { x: 110, y: -8 },
  "t-icon": { x: -110, y: 42 },
  "t-color": { x: -80, y: 95 },
  "t-imagery": { x: 80, y: 95 },
  "t-motion": { x: 110, y: 42 },
};

/** Mobile: left column from left, right column from right */
const FLY_MOBILE: Record<string, { x: number; y: number }> = {
  "t-framework": { x: -120, y: -20 },
  "t-voice": { x: 120, y: -20 },
  "t-logo": { x: -120, y: 0 },
  "t-type": { x: 120, y: 0 },
  "t-icon": { x: -120, y: 20 },
  "t-color": { x: 120, y: 20 },
  "t-imagery": { x: -120, y: 40 },
  "t-motion": { x: 120, y: 40 },
};

const LOGO_DARK = "/brand/logo-white-bg-removed.png";
const LOGO_LIGHT = "/brand/logo-black-bg-removed.png";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function smooth(t: number) {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function useNarrow() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 900
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const fn = () => setNarrow(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return narrow;
}

export default function HomePage() {
  const root = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const locState = (location.state as {
    fromHome?: boolean;
    fromCards?: boolean;
  } | null) || {};
  const {
    startExpand,
    homeHandoff,
    preferAssembledBoard,
    clearPreferAssembled,
  } = useExpand();
  // Cards return already animated in the portal — start fully assembled (no 2nd fly-in)
  const fromCards = Boolean(locState.fromCards || preferAssembledBoard);
  const fromHome = Boolean(locState.fromHome);
  const [p, setP] = useState(() => (fromCards ? 1 : 0));
  const [welcome, setWelcome] = useState(() => !fromHome);
  const narrow = useNarrow();

  useEffect(() => {
    // Cards return: stay solid (portal already did the show). Logo fly: soft crossfade.
    if (fromCards) {
      setWelcome(true);
      return;
    }
    if (fromHome) {
      setWelcome(false);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setWelcome(true));
      });
      return () => cancelAnimationFrame(id);
    }
    setWelcome(true);
  }, [fromHome, fromCards]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }

    // fromCards: hold p=1 until scroll is pinned at end (portal already did fly-in)
    let cardsPinned = fromCards;
    if (fromCards) {
      setP(1);
    } else {
      window.scrollTo(0, 0);
      setP(0);
    }

    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "+=420%",
      pin: true,
      pinType: touch ? "fixed" : "transform",
      scrub: 1.35,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (cardsPinned) {
          // Stay assembled until user scrolls away from the end
          if (self.progress >= 0.97) setP(1);
          else {
            cardsPinned = false;
            setP(self.progress);
          }
          return;
        }
        setP(self.progress);
      },
    });

    const t = window.setTimeout(() => {
      ScrollTrigger.refresh();
      if (fromCards) {
        const max =
          ScrollTrigger.maxScroll(window) ||
          document.documentElement.scrollHeight;
        window.scrollTo(0, max);
        setP(1);
        clearPreferAssembled();
      }
    }, 40);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", onResize);
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("resize", onResize);
      st.kill(true);
    };
  }, [fromCards, clearPreferAssembled]);

  const textOut = smooth(clamp01((p - 0.16) / 0.26));
  const textOpacity = 1 - textOut;
  const textY = textOut * -36;
  const textBlur = textOut * 6;

  const logoSettle = smooth(clamp01((p - 0.26) / 0.32));
  const tabSize = narrow ? 64 : 102;
  const logoPx = HERO_MARK.box - logoSettle * (HERO_MARK.box - tabSize);
  const logoLift = (1 - logoSettle) * HERO_MARK.lift;

  const boardReveal = smooth(clamp01((p - 0.46) / 0.42));
  const cardsInteractive = boardReveal > 0.82;

  const purpleFill = smooth(clamp01((boardReveal - 0.62) / 0.38));
  const centerTabOn = smooth(clamp01((p - 0.5) / 0.18));
  const heroLogoFade = 1 - smooth(clamp01((p - 0.56) / 0.12));

  const openTile = (
    e: MouseEvent<HTMLAnchorElement>,
    tile: (typeof tiles)[number]
  ) => {
    e.preventDefault();
    if (!cardsInteractive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    startExpand({
      path: tile.path,
      label: tile.label,
      color: tile.color,
      rect,
    });
  };

  /** Center cube between cards → back to home intro (not logo doc page) */
  const openCenter = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (p < 0.15) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const heroImg = purpleFill > 0.45 ? LOGO_LIGHT : LOGO_DARK;
  const heroImgSize =
    HERO_MARK.imgSize +
    logoSettle * (tabSize * 0.52 - HERO_MARK.imgSize) -
    purpleFill * 12;

  const showHeroMark = homeHandoff !== "hide-mark" && heroLogoFade > 0.02;
  const flyMap = narrow ? FLY_MOBILE : FLY_DESKTOP;

  // Logo always settles to board center (mobile + desktop)
  const pe: "auto" | "none" = centerTabOn > 0.5 ? "auto" : "none";
  const centerStyle = {
    opacity: centerTabOn,
    left: "50%",
    top: "50%",
    bottom: "auto",
    transform: `translate3d(-50%, -50%, 0) scale(${0.72 + centerTabOn * 0.28})`,
    pointerEvents: pe,
    background: `rgba(91, 108, 255, ${Math.max(purpleFill, 0.001)})`,
    boxShadow:
      purpleFill > 0.2
        ? `0 16px 48px rgba(91,108,255,${0.4 * purpleFill})`
        : "none",
  };

  return (
    <div
      ref={root}
      className="relative h-screen w-full overflow-hidden bg-white"
      style={{
        willChange: "transform",
        opacity: welcome ? 1 : fromHome ? 0 : 1,
        transition: fromHome
          ? "opacity 0.65s cubic-bezier(0.33, 1, 0.36, 1) 0.08s"
          : undefined,
      }}
    >
      <div className="db-grid pointer-events-none absolute inset-0 opacity-60" />

      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 sm:px-8"
        style={{
          opacity: textOpacity,
          transform: `translate3d(0,${textY}px,0)`,
          filter: textBlur > 0.2 ? `blur(${textBlur}px)` : undefined,
          pointerEvents: "none",
        }}
      >
        <div style={{ height: logoPx + 32, marginBottom: 10 }} aria-hidden />
        <h1 className="db-display max-w-[14ch] text-center text-[clamp(1.7rem,5.5vw,3.4rem)] text-[#5b6cff]">
          How ACADEMe looks, feels, and sounds for every student surface.
        </h1>
      </div>

      {showHeroMark && (
        <div
          className="pointer-events-none absolute left-1/2 z-30"
          style={{
            top: "50%",
            width: logoPx,
            height: logoPx,
            marginLeft: -logoPx / 2,
            marginTop: -logoPx / 2 - logoLift,
            opacity: heroLogoFade,
            transform: "translate3d(0,0,0)",
          }}
        >
          <div
            className="grid h-full w-full place-items-center"
            style={{
              background: `rgba(91, 108, 255, ${purpleFill})`,
              boxShadow:
                purpleFill > 0.05
                  ? `0 18px 48px rgba(91,108,255,${0.35 * purpleFill})`
                  : "none",
            }}
          >
            <img
              src={heroImg}
              alt=""
              className="object-contain"
              style={{ width: heroImgSize, height: heroImgSize }}
            />
          </div>
        </div>
      )}

      <div
        className="nav-stage z-20"
        style={{ pointerEvents: cardsInteractive ? "auto" : "none" }}
      >
        <div className={`tile-menu${narrow ? " tile-menu--mobile" : ""}`}>
          {tiles.map((t, i) => {
            const fly = flyMap[t.className] ?? { x: 0, y: 80 };
            const delay = (i % 2) * 0.04 + Math.floor(i / 2) * 0.05;
            const local = smooth(clamp01((boardReveal - delay) / 0.58));
            const ox = fly.x * (1 - local);
            const oy = fly.y * (1 - local);
            return (
              <a
                key={t.path}
                href={dpath(t.path)}
                className={`tile ${t.className}`}
                onClick={(e) => openTile(e, t)}
                style={{
                  opacity: local,
                  transform: `translate3d(${ox}%, ${oy}%, 0) scale(${0.9 + local * 0.1})`,
                  transition: "none",
                }}
              >
                <div className="tile-title">{t.label}</div>
                <TileArt kind={t.art} />
              </a>
            );
          })}

          <button
            type="button"
            className={`center-tab${narrow ? " center-tab--mobile" : ""}`}
            aria-label="Back to home"
            onClick={openCenter}
            style={centerStyle}
          >
            <img
              src={purpleFill > 0.45 ? LOGO_LIGHT : LOGO_DARK}
              alt="ACADEMe"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
