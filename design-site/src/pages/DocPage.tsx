import { Link, useLocation } from "react-router-dom";
import { fileForPath, groupForPath, labelForPath } from "../lib/nav";
import { loadContent } from "../lib/loadContent";
import { renderMarkdown } from "../lib/markdown";
import { ChevronRight } from "lucide-react";

const expressionCards = [
  { src: "/mascot/idle.jpg", label: "Default" },
  { src: "/mascot/thinking.jpg", label: "Thinking" },
  { src: "/mascot/studying.jpg", label: "Studying" },
  { src: "/mascot/celebrate.jpg", label: "Celebrate" },
  { src: "/mascot/wave.jpg", label: "Wave" },
  { src: "/mascot/hero.jpg", label: "Hero" },
];

export default function DocPage() {
  const { pathname } = useLocation();
  const file = fileForPath(pathname) ?? "start/overview.md";
  const md = loadContent(file);
  const html = renderMarkdown(md);
  const title = labelForPath(pathname);
  const group = groupForPath(pathname);
  const showExpressions =
    pathname.includes("character") || pathname.includes("expressions") || pathname.includes("mascot");
  const showLogo = pathname.includes("logo");
  const showColor = pathname.includes("color");

  return (
    <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_200px]">
      <article className="min-w-0 max-w-2xl">
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs text-[#8b93a7]">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          {group && (
            <>
              <ChevronRight className="h-3 w-3 opacity-40" />
              <span>{group.label}</span>
            </>
          )}
          <ChevronRight className="h-3 w-3 opacity-40" />
          <span className="text-white/85">{title}</span>
        </nav>

        {showLogo && (
          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-[#12141c] p-8 flex flex-col items-center justify-center gap-3">
              <img src="/brand/logo-on-dark.png" alt="Logo on dark" className="h-20 w-20 object-contain" />
              <p className="text-xs text-[#8b93a7]">On dark</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#f4f5f7] p-8 flex flex-col items-center justify-center gap-3">
              <img src="/brand/logo-on-light.png" alt="Logo on light" className="h-20 w-20 object-contain" />
              <p className="text-xs text-[#5c6578]">On light</p>
            </div>
          </div>
        )}

        {showColor && (
          <div className="mb-8 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {[
              ["#0B0C0F", "Background"],
              ["#14161C", "Surface"],
              ["#5B6CFF", "Primary"],
              ["#7CFFB2", "Accent"],
              ["#3DDC97", "Success"],
              ["#FF5C6A", "Error"],
            ].map(([hex, name]) => (
              <div key={hex} className="overflow-hidden rounded-xl border border-white/10">
                <div className="h-12" style={{ background: hex }} />
                <div className="bg-[#0e1016] px-2 py-1.5">
                  <p className="text-[10px] font-medium text-white/90">{name}</p>
                  <p className="font-mono text-[10px] text-[#8b93a7]">{hex}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {showExpressions && (
          <div className="mb-8">
            <div className="mb-3 overflow-hidden rounded-2xl border border-white/10 bg-[#12141c] p-6">
              <img
                src="/mascot/hero.jpg"
                alt="Learning buddy hero"
                className="mx-auto max-h-64 w-auto object-contain"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {expressionCards.map((c) => (
                <div
                  key={c.label}
                  className="rounded-xl border border-white/[0.08] bg-[#111318] p-2 text-center"
                >
                  <img src={c.src} alt={c.label} className="mb-1 aspect-square w-full object-contain" />
                  <p className="text-[10px] text-[#9aa3b5]">{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="doc-body" dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      {group && (
        <aside className="hidden lg:block sticky top-24 self-start">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#8b93a7]">
            {group.label}
          </p>
          <ul className="space-y-1 border-l border-white/10 pl-3">
            {group.items.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block py-1 text-sm ${
                    item.path === pathname
                      ? "font-medium text-[#7b8cff]"
                      : "text-[#8b93a7] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/start/checklist"
            className="mt-8 block text-xs font-medium text-[#7b8cff] hover:underline"
          >
            What next
          </Link>
        </aside>
      )}
    </div>
  );
}
