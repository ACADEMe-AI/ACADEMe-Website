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
  actions,
  expressions,
  heroSrc,
  logos,
  turnaround,
  type MascotPose,
} from "../lib/assets";
import { useExpand } from "../lib/expandContext";
import { dpath, stripDesignBase } from "../lib/base";

function PoseGrid({
  items,
  cols = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
}: {
  items: MascotPose[];
  cols?: string;
}) {
  return (
    <div className={`grid gap-4 sm:gap-5 ${cols}`}>
      {items.map((c) => (
        <div
          key={c.id}
          className="group rounded-2xl border border-border bg-surface p-4 text-center shadow-sm transition hover:border-primary/30 hover:shadow-md"
        >
          <div className="mb-3 flex aspect-square items-center justify-center rounded-xl bg-surface2">
            <img
              src={c.src}
              alt={c.label}
              className="max-h-[88%] max-w-[88%] object-contain transition group-hover:scale-[1.04]"
            />
          </div>
          <p className="text-sm font-medium text-ink">{c.label}</p>
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
  const accent = loc.color || landingColor || "#5b6cff";

  /** Logo mark → fly home (desktop chrome) */
  const handleLogoHome = (e: MouseEvent) => {
    e.preventDefault();
    const el = logoRef.current;
    const rect = el
      ? el.getBoundingClientRect()
      : new DOMRect(24, 16, 32, 32);
    goHome(rect);
  };

  /** Hamburger / footer → cards reassemble once (no side drawer) */
  const handleCardsHome = (e?: MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    goHomeCards();
  };

  const file = fileForPath(pathname) ?? "start/overview.md";
  const mdRaw = loadContent(file);
  // Page already has a hero title — drop the first markdown H1 to avoid double titles
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
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const isLogo =
    pathname.includes("logo") ||
    pathname === "/foundations" ||
    pathname.endsWith("/foundations/");
  const isColor = pathname.includes("color");
  const isExpressions = pathname.includes("expressions");
  const isActions = pathname.includes("actions") || pathname.includes("moments");
  const isTurnaround = pathname.includes("turnaround");
  const isCharacterHome =
    pathname === "/character" || pathname.endsWith("/character/");
  const isMotion = pathname.includes("motion");
  const isType = pathname.includes("type");
  const isVoice = pathname.includes("voice");

  // Next item in group for footer CTA
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

      {/* Soft brand wash */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(91,108,255,0.1),transparent_60%)]" />

      {/* Header: logo left · nav center/right desktop · hamburger RIGHT on mobile */}
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
              src={logos.onLight}
              alt="ACADEMe"
              className="h-8 w-8 object-contain transition group-hover:opacity-80 group-hover:scale-105"
            />
            <div className="hidden min-w-0 leading-none sm:block">
              <div className="text-[15px] font-semibold tracking-tight text-ink">
                ACADEMe
              </div>
              <div className="mt-1 text-[11px] text-muted">Design</div>
            </div>
          </a>

          {/* Desktop nav only — not mounted on small screens (avoids hidden duplicates) */}
          <nav className="ml-auto hidden items-center gap-0.5 lg:flex" aria-label="Sections">
            {navGroups.map((g) => (
              <div key={g.id} className="group relative">
                <button
                  type="button"
                  className={`inline-flex items-center rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
                    group?.id === g.id
                      ? "bg-primary/10 text-primary"
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
              to={dpath("/product/checklist")}
              className="hidden rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#4a59e6] md:inline-flex"
            >
              What next
            </Link>
            {/* Mobile: hamburger icon only — cards reassemble (no drawer) */}
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
        {/* Page hero band */}
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
              src={heroSrc}
              alt=""
              className="hidden h-28 w-auto object-contain lg:block"
            />
          )}
          {isLogo && (
            <img
              src={logos.onLight}
              alt=""
              className="hidden h-20 w-20 object-contain lg:block"
            />
          )}
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
          <article className="min-w-0 max-w-3xl space-y-10">
            {/* Logo samples — transparent PNGs only */}
            {isLogo && (
              <section className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-[#12141c] p-10 shadow-sm">
                  <img
                    src={logos.onDark}
                    alt="Logo on dark (transparent)"
                    className="h-28 w-28 object-contain"
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium text-white/90">
                      On dark · light cube
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-white/45">
                      {logos.onDarkSource}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-surface p-10 shadow-sm">
                  <img
                    src={logos.onLight}
                    alt="Logo on light (transparent)"
                    className="h-28 w-28 object-contain"
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium text-ink">
                      On light · dark cube · default
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-muted">
                      {logos.onLightSource}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {isColor && (
              <section>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {(
                    [
                      ["#F6F7FA", "Background"],
                      ["#FFFFFF", "Surface"],
                      ["#5B6CFF", "Primary"],
                      ["#0D9F6E", "Accent"],
                      ["#12141A", "Text"],
                      ["#E03E4D", "Error"],
                    ] as const
                  ).map(([hex, name]) => (
                    <div
                      key={hex}
                      className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
                    >
                      <div
                        className="h-16 border-b border-border"
                        style={{ background: hex }}
                      />
                      <div className="px-3 py-2.5">
                        <p className="text-xs font-medium text-ink">{name}</p>
                        <p className="font-mono text-[11px] text-muted">{hex}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(isCharacterHome || isMotion) && (
              <section className="overflow-hidden rounded-[1.75rem] border border-border bg-surface p-8 shadow-sm sm:p-12">
                <img
                  src={heroSrc}
                  alt="Learning buddy hero"
                  className="mx-auto max-h-80 w-auto object-contain"
                />
                <p className="mt-6 text-center text-sm text-muted">
                  Learning buddy · use sparingly in product UI
                </p>
              </section>
            )}

            {isExpressions && (
              <section className="space-y-4">
                <p className="text-[15px] text-muted">
                  Cut from the official sheet. Transparent PNG. Filename matches
                  the id.
                </p>
                <PoseGrid items={expressions} />
              </section>
            )}

            {isActions && (
              <section className="space-y-4">
                <p className="text-[15px] text-muted">
                  Study moments for empty states, wins, and focus.
                </p>
                <PoseGrid items={actions} cols="grid-cols-2 sm:grid-cols-3" />
              </section>
            )}

            {isTurnaround && (
              <section className="space-y-4">
                <p className="text-[15px] text-muted">
                  Five angles for consistent illustration.
                </p>
                <PoseGrid
                  items={turnaround}
                  cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                />
              </section>
            )}

            {isCharacterHome && (
              <section className="space-y-6">
                <div>
                  <h2 className="mb-4 text-lg font-semibold text-ink">
                    Quick sample
                  </h2>
                  <PoseGrid
                    items={expressions.slice(0, 8)}
                    cols="grid-cols-2 sm:grid-cols-4"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  {(
                    [
                      ["/character/expressions", "All expressions"],
                      ["/character/actions", "In action"],
                      ["/character/turnaround", "Turnaround"],
                      ["/character/motion", "Motion"],
                    ] as const
                  ).map(([to, label]) => (
                    <Link
                      key={to}
                      to={dpath(to)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink transition hover:border-primary/40 hover:text-primary"
                    >
                      {label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {(isType || isVoice) && (
              <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
                <p className="text-sm text-muted">
                  {isType
                    ? "Type scale, spacing, and tokens live in the guide below."
                    : "How ACADEMe sounds across product and marketing."}
                </p>
              </section>
            )}

            {/* Full markdown body */}
            <div className="doc-body" dangerouslySetInnerHTML={{ __html: html }} />

            {/* Next in section */}
            {next && (
              <Link
                to={dpath(next.path)}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-6 py-5 shadow-sm transition hover:border-primary/35 hover:shadow-md"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Next in {group?.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-ink group-hover:text-primary">
                    {next.label}
                  </p>
                  {next.description && (
                    <p className="mt-0.5 text-sm text-muted">{next.description}</p>
                  )}
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-primary" />
              </Link>
            )}
          </article>

          {/* Sticky side nav — full section list */}
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
                              ? "border-l-2 border-primary font-medium text-primary"
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
                to={dpath("/product/checklist")}
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                What next
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
              src={logos.onLight}
              alt=""
              className="h-7 w-7 object-contain opacity-90"
            />
            <span className="text-sm text-muted">ACADEMe Design</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
