import { Link } from "react-router-dom";
import { navGroups } from "../lib/nav";
import { ArrowRight } from "lucide-react";

const paths = [
  {
    title: "What next",
    body: "See the current checklist and build order.",
    to: "/start/checklist",
  },
  {
    title: "Brand",
    body: "Logo, color, and how we write.",
    to: "/brand/logo",
  },
  {
    title: "Character",
    body: "Learning buddy poses for the app.",
    to: "/character",
  },
];

const poses = [
  { src: "/mascot/idle.jpg", label: "Default" },
  { src: "/mascot/thinking.jpg", label: "Thinking" },
  { src: "/mascot/studying.jpg", label: "Studying" },
  { src: "/mascot/celebrate.jpg", label: "Celebrate" },
  { src: "/mascot/wave.jpg", label: "Wave" },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <img
              src="/brand/logo-on-dark.png"
              alt="ACADEMe logo"
              className="h-11 w-11 object-contain"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b93a7]">
              Design system
            </span>
          </div>

          <h1 className="mb-4 text-[clamp(2.1rem,4.5vw,3.15rem)] font-semibold leading-[1.08] tracking-tight text-white">
            Build ACADEMe with clear rules and real assets
          </h1>

          <p className="mb-8 max-w-md text-[17px] leading-relaxed text-[#9aa3b5]">
            Logo, color, character poses, product order, and build rules.
            Short pages. Images first. One path when you are unsure.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/start/checklist"
              className="inline-flex items-center gap-2 rounded-full bg-[#5b6cff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#6b7aff]"
            >
              Start with checklist
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/character"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-[#c5cad6] hover:border-white/30 hover:text-white"
            >
              View character
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-[#5b6cff]/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#12141c] p-6 sm:p-8">
            <img
              src="/mascot/hero.jpg"
              alt="ACADEMe learning buddy"
              className="mx-auto h-auto w-full max-w-[320px] object-contain"
            />
            <p className="mt-4 text-center text-sm text-[#8b93a7]">
              Learning buddy · use sparingly in product UI
            </p>
          </div>
        </div>
      </section>

      {/* Three paths */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#8b93a7]">
          Choose a path
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {paths.map((p) => (
            <Link
              key={p.to}
              to={p.to}
              className="group rounded-2xl border border-white/[0.08] bg-[#111318] p-5 transition hover:border-[#5b6cff]/50 hover:bg-[#141824]"
            >
              <h3 className="mb-2 text-base font-semibold text-white">{p.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-[#8b93a7]">{p.body}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-[#7b8cff]">
                Open
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Character strip */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8b93a7]">
            Character poses
          </h2>
          <Link to="/character/expressions" className="text-sm text-[#7b8cff] hover:underline">
            All expressions
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {poses.map((p) => (
            <div
              key={p.label}
              className="rounded-2xl border border-white/[0.08] bg-[#111318] p-3 text-center"
            >
              <div className="mb-2 flex aspect-square items-center justify-center rounded-xl bg-white/[0.03]">
                <img src={p.src} alt={p.label} className="max-h-full max-w-full object-contain" />
              </div>
              <p className="text-xs font-medium text-[#c5cad6]">{p.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Site map */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#8b93a7]">
          Site map
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {navGroups.map((g) => (
            <div
              key={g.id}
              className="rounded-2xl border border-white/[0.07] bg-[#0e1016] p-4"
            >
              <p className="mb-1 text-sm font-semibold text-white">{g.label}</p>
              <p className="mb-3 text-[12px] text-[#8b93a7]">{g.description}</p>
              <ul className="space-y-1">
                {g.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-[13px] text-[#9aa3b5] hover:text-[#7b8cff]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Order */}
      <section className="rounded-2xl border border-white/[0.08] bg-[#111318] p-6 sm:p-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Build order</h2>
        <ol className="space-y-3 text-sm text-[#9aa3b5]">
          <li>
            <span className="mr-2 font-mono text-[#5b6cff]">1</span>
            Design system (this site)
          </li>
          <li>
            <span className="mr-2 font-mono text-[#5b6cff]">2</span>
            Marketing website polish
          </li>
          <li>
            <span className="mr-2 font-mono text-[#5b6cff]">3</span>
            Character motion in the app
          </li>
          <li>
            <span className="mr-2 font-mono text-[#5b6cff]">4</span>
            Mobile student product
          </li>
        </ol>
      </section>
    </div>
  );
}
