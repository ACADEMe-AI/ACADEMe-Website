import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowRight, Menu } from "lucide-react";
import {
  fileForPath,
  groupForPath,
  labelForPath,
  navGroups,
  tiles,
} from "../lib/nav";
import { loadContent } from "../lib/loadContent";
import { renderMarkdown } from "../lib/markdown";
import {
  logos,
  pebbyHero,
  pebbyMotion,
  pebbyPoses,
  type PebbyPose,
} from "../lib/assets";
import { useExpand } from "../lib/expandContext";
import { dpath, stripDesignBase } from "../lib/base";

const PRIMARY = "#564cf1";

const swatchGroups: { title: string; swatches: [string, string][] }[] = [
  {
    title: "Brand",
    swatches: [
      ["#564CF1", "primary"],
      ["#4A59E6", "primaryPressed"],
      ["#FFFFFF", "onPrimary"],
      ["#F5A800", "selected"],
      ["#8A6100", "selectedInk"],
      ["#12141A", "keycapEdge"],
    ],
  },
  {
    title: "Status",
    swatches: [
      ["#7CFFB2", "accent"],
      ["#3DDC97", "success"],
      ["#0D9F6E", "lightSuccess"],
      ["#FFC14D", "warning"],
      ["#FF5C6A", "error"],
      ["#B42332", "errorInk"],
      ["#FF8A4C", "streak"],
    ],
  },
  {
    title: "Pebby",
    swatches: [
      ["#A2A4FB", "pebbyLight"],
      ["#8B8CF5", "pebbyMid"],
      ["#6E71D6", "pebbyDeep"],
    ],
  },
  {
    title: "Dark",
    swatches: [
      ["#0B0C0F", "background"],
      ["#14161C", "surface"],
      ["#1C1F28", "surfaceRaised"],
      ["#2A2E38", "border"],
      ["#F2F3F5", "text"],
      ["#8B93A7", "textMuted"],
      ["#5C6578", "textFaint"],
      ["#171726", "splash"],
    ],
  },
  {
    title: "Light",
    swatches: [
      ["#F6F7FA", "lightBackground"],
      ["#FFFFFF", "lightSurface"],
      ["#EEF0F5", "lightSurfaceRaised"],
      ["#D8DCE6", "lightBorder"],
      ["#12141A", "lightText"],
      ["#5C6578", "lightTextMuted"],
    ],
  },
  {
    title: "Tints",
    swatches: [
      ["#E7E6FF", "lavender"],
      ["#FFE7A3", "amber"],
      ["#D9F4EA", "mint"],
      ["#FFE0EC", "pink"],
      ["#DCEBFF", "sky"],
      ["#FFF9E8", "cream"],
      ["#FFE3E0", "rose"],
    ],
  },
];

const indicFamilies =
  '"Noto Sans", "Noto Sans Devanagari", "Noto Sans Telugu", "Noto Sans Tamil", "Noto Sans Bengali", sans-serif';

const typeSpecimens: {
  sample: string;
  family: string;
  weight: number;
  size: string;
  lineHeight: number;
  meta: string;
}[] = [
  {
    sample: "Your syllabus. One swipe at a time.",
    family: '"Baloo 2", "Noto Sans", sans-serif',
    weight: 800,
    size: "clamp(2rem, 5vw, 2.75rem)",
    lineHeight: 1.1,
    meta: "Baloo 2 · 800 · headlines",
  },
  {
    sample: "Chapter 3 · Pair of linear equations",
    family: '"Archivo", "Noto Sans", sans-serif',
    weight: 700,
    size: "1.5rem",
    lineHeight: 1.25,
    meta: "Archivo · 700 · subheads, card titles",
  },
  {
    sample:
      "Keep any card, and every question you miss comes back in your revision: tomorrow, then a few days later.",
    family: '"Noto Sans", sans-serif',
    weight: 400,
    size: "1.0625rem",
    lineHeight: 1.6,
    meta: "Noto Sans · 400 and 600 · body, labels, inputs",
  },
  {
    sample: "आज हम क्या पढ़ें? · ఈరోజు ఏం చదువుదాం? · இன்று என்ன படிப்போம்? · আজ আমরা কী পড়ব?",
    family: indicFamilies,
    weight: 600,
    size: "1.125rem",
    lineHeight: 1.6,
    meta: "Noto Sans Devanagari, Telugu, Tamil, Bengali · 600",
  },
];

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`doc-wordmark ${className}`} aria-label="ACADEMe">
      ACADEM<span>e</span>
    </span>
  );
}

