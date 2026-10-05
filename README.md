# ACADEMe website

The marketing site for [academe.cc](https://academe.cc): the study app for Class 6 to 12, CBSE, ICSE and ISC.

It is a single scroll film: one persistent Three.js phone showing real screens from the app, GSAP ScrollTrigger, and a cube brand loader. Then a short "Made for students in India" section, pricing and the footer.

The site keeps its own look (headline, buttons, mascot images, the last screen). Only the phone screenshots and the text follow the app.

This repository is **not** the app. The app (Flutter client, Go API) lives in the academe-mobile repo under `academe/`, and it is the source of truth for screens, colours, fonts, Pebby and copy.

## Pages

| URL | What you get |
| --- | --- |
| `/` | The scroll film, then languages, safety and pricing |
| `/design` | Design system (docs and tiles) |
| `/?loader=1` | Force the brand loader |
| `/privacy`, `/terms`, `/support`, `/delete-account`, `/reset-password`, `/open` | Redirect to `api.academe.cc` (`vercel.json`) |

Local base: [http://localhost:3010](http://localhost:3010)

## Stack

| Layer | Tech |
| --- | --- |
| App | React 18, Vite 5, TypeScript |
| 3D | Three.js, React Three Fiber, Drei |
| Scroll | GSAP ScrollTrigger (one scrubbed timeline) |
| Smooth scroll | Lenis (respects `prefers-reduced-motion`) |
| Routing | React Router (`/` and `/design`) |
| Type | Archivo (the site); the app's fonts as woff2 on `/design` |

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

## How it works

```
App
├── BrandLoader            one WebGL cube → parks in the hero pocket
├── Nav
├── ScrollExperience       pinned story
│   ├── ExperienceCanvas   one persistent WebGL phone
│   │   ├── CameraRig
│   │   ├── PhoneMesh
│   │   ├── FloatingDocs   chapter cards that fly into the phone
│   │   └── MeeSprite
│   └── ChapterOverlay     headlines, mascot images, CTAs
├── SectionJump / QrModal
└── AppDetails + Footer    languages, safety, pricing
```

- GSAP writes `scrollState` every scrub frame.
- R3F `useFrame` lerps the real Three.js objects toward that state.
- Desktop and phones follow different paths (`DESKTOP_WAYPOINTS`, `MOBILE_WAYPOINTS`). Phones in landscape use the phone path with the text on the left.

### Story

| Progress | Beat | Screen |
| --- | --- | --- |
| 0 – 0.12 | Hero: Study smarter. In your pocket. | home |
| 0.12 – 0.44 | Lessons | lesson → courses |
| 0.44 – 0.58 | Ask Pebby | askme |
| 0.58 – 0.74 | Scan | scan → check |
| 0.74 – 0.86 | Revision | revision |
| 0.86 – 0.94 | Plan for a test | folder |
| 0.94 – 1 | Join the community | waitlist (sideways) |

The scroll timing is the original one; only the screenshots changed. Screens are Pixel 10 captures in Light, 720×1560 WebP. The last screen ("Your next study session starts here.") is the original `waitlist.png`.

The community form link lives in [`src/lib/constants.ts`](src/lib/constants.ts). Do not invent metrics or testimonials.

## Layout

```
src/                 production site
  components/        film, scene, UI
  loader/            brand cube
  design/            /design docs site
  lib/               waypoints, CTAs, scroll state
public/
  models/            Iphone.glb
  screens/           Pixel 10 captures of the app
  mascot/            one mascot image per section
  pebby/             Pebby poses from the app (/design)
  brand/             the app's cube and logo mark
  fonts/             the app's fonts as woff2 (/design)
design/              product and design law
.agents/skills/      shared agent pack (clone gets the same skills)
```

## Contributing

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md).
2. Branch off `master`. One concern per pull request.
3. If you change the film, include desktop, phone portrait and phone landscape screenshots (or a short recording).

Hard rules in short:

- Keep the site's look. Screenshots and text follow the app; only features it really has.
- ACADEMe only: no other company or app names. No code comments.
- One persistent WebGL phone. Do not flatten the film into a SaaS split layout.
- Agents start with `academe-website-brain`. `academe-brain` is product facts, not Flutter file structure.

Start here for brand and copy: [`src/design/content/00-START-HERE.md`](src/design/content/00-START-HERE.md).
