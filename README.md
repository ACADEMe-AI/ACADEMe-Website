# ACADEMe website

Public marketing and showcase site for [ACADEMe](https://github.com/ACADEMe-AI/ACADEMe).

It is a single scroll film: one persistent Three.js phone, GSAP ScrollTrigger, and a Rubik’s-cube brand loader. The site’s job is to show the app, then send people to the waitlist.

This repository is **not** the Flutter app. Product code lives in [ACADEMe](https://github.com/ACADEMe-AI/ACADEMe).

**Tagline:** Study smarter. In your pocket.

## Pages

| URL | What you get |
| --- | --- |
| `/` | Cinematic product site |
| `/design` | Design system (docs and tiles) |
| `/?loader=1` | Force the brand loader |

Local base: [http://localhost:3010](http://localhost:3010)

## Stack

| Layer | Tech |
| --- | --- |
| App | React 18, Vite 5, TypeScript |
| 3D | Three.js, React Three Fiber, Drei |
| Scroll | GSAP ScrollTrigger (one scrubbed timeline) |
| Smooth scroll | Lenis (respects `prefers-reduced-motion`) |
| Routing | React Router (`/` and `/design`) |
| Type | Archivo |

## Setup

**Need:** Node 20+ and [pnpm](https://pnpm.io) 9 (`packageManager` is `pnpm@9.15.4`).

```bash
pnpm install
pnpm dev
```

Optional local overrides: copy `.env.example` to `.env`. Production already sets `VITE_DESIGN_BASE=/design` in `.env.production`.

### Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Dev server on port 3010 |
| `pnpm build` | Typecheck, then production build |
| `pnpm preview` | Serve the production build on 3010 |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm qa` | Playwright screenshots → `qa-shots/` (gitignored) |
| `pnpm test:loader` | Brand-loader scroll regression |
| `pnpm assets` | Rebuild phone GLB, screens, and mascot crops |

## How it works

```
App
├── BrandLoader            one WebGL cube → parks in the hero pocket
├── Nav
├── ScrollExperience       pinned story
│   ├── ExperienceCanvas   one persistent WebGL phone
│   │   ├── CameraRig
│   │   ├── PhoneMesh
│   │   ├── FloatingDocs
│   │   └── MeeSprite
│   └── ChapterOverlay
├── SectionJump / QrModal
└── Footer
```

- GSAP writes `scrollState` every scrub frame.
- R3F `useFrame` lerps the real Three.js objects toward that state.
- One WebGL phone (`public/models/Iphone.glb`). No CSS fake. No second phone.

### Story

| Progress | Chapter | Screen |
| --- | --- | --- |
| 0.00 | Hero | home |
| 0.18 | Upload | upload → processing |
| 0.38 | Chat / Mee | chat |
| 0.52 | Practice | cards → quiz |
| 0.66 | Adaptive | practice |
| 0.82 | Mastery | mastery |
| 0.92 | CTA | landscape waitlist |

Waitlist and demo URLs live in [`src/lib/constants.ts`](src/lib/constants.ts). Do not invent metrics or testimonials.

## Layout

```
src/                 production site
  components/        film, scene, UI
  loader/            brand cube
  design/            /design docs site
  lib/               waypoints, CTAs, scroll state
public/
  models/            Iphone.glb
  screens/           baked ACADEMe product UI
  mascot/            Mee
  brand/             logos
design/              product and design law
.agents/skills/      shared agent pack (clone gets the same skills)
```

## Contributing

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md).
2. Branch off `master`. One concern per pull request.
3. If you change the film, include desktop and mobile screenshots (or a short recording).

Hard rules in short:

- Students first. The site is showcase + waitlist + QR. No “all devices.” No teacher / admin homepage.
- ACADEMe assets only. Edit `src/`.
- One persistent WebGL phone. Do not flatten the film into a SaaS split layout.
- Agents start with `academe-website-brain`. `academe-brain` is product facts, not Flutter file structure.

Design law: [`design/agent/GUARDRAILS.md`](design/agent/GUARDRAILS.md).  
Start here for brand and copy: [`src/design/content/00-START-HERE.md`](src/design/content/00-START-HERE.md).
