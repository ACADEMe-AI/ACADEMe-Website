# ACADEMe website — agent entry

Public marketing site for academe.cc (Vite + React). Not the Flutter app.

Load `academe-website-brain` first. Use `academe-brain` only for product facts.

## Hard rules

1. **Keep the site's look.** "Study smarter. In your pocket.", the Start For Free and Join the community buttons, the mascot image in each section, the fonts and colours, and the last screen stay. Phone screenshots (real Pixel 10 captures) and section text follow the app; only features the app really has.
2. **No invented claims.** No fake metrics, testimonials or "every chapter" promises. Links live only in `src/lib/constants.ts`.
3. **One persistent WebGL phone** (`public/models/Iphone.glb`). No CSS fake. No second phone. Do not flatten the film into a left-text / right-device SaaS layout.
4. **ACADEMe only.** No other company, app or brand name anywhere: copy, docs, code, filenames.
5. **No code comments** in files you change.
6. Respect `prefers-reduced-motion`. Check desktop, a phone in portrait and a phone in landscape.
7. **Do not commit** `.env`, `.claude/settings.local.json`, local plugin trees, or secrets.

Legal pages, account deletion, password reset and `/open` live on `api.academe.cc`; `vercel.json` redirects to them.

## Skills

`.agents/skills/` ships with the repo. Start with `academe-website-brain`, then `using-agent-skills`.

## Docs

- `README.md`
- `CONTRIBUTING.md`
- `src/design/content/00-START-HERE.md`
