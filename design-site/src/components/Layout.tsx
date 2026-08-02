import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { navGroups } from "../lib/nav";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SmoothScroll from "./SmoothScroll";

function DesktopDropdown({
  group,
}: {
  group: (typeof navGroups)[0];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const active = group.items.some((i) => i.path === location.pathname);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
          active || open
            ? "text-white bg-white/[0.06]"
            : "text-muted hover:text-white hover:bg-white/[0.04]"
        }`}
      >
        {group.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-white/10 bg-[#12141c]/95 backdrop-blur-xl shadow-2xl shadow-black/40 p-2 z-50"
          >
            <p className="px-3 pt-2 pb-1.5 text-[11px] text-muted">{group.description}</p>
            {group.items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors"
              >
                <div className="text-sm font-medium text-white">{item.label}</div>
                {item.description && (
                  <div className="text-[12px] text-muted mt-0.5">{item.description}</div>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <SmoothScroll>
      <div className="grain" aria-hidden />
      <div className="min-h-screen flex flex-col relative">
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#07080c]/85 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <img
                src="/logo.png"
                alt="ACADEMe"
                className="w-8 h-8 object-contain opacity-95 group-hover:opacity-100 transition-opacity"
              />
              <div className="leading-tight">
                <div className="font-semibold text-[15px] tracking-tight text-white">
                  ACADEMe
                </div>
                <div className="text-[10px] text-muted tracking-wide hidden sm:block">
                  Design system
                </div>
              </div>
            </Link>

            {/* Desktop menu with dropdowns */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navGroups.map((g) => (
                <DesktopDropdown key={g.id} group={g} />
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/product/checklist"
                className="text-sm font-medium text-primary hover:text-primary/80 px-3 py-2"
              >
                What next?
              </Link>
            </div>

            <button
              type="button"
              className="md:hidden p-2 text-muted hover:text-white"
              aria-label="Open menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile full menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden border-t border-white/[0.07] bg-[#0a0b10] overflow-hidden"
              >
                <div className="px-4 py-4 space-y-5 max-h-[70vh] overflow-y-auto">
                  {navGroups.map((group) => (
                    <div key={group.id}>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">
                        {group.label}
                      </div>
                      <div className="space-y-1">
                        {group.items.map((item) => (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                              `block rounded-xl px-3 py-2.5 text-sm ${
                                isActive
                                  ? "bg-primary/15 text-white"
                                  : "text-muted hover:text-white hover:bg-white/[0.04]"
                              }`
                            }
                          >
                            {item.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="flex-1 relative">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="glow-orb w-[380px] h-[380px] bg-primary/15 -top-24 right-0" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <footer className="border-t border-white/[0.07] py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-muted">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="" className="w-5 h-5 object-contain opacity-70" />
              <span>ACADEMe Design System</span>
            </div>
            <p className="text-xs">For builders & agents · keep product UI simple</p>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
