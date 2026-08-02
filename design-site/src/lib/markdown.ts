/** Minimal markdown → HTML for agent-authored content (no extra deps). */
export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let inCode = false;
  let codeBuf: string[] = [];
  let inTable = false;
  let tableBuf: string[] = [];
  let inList = false;

  const flushList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  const flushTable = () => {
    if (!inTable) return;
    const rows = tableBuf.filter((r) => !/^\|?\s*-+/.test(r.replace(/\|/g, "")));
    if (rows.length) {
      out.push('<div class="overflow-x-auto my-4"><table class="w-full text-sm">');
      rows.forEach((row, i) => {
        const cells = row
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim());
        const tag = i === 0 ? "th" : "td";
        const cls =
          i === 0
            ? "text-left text-muted border-b border-border py-2 pr-3 font-medium"
            : "border-b border-border/60 py-2 pr-3 text-white/90 align-top";
        out.push(
          `<tr>${cells.map((c) => `<${tag} class="${cls}">${inline(c)}</${tag}>`).join("")}</tr>`
        );
      });
      out.push("</table></div>");
    }
    tableBuf = [];
    inTable = false;
  };

  const inline = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/`([^`]+)`/g, '<code class="text-accent bg-surface2 px-1.5 py-0.5 rounded text-[13px]">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong class=\"text-white font-semibold\">$1</strong>")
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a class="text-primary hover:underline" href="$2">$1</a>'
      );

  for (const line of lines) {
    if (line.startsWith("```")) {
      flushList();
      flushTable();
      if (!inCode) {
        inCode = true;
        codeBuf = [];
      } else {
        out.push(
          `<pre class="bg-surface2 border border-border rounded-xl p-4 overflow-x-auto text-[13px] text-muted my-4 font-mono"><code>${codeBuf
            .join("\n")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")}</code></pre>`
        );
        inCode = false;
      }
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      continue;
    }

    if (line.trim().startsWith("|")) {
      flushList();
      inTable = true;
      tableBuf.push(line);
      continue;
    } else {
      flushTable();
    }

    if (/^### /.test(line)) {
      flushList();
      out.push(`<h3 class="text-lg font-semibold mt-8 mb-2 text-white">${inline(line.slice(4))}</h3>`);
    } else if (/^## /.test(line)) {
      flushList();
      out.push(`<h2 class="text-2xl font-semibold mt-10 mb-3 text-white tracking-tight">${inline(line.slice(3))}</h2>`);
    } else if (/^# /.test(line)) {
      flushList();
      out.push(`<h1 class="text-3xl font-bold mb-4 text-white tracking-tight">${inline(line.slice(2))}</h1>`);
    } else if (/^[-*] /.test(line)) {
      if (!inList) {
        out.push('<ul class="list-disc pl-5 space-y-1.5 my-3 text-muted">');
        inList = true;
      }
      out.push(`<li class="text-muted">${inline(line.replace(/^[-*] /, ""))}</li>`);
    } else if (/^- \[[ xX]\] /.test(line)) {
      flushList();
      const checked = /\[[xX]\]/.test(line);
      const text = line.replace(/^- \[[ xX]\] /, "");
      out.push(
        `<label class="flex items-start gap-2 my-1.5 text-sm text-muted"><input type="checkbox" disabled ${checked ? "checked" : ""} class="mt-1 accent-primary" /><span>${inline(text)}</span></label>`
      );
    } else if (/^---+$/.test(line.trim())) {
      flushList();
      out.push('<hr class="border-border my-8" />');
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      out.push(`<p class="text-muted leading-relaxed my-3">${inline(line)}</p>`);
    }
  }
  flushList();
  flushTable();
  return out.join("\n");
}
