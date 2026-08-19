# ACADEMe website — agent entry

Public marketing / showcase site (Vite + React). Not the Flutter app.

Load `academe-website-brain` first. Use `academe-brain` only for product facts. Do not apply Flutter or FastAPI structure here.

## Hard rules

1. **Students first.** Site = showcase + waitlist + QR into the app. Do not market “all devices.” Teacher / admin / LMS is later, not homepage.
2. **No invented claims.** No fake metrics or testimonials. CTAs only in `src/lib/constants.ts`.
3. **One persistent WebGL phone** (`public/models/Iphone.glb`). No CSS fake. No second phone. Do not flatten the film into a left-text / right-device SaaS layout.
4. **This repo is ACADEMe only.** Edit `src/`. Do not add another brand’s assets, copy, or screenshots.
5. **Tokens and Mee** from `design/` and `src/lib/constants.ts`. Respect `prefers-reduced-motion`.
6. **Do not commit** `.env`, `.claude/settings.local.json`, local plugin trees, or secrets.

Product/design law: `design/agent/GUARDRAILS.md`.

## Skills

`.agents/skills/` ships with the repo. Start with `academe-website-brain`, then `using-agent-skills`.

## Docs

- `CONTRIBUTING.md`
- `src/design/content/00-START-HERE.md`
- `design/agent/GUARDRAILS.md`
