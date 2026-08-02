import { useLocation } from "react-router-dom";
import { fileForPath } from "../lib/nav";
import { loadContent } from "../lib/loadContent";
import { renderMarkdown } from "../lib/markdown";

export default function DocPage() {
  const { pathname } = useLocation();
  const file = fileForPath(pathname);
  const md = loadContent(file);
  const html = renderMarkdown(md);

  return (
    <article>
      <p className="text-[11px] font-mono text-muted mb-6">
        content/{file}
      </p>
      <div
        className="doc-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
