/**
 * ONE Three.js cube for the whole experience:
 * scramble → logo form → fly into pocket → stay there (same canvas).
 *
 * Never mounts a second cube for the pocket (that caused the hard cut).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { LoaderScene } from "./LoaderScene";
import { waitForAppAssets } from "./preloadAssets";

type Props = {
  onFinished?: () => void;
  force?: boolean;
};

const SESSION_KEY = "academe-loader-seen";

export function BrandLoader({ onFinished, force = false }: Props) {
  const [showOverlay, setShowOverlay] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const [transparentGl, setTransparentGl] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  /** Same canvas, locked to the pocket slot */
  const [parked, setParked] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const canvasSize = useRef({ w: 360, h: 360 });

  const exiting = useRef(false);
  const appReleased = useRef(false);
  const logoLocked = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let cancelled = false;
    waitForAppAssets()
      .then(() => {
        if (!cancelled) setAssetsReady(true);
      })
      .catch(() => {
        if (!cancelled) setAssetsReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("loader-active");
    return () => {
      document.documentElement.classList.remove("loader-active");
      document.documentElement.classList.remove("loader-handing-off");
    };
  }, []);

  const markSeen = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const releaseApp = useCallback(() => {
    if (appReleased.current) return;
    appReleased.current = true;
    markSeen();
    document.documentElement.classList.remove("loader-active");
    document.documentElement.classList.remove("loader-handing-off");
    setShowOverlay(false);
    onFinished?.();
  }, [onFinished]);

  const measurePocket = () => {
    const pocket = document.querySelector(".hero-logo-mark") as HTMLElement | null;
    if (!pocket) return null;
    const r = pocket.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return null;
    return { el: pocket, rect: r };
  };

  /** Keep fixed stage glued to the pocket (scroll / resize / pin). */
  const syncStageToPocket = useCallback(() => {
    const stage = stageRef.current;
    const pocketInfo = measurePocket();
    if (!stage || !pocketInfo) return;
    const { rect: to } = pocketInfo;
    const { w, h } = canvasSize.current;
    // Fill the slot; keep modest so “pocket.” doesn’t wrap
    const scale = Math.min(to.width / w, to.height / h) * 1.3;

    gsap.set(stage, {
      position: "fixed",
      left: to.left + to.width / 2,
      top: to.top + to.height / 2,
      width: w,
      height: h,
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      scale,
      opacity: 1,
      zIndex: 40,
      margin: 0,
      pointerEvents: "none",
      transformOrigin: "50% 50%",
    });
  }, []);

  useEffect(() => {
    if (!parked) return;
    syncStageToPocket();
    const onScroll = () => syncStageToPocket();
    window.addEventListener("resize", syncStageToPocket);
    window.addEventListener("scroll", onScroll, true);
    // Pin / Lenis move the pocket without window scroll sometimes
    const id = window.setInterval(syncStageToPocket, 100);
    return () => {
      window.removeEventListener("resize", syncStageToPocket);
      window.removeEventListener("scroll", onScroll, true);
      window.clearInterval(id);
    };
  }, [parked, syncStageToPocket]);

  const parkInPlace = useCallback(() => {
    setFreeze(true);
    setTransparentGl(true);
    setParked(true);
    document.documentElement.classList.add("loader-handing-off");
    // Next frame: size to pocket and unlock the site
    requestAnimationFrame(() => {
      syncStageToPocket();
      releaseApp();
    });
  }, [releaseApp, syncStageToPocket]);

  const flyToPocket = useCallback(() => {
    if (exiting.current) return;
    exiting.current = true;

    const stage = stageRef.current;
    const root = rootRef.current;
    const label = labelRef.current;

    if (reduced || !stage) {
      parkInPlace();
      return;
    }

    const from = stage.getBoundingClientRect();
    const pocketInfo = measurePocket();
    if (!pocketInfo) {
      parkInPlace();
      return;
    }
    const { rect: to } = pocketInfo;

    canvasSize.current = { w: from.width, h: from.height };
    const endScale = Math.min(to.width / from.width, to.height / from.height) * 1.3;
    const startCX = from.left + from.width / 2;
    const startCY = from.top + from.height / 2;
    const endCX = to.left + to.width / 2;
    const endCY = to.top + to.height / 2;

    gsap.set(stage, {
      position: "fixed",
      left: startCX,
      top: startCY,
      width: from.width,
      height: from.height,
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      zIndex: 10050,
      margin: 0,
      pointerEvents: "none",
      transformOrigin: "50% 50%",
    });

    setFreeze(true);
    setTransparentGl(true);
    document.documentElement.classList.add("loader-handing-off");

    requestAnimationFrame(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // SAME canvas — just mark parked + sync. No second Three.js mount.
          setParked(true);
          syncStageToPocket();
          releaseApp();
        },
      });

      if (label) {
        tl.to(label, { y: 16, opacity: 0, duration: 0.2, ease: "power2.in" }, 0);
      }
      if (root) {
        tl.to(root, { opacity: 0, duration: 0.75, ease: "power2.inOut" }, 0.05);
      }

      tl.to(
        stage,
        {
          left: endCX,
          top: endCY,
          scale: endScale,
          duration: 1.1,
          ease: "power3.inOut",
        },
        0,
      );
    });
  }, [parkInPlace, reduced, releaseApp, syncStageToPocket]);

  const handleLogoReady = useCallback(() => {
    if (exiting.current || logoLocked.current) return;
    logoLocked.current = true;
    setFreeze(true);
    window.setTimeout(() => flyToPocket(), reduced ? 80 : 480);
  }, [flyToPocket, reduced]);

  // Skip animation: ?loader=0 → jump straight to parked cube
  useEffect(() => {
    if (force) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("loader") === "0") {
      setAssetsReady(true);
      setFreeze(true);
      setTransparentGl(true);
      setShowOverlay(false);
      // Let scene mount once, then park
      const t = window.setTimeout(() => {
        const stage = stageRef.current;
        if (stage) {
          const r = stage.getBoundingClientRect();
          canvasSize.current = { w: r.width || 360, h: r.height || 360 };
        }
        parkInPlace();
      }, 200);
      return () => window.clearTimeout(t);
    }
  }, [force, parkInPlace]);

  return (
    <>
      {showOverlay && (
        <div
          ref={rootRef}
          className="brand-loader"
          role="progressbar"
          aria-label="Loading ACADEMe"
          aria-busy={!parked}
        >
          <p ref={labelRef} className="brand-loader-label" aria-label="ACADEMe">
            ACADEM<span className="brand-loader-label-e">e</span>
          </p>
        </div>
      )}

      {/* Single stage + single LoaderScene for life of the page */}
      {mounted
        ? createPortal(
            <div
              ref={stageRef}
              className={`brand-loader-stage${parked ? " brand-loader-stage--parked" : ""}`}
              aria-hidden
            >
              <LoaderScene
                reducedMotion={reduced}
                freeze={freeze}
                transparentClear={transparentGl || parked}
                assetsReady={assetsReady}
                onLogoReady={handleLogoReady}
                onComplete={handleLogoReady}
              />
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
