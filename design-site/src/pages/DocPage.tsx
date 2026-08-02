import { Link, useLocation } from "react-router-dom";
import { fileForPath, labelForPath, navGroups } from "../lib/nav";
import { loadContent } from "../lib/loadContent";
import { renderMarkdown } from "../lib/markdown";
import { ChevronRight } from "lucide-react";

export default function DocPage() {
  const { pathname } = useLocation();
  const file = fileForPath(pathname) ?? "00-START-HERE.md";
  const md = loadContent(file);
  const html = renderMarkdown(md);
  const title = labelForPath(pathname);
  const isMascot = pathname.includes("mascot");

  const group = navGroups.find((g) => g.items.some((i) => i.path === pathname));
  const siblings = group?.items ?? [];

  return (
    <div className="grid lg:grid-cols-[1fr_200px] gap-10 items-start">
      <article className="min-w-0 max-w-2xl">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted mb-6">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          {group && (
            <>
              <ChevronRight className="w-3 h-3 opacity-50" />
              <span>{group.label}</span>
            </>
          )}
          <ChevronRight className="w-3 h-3 opacity-50" />
          <span className="text-white/80">{title}</span>
        </nav>

        {isMascot && (
          <div className="mb-8 rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]">
            <img
              src="/mascot.png"
              alt="ACADEMe learning buddy character sheet"
              className="w-full h-auto max-h-[480px] object-contain object-top bg-[#0a0b10]"
            />
          </div>
        )}

        {pathname.includes("logo") && (
          <div className="mb-8 flex flex-wrap items-center gap-6 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-2">
                <img src="/logo.png" alt="ACADEMe logo" className="w-12 h-12 object-contain" />
              </div>
              <p className="text-[11px] text-muted">Primary mark</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mb-2">
                <img src="/logo.png" alt="" className="w-12 h-12 object-contain" />
              </div>
              <p className="text-[11px] text-muted">On light</p>
            </div>
          </div>
        )}

        {pathname.includes("color") && (
          <div className="mb-8 grid grid-cols-4 sm:grid-cols-6 gap-2">
            {[
              ["#0B0C0F", "bg"],
              ["#14161C", "surface"],
              ["#5B6CFF", "primary"],
              ["#7CFFB2", "accent"],
              ["#3DDC97", "success"],
              ["#FF5C6A", "error"],
            ].map(([hex, name]) => (
              <div key={hex} className="rounded-xl overflow-hidden border border-white/10">
                <div className="h-14" style={{ background: hex }} />
                <div className="px-2 py-1.5 bg-black/40">
                  <p className="text-[10px] text-white/90 font-medium">{name}</p>
                  <p className="text-[10px] text-muted font-mono">{hex}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="doc-body" dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      {/* In-section menu — not a long right scrollbar of everything */}
      {siblings.length > 0 && (
        <aside className="hidden lg:block sticky top-24">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-3">
            In {group?.label}
          </p>
          <ul className="space-y-1 border-l border-white/10 pl-3">
            {siblings.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block text-sm py-1 transition-colors ${
                    item.path === pathname
                      ? "text-primary font-medium"
                      : "text-muted hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/product/checklist"
            className="mt-8 inline-block text-xs font-medium text-primary hover:underline"
          >
            ← What should I do next?
          </Link>
        </aside>
      )}
    </div>
  );
}
