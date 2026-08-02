import { Link } from "react-router-dom";
import { nav } from "../lib/nav";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const pillars = nav.filter((s) => s.id !== "home");

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
        ACADEMe Design System
      </p>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
        Build ACADEMe with one source of truth
      </h1>
      <p className="text-lg text-muted max-w-xl leading-relaxed mb-8">
        Agent-first design docs — like{" "}
        <a
          className="text-primary hover:underline"
          href="https://design.duolingo.com/"
          target="_blank"
          rel="noreferrer"
        >
          design.duolingo.com
        </a>
        , for our product. Marketing site sells the app; this site tells builders
        how to ship without grepping the monorepo.
      </p>

      <div className="flex flex-wrap gap-3 mb-12">
        <Link
          to="/agents/how-to-use"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
        >
          Agents start here <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/product/checklist"
          className="inline-flex items-center gap-2 border border-border hover:border-primary/50 text-sm font-medium px-5 py-2.5 rounded-xl text-muted hover:text-white"
        >
          Open checklist
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {pillars.map((section) => (
          <Link
            key={section.id}
            to={section.items[0].path}
            className="group block rounded-2xl border border-border bg-surface hover:border-primary/40 p-5 transition-colors"
          >
            <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-primary transition-colors">
              {section.label}
            </h2>
            <p className="text-sm text-muted mb-3">{section.blurb}</p>
            <span className="text-xs font-medium text-primary">
              View guide →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-surface2/50 p-5 text-sm text-muted">
        <p className="font-medium text-white mb-2">Now: Phase 0.4</p>
        <p>
          Complete this design system spine, then polish the marketing showcase
          (0.5), then mascot motion (0.8), then mobile product parity (1.0).
        </p>
      </div>
    </div>
  );
}
