import { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChapterOverlay } from "./ui/ChapterOverlay";
import { scrollState, type ScreenState, type ChapterId } from "../lib/scrollState";
import { DESKTOP_WAYPOINTS, MOBILE_WAYPOINTS, type Waypoint } from "../lib/waypoints";
import { notifyStoryProgress, registerStoryScrollTrigger } from "../lib/sectionNav";

gsap.registerPlugin(ScrollTrigger);

const ExperienceCanvas = lazy(() =>
  import("./scene/ExperienceCanvas").then((m) => ({ default: m.ExperienceCanvas })),
);

type Proxy = {
  t: number;
  hero: number;
  lessons: number;
  pebby: number;
  scan: number;
  revision: number;
  plan: number;
  cta: number;
};

function applyWaypoint(w: Waypoint) {
  const p = scrollState.phone;
  p.x = w.phone.x;
  p.y = w.phone.y;
  p.z = w.phone.z;
  p.rotX = w.phone.rotX;
  p.rotY = w.phone.rotY;
  p.rotZ = w.phone.rotZ;
  p.scale = w.phone.scale;

  const c = scrollState.camera;
  c.x = w.camera.x;
  c.y = w.camera.y;
  c.z = w.camera.z;
  c.lookX = w.camera.lookX;
  c.lookY = w.camera.lookY;
  c.lookZ = w.camera.lookZ;
  c.fov = w.camera.fov;

  scrollState.docs.visible = w.docs;
  scrollState.docs.absorb = w.absorb;
}

function lerpWaypoints(list: Waypoint[], t: number) {
  const clamped = Math.max(0, Math.min(1, t));
  if (clamped <= list[0].t) {
    applyWaypoint(list[0]);
    scrollState.chapter = list[0].label;
    return;
  }
  if (clamped >= list[list.length - 1].t) {
    applyWaypoint(list[list.length - 1]);
    scrollState.chapter = list[list.length - 1].label;
    return;
  }
  let i = 0;
  while (i < list.length - 1 && list[i + 1].t < clamped) i++;
  const a = list[i];
  const b = list[i + 1];
  const u = (clamped - a.t) / (b.t - a.t || 1);
  const smooth = u * u * (3 - 2 * u);
  const mix = (ka: number, kb: number) => ka + (kb - ka) * smooth;

  applyWaypoint({
    t: clamped,
    label: (smooth < 0.5 ? a.label : b.label) as ChapterId,
    phone: {
      x: mix(a.phone.x, b.phone.x),
      y: mix(a.phone.y, b.phone.y),
      z: mix(a.phone.z, b.phone.z),
      rotX: mix(a.phone.rotX, b.phone.rotX),
      rotY: mix(a.phone.rotY, b.phone.rotY),
      rotZ: mix(a.phone.rotZ, b.phone.rotZ),
      scale: mix(a.phone.scale, b.phone.scale),
    },
    camera: {
      x: mix(a.camera.x, b.camera.x),
      y: mix(a.camera.y, b.camera.y),
      z: mix(a.camera.z, b.camera.z),
      lookX: mix(a.camera.lookX, b.camera.lookX),
      lookY: mix(a.camera.lookY, b.camera.lookY),
      lookZ: mix(a.camera.lookZ, b.camera.lookZ),
      fov: mix(a.camera.fov, b.camera.fov),
    },
    docs: mix(a.docs, b.docs),
    absorb: mix(a.absorb, b.absorb),
  });
  scrollState.chapter = (smooth < 0.5 ? a.label : b.label) as ChapterId;
}

function screenFromProgress(t: number): ScreenState {
  if (t < 0.12) return "home";
  if (t < 0.32) return "lesson";
  if (t < 0.465) return "courses";
  if (t < 0.615) return "askme";
  if (t < 0.69) return "scan";
  if (t < 0.762) return "check";
  if (t < 0.875) return "revision";
  if (t < 0.945) return "folder";
  return "landscape";
}

type Props = {
  enableFilm?: boolean;
};