function PoseGrid({
  items,
  caption = "label",
  cols = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
}: {
  items: PebbyPose[];
  caption?: "label" | "moment";
  cols?: string;
}) {
  return (
    <div className={`grid gap-4 ${cols}`}>
      {items.map((c) => (
        <div
          key={c.id}
          className="group rounded-2xl border border-border bg-surface p-3 text-center shadow-sm transition hover:border-[#564CF1]/30 hover:shadow-md"
        >
          <div className="mb-2 flex aspect-square items-center justify-center rounded-xl bg-surface2">
            <img
              src={c.src}
              alt={`Pebby, ${c.label}`}
              className="max-h-[92%] max-w-[92%] object-contain transition group-hover:scale-[1.04]"
            />
          </div>
          <p className="text-sm font-semibold text-ink">
            {caption === "moment" ? c.moment : c.label}
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-muted">{c.id}.png</p>
        </div>
      ))}
    </div>
  );
}

type LocState = {
  fromExpand?: boolean;
  color?: string;
  label?: string;
};

export default function DocPage() {
  const { pathname: rawPath, state } = useLocation();
  const pathname = stripDesignBase(rawPath);
  const { landingColor, clearLanding, goHome, goHomeCards } = useExpand();
  const logoRef = useRef<HTMLImageElement>(null);
  const loc = (state as LocState) || {};
  const accent = loc.color || landingColor || PRIMARY;

  const handleLogoHome = (e: MouseEvent) => {
    e.preventDefault();
    const el = logoRef.current;
    const rect = el
      ? el.getBoundingClientRect()
      : new DOMRect(24, 16, 32, 32);
    goHome(rect);
  };

  const handleCardsHome = (e?: MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    goHomeCards();
  };

  const file = fileForPath(pathname) ?? "start/overview.md";
  const mdRaw = loadContent(file);
  const md = mdRaw.replace(/^#\s+[^\n]+\n+/, "");
  const html = renderMarkdown(md);
  const title = labelForPath(pathname);
  const group = groupForPath(pathname);

  const [entered, setEntered] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setEntered(false);
    setAnimKey((k) => k + 1);

    const id = window.setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setEntered(true));
      });
    }, 0);
    const t = loc.fromExpand
      ? window.setTimeout(() => clearLanding(), 420)
      : undefined;

    return () => {
      window.clearTimeout(id);
      if (t) window.clearTimeout(t);
    };
  }, [pathname]);

  const isLogo =
    pathname.includes("logo") ||
    pathname === "/foundations" ||
    pathname.endsWith("/foundations/");
  const isColor = pathname === "/foundations/color";
  const isType = pathname === "/foundations/type";
  const isPoses = pathname === "/character/expressions";
  const isMoments = pathname === "/character/actions";
  const isCharacterHome =
    pathname === "/character" || pathname.endsWith("/character/");
  const isMotion = pathname === "/character/motion";

  const groupItems = group?.items ?? [];
  const idx = groupItems.findIndex((i) => i.path === pathname);
  const next = idx >= 0 ? groupItems[idx + 1] : undefined;

  return (
    <div className="doc-shell min-h-screen bg-bg text-ink">
      <div
        className="doc-entry-flash"
        style={{
          background: accent,
          opacity: entered ? 0 : 1,
          pointerEvents: entered ? "none" : "auto",
        }}
        aria-hidden
      />

      <div className="pointer-events-none fixed inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(86,76,241,0.1),transparent_60%)]" />

      <header className="sticky top-0 z-40 border-b border-border/60 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1120px] items-center gap-3 px-4 sm:h-16 sm:gap-4 sm:px-5">
          <a
            href={dpath("/")}
            onClick={handleLogoHome}
            className="group flex shrink-0 cursor-pointer items-center gap-2.5"
            aria-label="ACADEMe Design home"
          >
            <img
              ref={logoRef}
              src={logos.cube}
              alt="ACADEMe"
              className="h-8 w-8 object-contain transition group-hover:opacity-80 group-hover:scale-105"
            />
            <div className="hidden min-w-0 leading-none sm:block">
              <Wordmark className="block text-[17px] text-ink" />
              <div className="mt-1 text-[11px] text-muted">Design</div>
            </div>
          </a>

          <nav className="ml-auto hidden items-center gap-0.5 lg:flex" aria-label="Sections">
            {navGroups.map((g) => (
              <div key={g.id} className="group relative">
                <button
                  type="button"
                  className={`inline-flex items-center rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
                    group?.id === g.id
                      ? "bg-[#564CF1]/10 text-[#564CF1]"
                      : "text-muted hover:bg-surface2 hover:text-ink"
                  }`}
                >
                  {g.label}
                </button>
                <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="rounded-xl border border-[#d8dce6] bg-white p-2 shadow-[0_16px_40px_-12px_rgba(18,20,26,0.28)]">
                    <p className="px-3 pb-2 pt-1 text-[11px] text-muted">
                      {g.description}
                    </p>
                    {g.items.map((item) => (
                      <Link
                        key={item.path}
                        to={dpath(item.path)}
                        className="block rounded-lg px-3 py-2.5 transition hover:bg-[#eef0f5]"
                      >
                        <div className="text-[13px] font-medium text-ink">
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="mt-0.5 text-[12px] text-muted">
                            {item.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-2">
            <Link
              to={dpath("/product/usps")}
              className="keycap hidden px-4 py-1.5 text-[13px] md:inline-flex"
            >
              USPs
            </Link>
            <button
              type="button"
              className="rounded-full p-2.5 text-ink hover:bg-surface2 lg:hidden"
              aria-label="Back to home tiles"
              onClick={handleCardsHome}
            >
              <Menu className="h-5 w-5" strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </header>

      <main
        key={animKey}
        className={`doc-page-enter relative mx-auto max-w-[1120px] px-5 py-10 sm:py-14 ${
          entered ? "is-in" : ""
        }`}
      >
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            {group && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {group.label}
              </p>
            )}
            <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-tight text-ink">
              {title}
            </h1>
            {group?.description && (
              <p className="mt-2 max-w-xl text-[16px] text-muted">
                {group.description}
                {groupItems.length > 1
                  ? ` · ${groupItems.length} pages in this section`
                  : ""}
              </p>
            )}
          </div>
          {(isCharacterHome || isMotion) && (
            <img
              src={isMotion ? pebbyMotion : pebbyHero}
              alt=""
              className="hidden h-28 w-auto object-contain lg:block"
            />
          )}
          {isLogo && (
            <img
              src={logos.cube}
              alt=""
              className="hidden h-20 w-20 object-contain lg:block"
            />
          )}
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
          <article className="min-w-0 max-w-3xl space-y-10">
            {isLogo && (
              <section className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-border bg-[#0b0c0f] p-10 shadow-sm">
                  <img
                    src={logos.mark}
                    alt="ACADEMe cube for dark surfaces"
                    className="h-28 w-28 object-contain"
                  />
                  <Wordmark className="text-[32px] text-[#f2f3f5]" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-[#f2f3f5]">
                      On dark · the website default
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-[#8b93a7]">
                      logo_mark.png
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-border bg-surface p-10 shadow-sm">
                  <img
                    src={logos.cube}
                    alt="ACADEMe cube for light surfaces"
                    className="h-28 w-28 object-contain"
                  />
                  <Wordmark className="text-[32px] text-[#0b0c0f]" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-ink">On light</p>
                    <p className="mt-1 font-mono text-[11px] text-muted">
                      academe_cube.png
                    </p>
                  </div>
                </div>
              </section>
            )}

            {isColor && (
              <section className="space-y-8">
                {swatchGroups.map((g) => (
                  <div key={g.title}>
                    <h2 className="mb-3 text-lg text-ink">{g.title}</h2>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
                      {g.swatches.map(([hex, name]) => (
                        <div
                          key={`${g.title}-${name}`}
                          className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
                        >
                          <div
                            className="h-16 border-b border-border"
                            style={{ background: hex }}
                          />
                          <div className="px-3 py-2.5">
                            <p className="truncate text-xs font-semibold text-ink">
                              {name}
                            </p>
                            <p className="font-mono text-[11px] text-muted">{hex}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {isType && (
              <section className="space-y-4">
                {typeSpecimens.map((t) => (
                  <div
                    key={t.meta}
                    className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
                  >
                    <p
                      className="text-ink"
                      style={{
                        fontFamily: t.family,
                        fontWeight: t.weight,
                        fontSize: t.size,
                        lineHeight: t.lineHeight,
                      }}
                    >
                      {t.sample}
                    </p>
                    <p className="mt-4 font-mono text-[12px] text-muted">{t.meta}</p>
                  </div>
                ))}
                <div className="rounded-2xl border border-border bg-[#0b0c0f] p-6 shadow-sm sm:p-8">
                  <Wordmark className="text-[clamp(2.5rem,7vw,4rem)] text-[#f2f3f5]" />
                  <p className="mt-4 font-mono text-[12px] text-[#8b93a7]">
                    ArchivoWordmark · 600 with a 500 e · the wordmark only
                  </p>
                </div>
              </section>
            )}

            {(isCharacterHome || isMotion) && (
              <section className="overflow-hidden rounded-[1.75rem] border border-border bg-surface p-8 shadow-sm sm:p-12">
                <img
                  src={isMotion ? pebbyMotion : pebbyHero}
                  alt="Pebby"
                  className="mx-auto max-h-72 w-auto object-contain"
                />
                <p className="mt-6 text-center text-sm text-muted">
                  {isMotion
                    ? "Celebrate real wins only"
                    : "Pebby · Ask Pebby in ASKMe, on every card and after every scan"}
                </p>
              </section>
            )}

            {isPoses && <PoseGrid items={pebbyPoses} />}

            {isMoments && <PoseGrid items={pebbyPoses} caption="moment" />}

            {isCharacterHome && (
              <section className="space-y-6">
                <PoseGrid items={pebbyPoses.slice(0, 5)} />
                <div className="flex flex-wrap gap-3">
                  {(
                    [
                      ["/character/expressions", "All poses"],
                      ["/character/actions", "Moments"],
                      ["/character/shape", "Shape"],
                      ["/character/motion", "Motion"],
                    ] as const
                  ).map(([to, label]) => (
                    <Link
                      key={to}
                      to={dpath(to)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink transition hover:border-[#564CF1]/40 hover:text-[#564CF1]"
                    >
                      {label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="doc-body" dangerouslySetInnerHTML={{ __html: html }} />

            {next && (
              <Link
                to={dpath(next.path)}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-6 py-5 shadow-sm transition hover:border-[#564CF1]/35 hover:shadow-md"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Next in {group?.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-ink group-hover:text-[#564CF1]">
                    {next.label}
                  </p>
                  {next.description && (
                    <p className="mt-0.5 text-sm text-muted">{next.description}</p>
                  )}
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-[#564CF1]" />
              </Link>
            )}
          </article>

          <aside className="hidden self-start lg:block">
            <div className="sticky top-24 space-y-8">
              {group && (
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    In this section
                  </p>
                  <ul className="space-y-0.5 border-l border-border pl-3">
                    {group.items.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={dpath(item.path)}
                          className={`block rounded-r-md py-1.5 pl-2 text-sm transition ${
                            item.path === pathname
                              ? "border-l-2 border-[#564CF1] font-medium text-[#564CF1]"
                              : "text-muted hover:text-ink"
                          }`}
                          style={
                            item.path === pathname
                              ? { marginLeft: -13, paddingLeft: 11 }
                              : undefined
                          }
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Home tiles
                </p>
                <ul className="space-y-1">
                  {tiles.map((t) => (
                    <li key={t.path}>
                      <Link
                        to={dpath(t.path)}
                        className="flex items-center gap-2 text-sm text-muted transition hover:text-ink"
                      >
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-sm"
                          style={{ background: t.color }}
                        />
                        {t.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={dpath("/product/roadmap")}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#564CF1] hover:underline"
              >
                What's next
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-8 border-t border-border py-10">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={logos.cube}
              alt=""
              className="h-7 w-7 object-contain opacity-90"
            />
            <span className="text-sm text-muted">ACADEMe design system</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
