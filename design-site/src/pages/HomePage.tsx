import { Link } from "react-router-dom";
import { nav } from "../lib/nav";
import { ArrowUpRight, BookOpen, Feather, Layers, Megaphone, Package, Bot } from "lucide-react";
import Reveal from "../components/Reveal";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const icons: Record<string, React.ReactNode> = {
  identity: <Layers className="w-5 h-5" />,
  writing: <Feather className="w-5 h-5" />,
  illustration: <BookOpen className="w-5 h-5" />,
  marketing: <Megaphone className="w-5 h-5" />,
  product: <Package className="w-5 h-5" />,
  agents: <Bot className="w-5 h-5" />,
};

export default function HomePage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pillars = nav.filter((s) => s.id !== "home");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = titleRef.current;
    if (!el) return;
    const words = el.querySelectorAll(".word");
    gsap.fromTo(
      words,
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.15,
        stagger: 0.08,
        ease: "expo.out",
        delay: 0.1,
      }
    );
  }, []);

  return (
    <div className="relative">
      <div className="mb-3">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_12px_#7cffb2]" />
          Design system · Phase 0.4
        </span>
      </div>

      <h1
        ref={titleRef}
        className="text-[clamp(2.6rem,7vw,4.25rem)] font-bold tracking-[-0.045em] leading-[0.98] mb-6 max-w-2xl"
      >
        {["Build", "ACADEMe", "with", "one", "source", "of", "truth."].map((w) => (
          <span key={w} className="inline-block overflow-hidden mr-[0.28em] align-bottom">
            <span className="word inline-block">{w}</span>
          </span>
        ))}
      </h1>

      <Reveal delay={0.15}>
        <p className="text-lg sm:text-xl text-muted max-w-xl leading-relaxed mb-10">
          Agent-first guidelines — identity, writing, illustration, marketing, and
          product law — modeled after{" "}
          <a
            className="text-primary border-b border-primary/30 hover:border-primary transition-colors"
            href="https://design.duolingo.com/"
            target="_blank"
            rel="noreferrer"
          >
            design.duolingo.com
          </a>
          . Marketing sells the app. This site tells builders how to ship.
        </p>
      </Reveal>

      <Reveal delay={0.22}>
        <div className="flex flex-wrap gap-3 mb-16">
          <Link
            to="/agents/how-to-use"
            className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-[0_0_40px_var(--primary-glow)] transition-transform duration-300 hover:scale-[1.02]"
          >
            Agents start here
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/product/checklist"
            className="inline-flex items-center gap-2 border border-white/10 hover:border-primary/40 bg-white/[0.03] text-sm font-medium px-6 py-3 rounded-2xl text-muted hover:text-white transition-colors"
          >
            Open checklist
          </Link>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-4">
        {pillars.map((section, i) => (
          <Reveal key={section.id} delay={0.08 * i} y={28}>
            <Link
              to={section.items[0].path}
              className="group relative block rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent p-6 overflow-hidden transition-all duration-500 hover:border-primary/35 hover:shadow-[0_0_0_1px_rgba(91,108,255,0.12),0_24px_80px_-32px_var(--primary-glow)]"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-start justify-between gap-3 mb-4">
                <span className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-primary">
                  {icons[section.id] ?? <Layers className="w-5 h-5" />}
                </span>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
              </div>
              <h2 className="relative text-xl font-semibold tracking-tight text-white mb-1.5">
                {section.label}
              </h2>
              <p className="relative text-sm text-muted leading-relaxed">{section.blurb}</p>
              <p className="relative mt-4 text-xs font-medium text-primary/90 tracking-wide">
                View guide →
              </p>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-14 rounded-3xl border border-white/[0.07] bg-surface/40 p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent mb-2">
                Now shipping
              </p>
              <p className="text-2xl font-semibold tracking-tight text-white">
                Phase 0.4 — Design system spine
              </p>
              <p className="text-muted mt-2 max-w-md text-[15px] leading-relaxed">
                Complete this site as the agent source of truth, then polish the
                marketing showcase, then mascot motion, then the mobile product.
              </p>
            </div>
            <Link
              to="/product/roadmap"
              className="shrink-0 text-sm font-medium text-primary hover:underline"
            >
              Full roadmap →
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