export function ScrollExperience({ enableFilm = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    if (!root || !pin) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollState.reducedMotion = reduced;

    const proxy: Proxy = {
      t: 0,
      hero: 1,
      lessons: 0,
      pebby: 0,
      scan: 0,
      revision: 0,
      plan: 0,
      cta: 0,
    };

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px), (max-height: 500px) and (pointer: coarse)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { isMobile, reduce } = ctx.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduce: boolean;
        };
        scrollState.isMobile = !!isMobile;
        scrollState.reducedMotion = !!reduce;

        const getWaypoints = () => (isMobile ? MOBILE_WAYPOINTS : DESKTOP_WAYPOINTS);
        const scrollLen = reduce ? "+=240%" : isMobile ? "+=540%" : "+=760%";
        const layer = pin.querySelector(".chapter-layer") as HTMLElement | null;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: scrollLen,
            scrub: reduce ? true : 1,
            pin: pin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              scrollState.progress = self.progress;
              notifyStoryProgress(self.progress);
            },
          },
        });

        if (tl.scrollTrigger) {
          registerStoryScrollTrigger(tl.scrollTrigger);
        }

        const writeOverlays = () => {
          scrollState.overlays.hero = proxy.hero;
          scrollState.overlays.lessons = proxy.lessons;
          scrollState.overlays.pebby = proxy.pebby;
          scrollState.overlays.scan = proxy.scan;
          scrollState.overlays.revision = proxy.revision;
          scrollState.overlays.plan = proxy.plan;
          scrollState.overlays.cta = proxy.cta;

          if (layer) {
            layer.style.setProperty("--o-hero", String(proxy.hero));
            layer.style.setProperty("--o-lessons", String(proxy.lessons));
            layer.style.setProperty("--o-pebby", String(proxy.pebby));
            layer.style.setProperty("--o-scan", String(proxy.scan));
            layer.style.setProperty("--o-revision", String(proxy.revision));
            layer.style.setProperty("--o-plan", String(proxy.plan));
            layer.style.setProperty("--o-cta", String(proxy.cta));

            const map: [string, number][] = [
              ["hero", proxy.hero],
              ["lessons", proxy.lessons],
              ["pebby", proxy.pebby],
              ["scan", proxy.scan],
              ["revision", proxy.revision],
              ["plan", proxy.plan],
              ["cta", proxy.cta],
            ];
            for (const [id, v] of map) {
              const el = layer.querySelector(`[data-chapter="${id}"]`) as HTMLElement | null;
              if (!el) continue;
              const live = v > 0.45;
              el.classList.toggle("is-live", live);
              el.style.pointerEvents = live ? "auto" : "none";
            }
          }
        };

        const applyProgress = () => {
          lerpWaypoints(getWaypoints(), proxy.t);
          scrollState.screen = screenFromProgress(proxy.t);
        };

        applyProgress();
        writeOverlays();

        tl.to(
          proxy,
          {
            t: 1,
            duration: 1,
            onUpdate: applyProgress,
          },
          0
        );

        const fade = (prop: keyof Proxy, from: number, to: number, dur: number, at: number) => {
          tl.fromTo(
            proxy,
            { [prop]: from },
            {
              [prop]: to,
              duration: dur,
              immediateRender: false,
              onUpdate: writeOverlays,
            },
            at
          );
        };

        tl.set(
          proxy,
          {
            hero: 1,
            lessons: 0,
            pebby: 0,
            scan: 0,
            revision: 0,
            plan: 0,
            cta: 0,
            onUpdate: writeOverlays,
          },
          0
        );

        fade("hero", 1, 0, 0.05, 0.1);
        fade("lessons", 0, 1, 0.05, 0.12);
        fade("lessons", 1, 0, 0.04, 0.41);
        fade("pebby", 0, 1, 0.05, 0.48);
        fade("pebby", 1, 0, 0.04, 0.59);
        fade("scan", 0, 1, 0.05, 0.62);
        fade("scan", 1, 0, 0.04, 0.73);
        fade("revision", 0, 1, 0.05, 0.75);
        fade("revision", 1, 0, 0.04, 0.84);
        fade("plan", 0, 1, 0.05, 0.86);
        fade("plan", 1, 0, 0.04, 0.93);
        fade("cta", 0, 1, 0.05, 0.95);

        tl.addLabel("hero", 0);
        tl.addLabel("lessons", 0.26);
        tl.addLabel("pebby", 0.53);
        tl.addLabel("scan", 0.67);
        tl.addLabel("revision", 0.8);
        tl.addLabel("plan", 0.9);
        tl.addLabel("cta", 0.98);

        proxy.hero = 1;
        proxy.lessons = 0;
        proxy.pebby = 0;
        proxy.scan = 0;
        proxy.revision = 0;
        proxy.plan = 0;
        proxy.cta = 0;
        applyProgress();
        writeOverlays();

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          if (tl.scrollTrigger) registerStoryScrollTrigger(tl.scrollTrigger);
          if (!tl.scrollTrigger || tl.scrollTrigger.progress < 0.001) {
            proxy.t = 0;
            proxy.hero = 1;
            proxy.lessons = 0;
            proxy.pebby = 0;
            proxy.scan = 0;
            proxy.revision = 0;
            proxy.plan = 0;
            proxy.cta = 0;
          }
          applyProgress();
          writeOverlays();
        });

        return () => {
          registerStoryScrollTrigger(null);
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      }
    );

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      mm.revert();
    };
  }, []);

  return (
    <section ref={rootRef} id="story" className="story" aria-label="ACADEMe product story">
      <div ref={pinRef} className="story-pin">
        {}
        <ChapterOverlay />
        {enableFilm ? (
          <Suspense fallback={<div className="webgl-layer" aria-hidden />}>
            <ExperienceCanvas />
          </Suspense>
        ) : (
          <div className="webgl-layer" aria-hidden />
        )}
      </div>
    </section>
  );
}
