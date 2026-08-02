import { useLocation } from "react-router-dom";
import { fileForPath } from "../lib/nav";
import { loadContent } from "../lib/loadContent";
import { renderMarkdown } from "../lib/markdown";
import Reveal from "../components/Reveal";

export default function DocPage() {
  const { pathname } = useLocation();
  const file = fileForPath(pathname);
  const md = loadContent(file);
  const html = renderMarkdown(md);

  return (
    <article>
      <Reveal y={16}>
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-[11px] font-mono text-muted/80 tracking-wide px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            content/{file}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.06} y={24}>
        <div className="doc-body" dangerouslySetInnerHTML={{ __html: html }} />
      </Reveal>
    </article>
  );
}
