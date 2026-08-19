# Contributing to the ACADEMe website

This repo is the **public marketing / showcase site** (React + Vite). The Flutter + FastAPI product lives in [ACADEMe](https://github.com/ACADEMe-AI/ACADEMe).

## Before you write code

1. Read `AGENTS.md` (contract for humans and agents).
2. Read `design/agent/GUARDRAILS.md` (product + design law).
3. If an agent is helping, it must load `academe-website-brain` first. `academe-brain` is product facts only — do not apply Flutter structure here.

## Agent skills

Skills ship in `.agents/skills/` so every clone gets the same pack (same pattern as the app repo).

| Skill | Use when |
|---|---|
| `academe-website-brain` | Any work in this repo |
| `frontend-ui-engineering` | Production UI quality |
| `using-agent-skills` | Picking the rest of the pack |

Do not commit local plugin trees (`.claude/skills/impeccable`, `.cursor/skills/impeccable`) or `.claude/settings.local.json`.

## Setup

```bash
pnpm install
pnpm dev
```

Open http://localhost:3010 — `/` is the site, `/design` is the design system.

```bash
pnpm typecheck
pnpm build
pnpm qa          # Playwright screenshots → qa-shots/ (gitignored)
```

## Hard rules (short)

- Students first. Site = showcase + waitlist + QR. No “all devices.” No teacher/admin homepage.
- No fake metrics or invented testimonials. URLs only from `src/lib/constants.ts`.
- One persistent WebGL phone. Do not flatten the film into a SaaS split layout.
- Edit `src/`. Do not replace production with a cloned third-party site.
- Tokens and voice from `design/` + `src/design/content/`.

## Pull requests

1. Branch off `master`. One concern per PR.
2. Use `.github/pull_request_template.md`.
3. If you change the cinematic site, include desktop **and** mobile screenshots (or a short screen recording).
4. Do not mix skill-pack edits with unrelated visual work unless the PR is explicitly about agents.

## Code style

- TypeScript. Follow existing Vite + R3F + GSAP patterns.
- No new color hexes outside tokens / `src/lib/constants.ts`.
- No new dependencies without a one-line why in the PR.
