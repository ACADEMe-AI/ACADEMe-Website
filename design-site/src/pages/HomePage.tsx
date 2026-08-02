import { Link } from "react-router-dom";
import { navGroups } from "../lib/nav";
import { ArrowRight, CheckCircle2, ListOrdered, Palette, Wrench } from "lucide-react";
import Reveal from "../components/Reveal";

const starts = [
  {
    title: "What do we build next?",
    desc: "Roadmap and checklist — one path, no confusion.",
    to: "/product/checklist",
    icon: ListOrdered,
    cta: "Open checklist",
  },
  {
    title: "Brand basics",
    desc: "Colors, logo, and voice in one place.",
    to: "/brand/color",
    icon: Palette,
    cta: "See brand",
  },
  {
    title: "Building as an agent",
    desc: "Hard rules so you don’t invent process.",
    to: "/build/start",
    icon: Wrench,
    cta: "Read rules",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center mb-16">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="ACADEMe logo" className="w-12 h-12 object-contain" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Design system
            </span>
          </div>

          <h1 className="text-[clamp(2.25rem,5.5vw,3.5rem)] font-bold tracking-[-0.04em] leading-[1.05] text-white mb-4">
            Clear rules.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              One place to look.
            </span>
          </h1>

          <p className="text-lg text-muted max-w-md leading-relaxed mb-8">
            Brand, product order, and build rules for ACADEMe. Short pages.
            Real logos and character art — not walls of text.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/product/checklist"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-[0_0_32px_rgba(91,108,255,0.35)]"
            >
              Start: what next?
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/visual/mascot"
              className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] hover:border-primary/40 text-sm font-medium px-5 py-3 rounded-2xl text-muted hover:text-white"
            >
              See mascot
            </Link>
          </div>
        </div>

        <Reveal y={24}>
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-4 sm:p-6 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(91,108,255,0.2),transparent_55%)]" />
            <img
              src="/mascot.png"
              alt="ACADEMe learning buddy character sheet"
              className="relative w-full h-auto rounded-2xl object-cover max-h-[420px] object-top"
            />
            <p className="relative mt-3 text-xs text-muted text-center">
              Character sheet · learning buddy (name used sparingly in product)
            </p>
          </div>
        </Reveal>
      </section>

      {/* 3 clear starts */}
      <section className="mb-16">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted mb-4">
          Pick how you arrived
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {starts.map((s, i) => (
            <Reveal key={s.to} delay={0.06 * i}>
              <Link
                to={s.to}
                className="group flex flex-col h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 hover:border-primary/40 hover:bg-white/[0.04] transition-all"
              >
                <s.icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="text-base font-semibold text-white mb-1">{s.title}</h3>
                <p className="text-sm text-muted flex-1 mb-4">{s.desc}</p>
                <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
                  {s.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Menu map */}
      <section className="mb-16">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted mb-4">
          Full menu
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {navGroups.map((g, i) => (
            <Reveal key={g.id} delay={0.05 * i}>
              <div className="rounded-2xl border border-white/[0.07] bg-[#0e1016] p-5 h-full">
                <h3 className="text-white font-semibold mb-1">{g.label}</h3>
                <p className="text-xs text-muted mb-3">{g.description}</p>
                <ul className="space-y-1.5">
                  {g.items.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="text-sm text-muted hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Simple order */}
      <Reveal>
        <section className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-primary/10 to-transparent p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            Build order (don’t skip)
          </h2>
          <ol className="space-y-3 text-sm text-muted">
            <li className="flex gap-3">
              <span className="text-primary font-mono font-semibold">1</span>
              Finish this design system (you’re here)
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-mono font-semibold">2</span>
              Polish marketing website (QR, colors, clear copy)
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-mono font-semibold">3</span>
              Mascot motion for the app
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-mono font-semibold">4</span>
              Mobile student product
            </li>
          </ol>
          <Link
            to="/product/roadmap"
            className="inline-flex mt-5 text-sm font-medium text-primary hover:underline"
          >
            Full roadmap →
          </Link>
        </section>
      </Reveal>
    </div>
  );
}
