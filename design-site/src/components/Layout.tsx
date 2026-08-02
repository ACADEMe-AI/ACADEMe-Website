import { NavLink, Outlet, useLocation } from "react-router-dom";
import { nav } from "../lib/nav";
import { Menu, X, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SmoothScroll from "./SmoothScroll";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <SmoothScroll>
      <div className="grain" aria-hidden />
      <div className="min-h-screen flex flex-col md:flex-row relative">
        {/* Mobile bar */}
        <header className="md:hidden flex items-center justify-between px-5 h-14 border-b border-white/10 bg-[#0e1016]/90 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </span>
            <span className="font-semibold text-sm tracking-tight">ACADEMe Design</span>
          </div>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-muted hover:text-white transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        <aside
          className={`${
            open ? "flex" : "hidden"
          } md:flex flex-col w-full md:w-[272px] lg:w-[300px] shrink-0 border-r border-white/[0.07] bg-[#0a0b10]/95 md:min-h-screen md:sticky md:top-0 md:h-screen overflow-y-auto z-30 backdrop-blur-xl`}
        >
          <div className="hidden md:flex items-center gap-3 px-6 h-[4.5rem] border-b border-white/[0.07]">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-accent/10 border border-white/10 flex items-center justify-center shadow-[0_0_24px_var(--primary-glow)]">
              <Sparkles className="w-4 h-4 text-primary" />
            </span>
            <div>
              <div className="font-semibold text-[15px] tracking-tight">ACADEMe</div>
              <div className="text-[11px] text-muted tracking-wide">Design System</div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-6 space-y-6">
            {nav.map((section) => (
              <div key={section.id}>
                <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted/80">
                  {section.label}
                </div>
                <ul className="space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        end
                        className={({ isActive }) =>
                          `relative block rounded-xl px-3 py-2 text-[13.5px] transition-all duration-300 ${
                            isActive
                              ? "text-white bg-white/[0.06] shadow-[inset_0_0_0_1px_rgba(91,108,255,0.25)]"
                              : "text-muted hover:text-white hover:bg-white/[0.03]"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-full bg-primary shadow-[0_0_12px_var(--primary-glow)]" />
                            )}
                            {item.label}
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="p-5 border-t border-white/[0.07] text-[11px] text-muted leading-relaxed">
            <p className="mb-1 text-white/50 font-medium">Agents</p>
            Start at <code className="text-accent">design-site/AGENTS.md</code>
            <br />
            Content: <code className="text-accent/90">content/</code>
          </div>
        </aside>

        <main className="flex-1 min-w-0 relative">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="glow-orb w-[420px] h-[420px] bg-primary/20 -top-32 -right-24" />
            <div className="glow-orb w-[320px] h-[320px] bg-accent/10 bottom-0 left-1/4" />
          </div>
          <div className="relative max-w-3xl mx-auto px-5 sm:px-10 py-10 sm:py-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </SmoothScroll>
  );
}
