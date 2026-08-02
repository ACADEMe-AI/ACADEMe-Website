# ACADEMe Design System — Agent entry

**This folder is the design source of truth for agents.**  
Do not invent colors, IA, mascot rules, or phase order without reading here first.

## Start here (in order)

1. `content/00-START-HERE.md` — map + hard rules  
2. `content/agents/guardrails.md` — product + engineering law  
3. `content/product/roadmap.md` — phase order & checklists  
4. Then the pillar you need:

| Pillar | Path |
|--------|------|
| Identity | `content/identity/` |
| Writing | `content/writing/` |
| Illustration | `content/illustration/` |
| Marketing | `content/marketing/` |
| Product | `content/product/` |
| Agents | `content/agents/` |

## Human browse UI

```bash
cd design-site && pnpm install && pnpm dev
# http://localhost:5174
```

Marketing landing site remains the **root** Vite app (`pnpm dev` port 5173).  
Design system site is **separate** (port 5174).

## Mascot note

Internal code name: **Pebby** (learning buddy). Prefer “the mascot” / “learning buddy” in public UI copy unless founder says otherwise. Assets: `../design/mascot/mascot_academe.png`.

## Related repo paths (legacy / deep)

Deep dives still live under `../design/` (tokens, shape-language scrape, previews). Prefer `design-site/content/` for decisions; open `../design/` only for raw research or SVG previews.
