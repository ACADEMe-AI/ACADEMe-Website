# ACADEMe website — agent entry

Public marketing site for academe.cc (Vite + React). Not the Flutter app.

Load `academe-website-brain` first. Use `academe-brain` only for product facts.

## Hard rules

1. **The app is the source of truth.** Real Pixel 10 screenshots, the app's logo files, Pebby poses, colours and fonts. Only features the app really has.
2. **No invented claims.** No fake metrics, testimonials or "every chapter" promises. Store links live only in `src/lib/constants.ts`; `PLAY_LIVE` stays `false` until the Play listing is public.
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
