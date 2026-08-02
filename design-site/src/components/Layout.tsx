import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { navGroups } from "../lib/nav";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SmoothScroll from "./SmoothScroll";

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col bg-[#0a0b0f] text-[#f2f3f5]">
        <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0a0b0f]/92 backdrop-blur-md">
          <div className="mx-auto flex h-[4.25rem] max-w-[1120px] items-center justify-between gap-6 px-5">
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img
                src="/brand/logo-on-dark.png"
                alt="ACADEMe"
                className="h-9 w-9 object-contain"
              />
              <div className="hidden sm:block leading-none">
                <div className="text-[15px] font-semibold tracking-tight">ACADEMe</div>
                <div className="mt-1 text-[11px] text-[#8b93a7]">Design</div>
              </div>
            </Link>

            {/* Desktop: hover dropdowns (CSS group) */}
            <nav className="hidden lg:flex items-center gap-1">
              {navGroups.map((group) => (
                <div key={group.id} className="group relative">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-medium text-[#aeb5c4] transition-colors group-hover:bg-white/[0.05] group-hover:text-white"
                  >
                    {group.label}
                  </button>
                  <div className="invisible absolute left-0 top-full z-50 w-64 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-xl border border-white/10 bg-[#12141c] p-2 shadow-2xl shadow-black/50">
                      <p className="px-3 pb-2 pt-1 text-[11px] text-[#8b93a7]">
                        {group.description}
                      </p>
                      {group.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.06]"
                        >
                          <div className="text-[13px] font-medium text-white">
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="mt-0.5 text-[12px] text-[#8b93a7]">
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

            <Link
              to="/start/checklist"
              className="hidden md:inline-flex rounded-full bg-[#5b6cff] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#6b7aff]"
            >
              What next
            </Link>

            <button
              type="button"
              className="lg:hidden p-2 text-[#aeb5c4]"
              aria-label="Menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-white/[0.08] bg-[#0a0b0f] lg:hidden overflow-hidden"
              >
                <div className="max-h-[70vh] overflow-y-auto px-4 py-4 space-y-5">
                  {navGroups.map((group) => (
                    <div key={group.id}>
                      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#8b93a7]">
                        {group.label}
                      </div>
                      <div className="space-y-1">
                        {group.items.map((item) => (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                              `block rounded-lg px-3 py-2 text-sm ${
                                isActive
                                  ? "bg-[#5b6cff]/20 text-white"
                                  : "text-[#aeb5c4] hover:bg-white/[0.04] hover:text-white"
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

        <main className="relative flex-1">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(91,108,255,0.12),transparent_60%)]" />
          <div className="relative mx-auto max-w-[1120px] px-5 py-10 sm:py-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <footer className="border-t border-white/[0.08] py-8">
          <div className="mx-auto flex max-w-[1120px] flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5">
              <img src="/brand/logo-on-dark.png" alt="" className="h-6 w-6 object-contain opacity-80" />
              <span className="text-sm text-[#8b93a7]">ACADEMe Design</span>
            </div>
            <p className="text-xs text-[#6b7285]">Builders and agents · keep product UI simple</p>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
