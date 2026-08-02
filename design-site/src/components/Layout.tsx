import { NavLink, Outlet } from "react-router-dom";
import { nav } from "../lib/nav";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <header className="md:hidden flex items-center justify-between px-4 h-14 border-b border-border bg-surface/90 backdrop-blur sticky top-0 z-40">
        <div className="flex items-center gap-2 font-semibold">
          <BookOpen className="w-5 h-5 text-primary" />
          ACADEMe Design
        </div>
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="p-2 text-muted hover:text-white"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      <aside
        className={`${
          open ? "flex" : "hidden"
        } md:flex flex-col w-full md:w-64 lg:w-72 shrink-0 border-r border-border bg-surface md:min-h-screen md:sticky md:top-0 md:h-screen overflow-y-auto`}
      >
        <div className="hidden md:flex items-center gap-2 px-5 h-16 border-b border-border">
          <BookOpen className="w-5 h-5 text-primary" />
          <div>
            <div className="font-semibold text-sm tracking-tight">ACADEMe Design</div>
            <div className="text-[11px] text-muted">System · agents first</div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-5">
          {nav.map((section) => (
            <div key={section.id}>
              <div className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                {section.label}
              </div>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/" || !item.path.slice(1).includes("/")}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? "bg-primary/15 text-white font-medium"
                            : "text-muted hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-border text-[11px] text-muted leading-relaxed">
          Content source: <code className="text-accent">design-site/content/</code>
          <br />
          Agents: start at <code className="text-accent">AGENTS.md</code>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
