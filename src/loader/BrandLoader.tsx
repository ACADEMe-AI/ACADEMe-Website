import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { LoaderScene } from "./LoaderScene";
import { waitForAppAssets } from "./preloadAssets";
import { onPocketChange } from "./pocketRegistry";
import { onStoryProgress } from "../lib/sectionNav";
import {
  FLY_PX,
  applyParkedPose,
  createPinState,
  freezeFromRect,
  flyDurationSec,
  logoHoldMs,
  measureHeroOpacity,
  measurePocket,
  syncParkedPosition,
  waitForPocket,
} from "./pocketPin";

type Props = {
  onFinished?: () => void;
  force?: boolean;
};

type Phase = "boot" | "load" | "fly" | "parked" | "done";

export function BrandLoader({ onFinished, force = false }: Props) {
  const [phase, setPhase] = useState<Phase>("boot");
  const [showOverlay, setShowOverlay] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const pin = useRef(createPinState());
  const phaseRef = useRef<Phase>("boot");

  const setPhaseSafe = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    let dead = false;
    waitForAppAssets()
      .then(() => {
        if (!dead) setAssetsReady(true);
      })
      .catch(() => {
        if (!dead) setAssetsReady(true);
      });
    return () => {
      dead = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("loader-active");
    setPhaseSafe("load");
    return () => {
      document.documentElement.classList.remove("loader-active");
      document.documentElement.classList.remove("loader-handing-off");
    };
  }, []);

  const release = useCallback(() => {
    if (phaseRef.current === "done") return;
    setPhaseSafe("done");
    document.documentElement.classList.remove("loader-active");
    document.documentElement.classList.remove("loader-handing-off");
    setShowOverlay(false);
    onFinished?.();
  }, [onFinished]);

    const finishPark = useCallback(
    (rect?: ReturnType<typeof measurePocket>) => {
      if (phaseRef.current === "parked" || phaseRef.current === "done") return;

      const outer = outerRef.current;
      const scaleEl = scaleRef.current;
      if (!outer || !scaleEl) {
        release();
        return;
      }

      gsap.killTweensOf(outer);
      setFreeze(true);
      document.documentElement.classList.add("loader-handing-off");
      outer.classList.remove("brand-loader-stage--flying");

      const apply = (r: NonNullable<ReturnType<typeof measurePocket>>) => {
        pin.current.frozen = false;
        freezeFromRect(pin.current, r, true);
        pin.current.lastL = r.left;
        pin.current.lastT = r.top;

        applyParkedPose(
          outer,
          scaleEl,
          pin.current,
          r.left,
          r.top,
          measureHeroOpacity(),
        );
        outer.classList.add("brand-loader-stage--parked");
        setPhaseSafe("parked");
      };

      const hideAndRelease = () => {
        outer.style.cssText =
          "position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;visibility:hidden;pointer-events:none;z-index:0;";
        outer.classList.add("brand-loader-stage--parked");
        setPhaseSafe("parked");
        release();
      };

      const immediate = rect ?? measurePocket();
      if (immediate && immediate.left > 4 && immediate.top > 4) {
        apply(immediate);
        window.setTimeout(() => {
          if (phaseRef.current !== "parked" && phaseRef.current !== "done") return;
          const next = measurePocket();
          if (!next || !outerRef.current || !scaleRef.current) return;
          if (next.left < 4 && next.top < 4) return;
          freezeFromRect(pin.current, next, true);
          pin.current.lastL = next.left;
          pin.current.lastT = next.top;
          applyParkedPose(
            outerRef.current,
            scaleRef.current,
            pin.current,
            next.left,
            next.top,
            measureHeroOpacity(),
          );
        }, 100);
        requestAnimationFrame(() => release());
        return;
      }

      void waitForPocket(15, 40).then((r) => {
        if (phaseRef.current === "done") return;
        if (r && r.left > 4 && r.top > 4) {
          apply(r);
          requestAnimationFrame(() => release());
        } else {
          hideAndRelease();
        }
      });
    },
    [release],
  );

  useEffect(() => {
    if (phase !== "parked" && phase !== "done") return;
    if (!pin.current.frozen) return;

    let raf = 0;
    let queued = false;
    let didSizeCorrect = false;

    const correctSizeIfNeeded = () => {
      const outer = outerRef.current;
      const scaleEl = scaleRef.current;
      if (!outer || !scaleEl) return;
      const next = measurePocket();
      if (!next) return;
      const settled = Math.round(Math.min(next.width, next.height));
      if (settled < 28) return;
      if (!didSizeCorrect && Math.abs(settled - pin.current.lockedSize) > 6) {
        didSizeCorrect = true;
        freezeFromRect(pin.current, next, true);
        pin.current.lastL = next.left;
        pin.current.lastT = next.top;
        applyParkedPose(
          outer,
          scaleEl,
          pin.current,
          next.left,
          next.top,
          measureHeroOpacity(),
        );
        return;
      }
      syncParkedPosition(outer, pin.current);
    };

    const sync = () => {
      queued = false;
      correctSizeIfNeeded();
    };

    const tick = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(sync);
    };

    window.addEventListener("resize", tick, { passive: true });
    const unsubPocket = onPocketChange(tick);
    const unsubStory = onStoryProgress(() => tick());
    window.addEventListener("scroll", tick, { capture: true, passive: true });
    tick();
    const t1 = window.setTimeout(tick, 50);
    const t2 = window.setTimeout(tick, 200);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      unsubPocket();
      unsubStory();
      window.removeEventListener("resize", tick);
      window.removeEventListener("scroll", tick, true);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "parked" && phase !== "done") return;
    const outer = outerRef.current;
    const scaleEl = scaleRef.current;
    if (!outer || !scaleEl || !pin.current.frozen) return;
    applyParkedPose(
      outer,
      scaleEl,
      pin.current,
      pin.current.lastL,
      pin.current.lastT,
      measureHeroOpacity(),
    );
  }, [phase, showOverlay, freeze, assetsReady]);

  const fly = useCallback(() => {
    if (phaseRef.current === "fly" || phaseRef.current === "parked" || phaseRef.current === "done") {
      return;
    }

    const outer = outerRef.current;
    const scaleEl = scaleRef.current;
    if (!outer || reduced) {
      finishPark();
      return;
    }

    const to = measurePocket();
    if (!to) {
      finishPark();
      return;
    }

    setPhaseSafe("fly");
    freezeFromRect(pin.current, to);
    pin.current.lastL = to.left;
    pin.current.lastT = to.top;

    const from = outer.getBoundingClientRect();
    const sx = from.left + from.width / 2;
    const sy = from.top + from.height / 2;
    const startScale = Math.max(0.2, from.width / FLY_PX);
    const ex = to.left + to.width / 2;
    const ey = to.top + to.height / 2;
    const endScale = pin.current.lockedScale;

    setFreeze(true);
    document.documentElement.classList.add("loader-handing-off");
    outer.classList.add("brand-loader-stage--flying");

    gsap.killTweensOf(outer);
    if (scaleEl) {
      scaleEl.style.cssText = `width:${FLY_PX}px;height:${FLY_PX}px;transform:none;`;
    }

    gsap.set(outer, {
      position: "fixed",
      left: sx,
      top: sy,
      width: FLY_PX,
      height: FLY_PX,
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      scale: startScale,
      opacity: 1,
      zIndex: 10050,
      margin: 0,
      overflow: "visible",
      transformOrigin: "50% 50%",
    });

    const label = labelRef.current;
    const root = rootRef.current;
    const flySec = flyDurationSec();

    const tl = gsap.timeline({
      onComplete: () => finishPark(to),
    });

    if (label) tl.to(label, { opacity: 0, duration: 0.1 }, 0);
    if (root) tl.to(root, { opacity: 0, duration: Math.min(0.42, flySec * 0.55) }, 0);

    tl.to(
      outer,
      {
        left: ex,
        top: ey,
        scale: endScale,
        duration: flySec,
        ease: "power3.out",
      },
      0,
    );
  }, [finishPark, reduced]);

  const onLogoReady = useCallback(() => {
    if (phaseRef.current !== "load") return;
    setFreeze(true);
    window.setTimeout(() => fly(), logoHoldMs(reduced));
  }, [fly, reduced]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!force && params.get("loader") === "0") {
      setAssetsReady(true);
      setFreeze(true);
      setShowOverlay(false);
      const t = window.setTimeout(() => finishPark(), 100);
      return () => clearTimeout(t);
    }
  }, [finishPark, force]);

  const busy = phase !== "done" && phase !== "parked";

  return (
    <>
      {showOverlay && (
        <div
          ref={rootRef}
          className="brand-loader"
          role="progressbar"
          aria-label="Loading ACADEMe"
          aria-busy={busy}
        >
          <p ref={labelRef} className="brand-loader-label" aria-label="ACADEMe">
            ACADEM<span className="brand-loader-label-e">e</span>
          </p>
        </div>
      )}

      {mounted
        ? createPortal(
            <div
              ref={outerRef}
              className={`brand-loader-stage${
                phase === "parked" || phase === "done"
                  ? " brand-loader-stage--parked"
                  : ""
              }`}
              aria-hidden
            >
              <div ref={scaleRef} className="brand-loader-scale">
                <div className="brand-loader-stage-inner">
                  <LoaderScene
                    reducedMotion={reduced}
                    freeze={freeze}
                    transparentClear
                    assetsReady={assetsReady || phase === "parked" || phase === "done"}
                    fixedCssPx={FLY_PX}
                    onLogoReady={onLogoReady}
                    onComplete={onLogoReady}
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
