# ACADEMe website — agent entry

This is the **public marketing / showcase site**, not the Flutter app.

Load `academe-website-brain` first. Use `academe-brain` only for product facts (what the app does). Do not apply Flutter modules, Rive, or FastAPI structure here.

## Hard rules

1. **Product truth** — solo students / college grads first. Site = showcase + waitlist + QR into the app. Do not market “all devices.” Teacher / admin / LMS is later, not homepage.
2. **Do not invent claims** — no fake metrics, testimonials, or “better than X” without a specific criterion. CTAs live in `src/lib/constants.ts` (`WAITLIST_URL`, `DEMO_URL`).
3. **Preserve the film** — one persistent WebGL phone (`public/models/Iphone.glb`). No CSS fake phone. No second phone. Type may cut through the device. Do not flatten into a left-text / right-phone SaaS template.
4. **Do not rebuild from scratch** — edit `src/`. Isolated experiments (`v3/`, research folders) must not replace production `/`.
5. **Never publish a third-party site as ACADEMe** — do not overwrite `src/`, `index.html`, or brand assets with another site’s code, logos, or copy.
6. **Tokens + voice** — colors from `src/lib/constants.ts` / `design/tokens`. Mee is a narrative character, not a sticker. Respect `prefers-reduced-motion`.
7. **Keep local agent junk local** — do not commit `.claude/settings.local.json`, `.codex/`, plugin copies of `impeccable`, or secrets.

Full product/design law: `design/agent/GUARDRAILS.md`. Engineering law for the *app* is `ARCHITECTURE-PRINCIPLES.md` — do not transplant Flutter layers onto this Vite site.

## Skills (committed, shared)

Clone this repo. Grok / Claude / Cursor pick up `.agents/skills/`. Same pattern as the Flutter repo (`albany`).

| Start here | Why |
|---|---|
| `academe-website-brain` | This site |
| `using-agent-skills` | Pick the rest |
| `academe-brain` | Product facts only |

Engineering pack matches albany (UI, TDD, review, security, shipping).

`impeccable` is a local plugin, not vendored.

## Human docs

- `CONTRIBUTING.md`
- `src/design/content/00-START-HERE.md`
- `design/agent/GUARDRAILS.md`
